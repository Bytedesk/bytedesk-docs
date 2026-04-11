---
sidebar_label: Virtual Thread
sidebar_position: 67
---

# Virtual Thread

Virtual threads are the lightweight threading model introduced in Java 21. They preserve the familiar one-task-per-thread programming style, while moving much of the scheduling cost from the operating system into the JVM. This makes them especially suitable for high-concurrency, blocking, IO-heavy workloads.

In Weiyu customer service system, many requests are not CPU-bound for their whole lifetime. They spend most of their time waiting for databases, Redis, external APIs, WebSocket messages, IMAP servers, AI providers, or telephony gateways. Virtual threads are valuable precisely in these wait-heavy scenarios.

## How Weiyu uses virtual threads

Virtual threads are already used in multiple modules of the project. This is not an experimental switch left unused in configuration.

### 1. As the default model for Spring async tasks

The application enables virtual thread support at startup:

```properties
spring.threads.virtual.enabled=true
```

In the core module, the project also defines a unified async executor and adapts Spring `@Async` and `applicationTaskExecutor` to a virtual-thread-backed executor. That means the existing Spring programming model can still be used for:

- event listeners
- asynchronous notifications
- background import tasks
- non-critical business callbacks

without rewriting the whole codebase into a reactive style.

### 2. In typical blocking IO scenarios of a customer service platform

The project already uses `Executors.newVirtualThreadPerTaskExecutor()` and `Thread.startVirtualThread()` in real business paths, including:

- Knowledge base website crawling: the crawler concurrently fetches many pages, and most of the time is spent waiting on HTTP calls and page retrieval.
- Call center and FreeSWITCH ESL integration: callback handling, background jobs, and connection-related processing involve significant network waiting.
- Enterprise WeChat and Feishu integrations: after callbacks arrive, the system asynchronously synchronizes messages or starts long-lived connections without blocking the request thread or application startup.
- AI streaming output: in SSE scenarios, a virtual thread can hold one streaming generation flow while keeping the code readable and sequential.
- Email IDLE listeners and Janus/WebRTC clients: these long-lived, wait-oriented tasks are a strong fit for virtual threads.
- Redis expiration follow-up handling: timeout compensation logic can be started in a virtual thread so that the event dispatch path stays responsive.

### 3. Together with ordered execution where needed

The project does not treat virtual threads as unlimited concurrency everywhere. In some call-related components, single-thread semantics are still preserved, while the underlying thread factory is switched to virtual threads. This keeps event ordering intact and still reduces thread overhead.

That is the practical rule used in this project:

- Use one virtual thread per task for highly concurrent wait-heavy work.
- Preserve ordered consumption when ordering matters, but make the thread cheaper.
- Keep traditional thread pools where explicit throttling, queueing, or backpressure is required.

## Why virtual threads fit Weiyu customer service system

The nature of the system makes virtual threads a strong engineering fit.

### 1. The system has many wait-heavy tasks

Although the business domain is complex, many request paths are not dominated by computation. They are dominated by waiting:

- waiting for user messages
- waiting for third-party callbacks
- waiting for AI responses
- waiting for FreeSWITCH, Janus, or WebSocket events
- waiting for Redis, databases, or mail servers

If all these tasks sit on platform threads, the system can run into thread inflation, queue buildup, and larger context-switch overhead. Virtual threads are better suited to this kind of concurrency.

### 2. Customer service workloads often spike suddenly

Marketing campaigns, channel traffic, bulk bot onboarding, ticket imports, website crawling, or telephony event bursts can all create sudden surges in task count. Traditional thread pools require estimating core size, max size, and queue capacity in advance, but real peaks are hard to predict.

Virtual threads do not replace capacity planning, but they significantly reduce the chance that thread resources become the first bottleneck.

### 3. They allow the system to keep its current Spring MVC and JPA model

Weiyu customer service system is a typical Spring Boot multi-module application with many synchronous services, event listeners, JPA access patterns, and third-party SDK integrations.

Rewriting the system into a fully reactive architecture purely for concurrency would be expensive and risky. Virtual threads offer a more pragmatic path:

- keep the existing code structure
- keep the current service and transaction model
- keep most synchronous APIs unchanged
- gain stronger concurrency handling on Java 21

For a continuously evolving customer service platform, this is a high-leverage upgrade path.

## Benefits of using virtual threads

### 1. Better throughput in high-concurrency IO workloads

When the system is handling many external calls, long-lived waits, and asynchronous events at the same time, virtual threads allow far more suspended tasks without requiring an expensive platform thread for each one.

### 2. Lower thread-pool tuning complexity

Traditional executors often force trade-offs among core threads, max threads, and queue size. If configured too small, work backs up. If configured too large, thread switching and memory overhead can increase. Virtual threads do not eliminate tuning entirely, but they reduce the operational pressure around thread counts.

### 3. Simpler and more maintainable code

Compared with callback-heavy code or large-scale reactive rewrites, virtual threads let the project keep straightforward sequential business logic. For customer service workflows with many branches and exception paths, this is important for long-term maintainability.

### 4. A better fit for long-lived integrations

Customer service platforms naturally integrate with many external systems: Enterprise WeChat, Feishu, mail services, AI providers, telephony gateways, and WebRTC gateways. As long as these paths are mainly blocking and wait-oriented, virtual threads are usually a better fit than simply enlarging a platform-thread pool.

## Benchmarking and performance guidance

Whether virtual threads bring meaningful value should ultimately be validated with benchmark data. For Weiyu customer service system, the benchmark should follow real business paths rather than only isolated micro-benchmarks on a single endpoint.

### 1. Scenarios worth testing first

- customer-message ingress paths, including visitor, channel, and bot traffic
- AI streaming reply paths, especially with growing numbers of SSE connections
- call-center event handling, including high-frequency FreeSWITCH and ESL events
- knowledge-base website crawling with many concurrent pages
- mail listeners and third-party callbacks with many wait-heavy tasks at the same time

### 2. Recommended comparison method

At minimum, keep two test groups:

- one with traditional thread-pool configuration
- one with the current virtual-thread configuration

Keep other variables as consistent as possible:

- same JDK version
- same database and Redis setup
- same external dependency latency
- same JVM heap size and machine specification

That keeps the comparison focused on the threading model rather than environmental noise.

### 3. Metrics that matter most

Do not look at QPS alone. At minimum, observe:

- average latency
- P95 and P99 latency
- concurrent connections or concurrent task count
- JVM thread count
- CPU usage
- heap and non-heap memory trends
- Full GC and Young GC frequency
- timeout rate and error rate

For a customer service platform, the key question is often not just peak throughput. It is whether the system remains stable under high-concurrency waiting, whether tail latency worsens, and whether error rates rise.

### 4. What gains you should expect to see

If the workload is mainly blocking and wait-heavy, the benchmark often reveals gains such as:

- more concurrent waiting tasks on the same machine size
- lower risk of exhausting thread resources when long-lived waits and callbacks pile up
- reduced tail-latency degradation caused by thread-pool queueing
- less executor tuning effort for some business paths

These gains often show up more as better capacity and stability than as dramatically lower CPU usage or lower per-request latency in every scenario.

### 5. How to interpret the result

If the improvement is clear, the path is likely a good match for virtual threads because it is strongly IO-bound and wait-heavy.

If the improvement is limited, common reasons include:

- the workload is actually CPU-bound
- the real bottleneck is the database, Redis, or a third-party dependency
- downstream capacity is too small for the threading model to matter much
- the code path still contains serialized bottlenecks or lock contention

The goal of benchmarking virtual threads is not to prove they are always faster. The goal is to identify where they are a strong fit and where traditional backpressure, caching, batching, queueing, or other architectural work is still required.

## Why we did not convert everything to virtual threads

Virtual threads fit the current system well, but they are not a silver bullet.

### 1. CPU-bound workloads benefit less

If a task is mostly heavy computation, encoding, decoding, or long CPU occupancy, virtual threads do not create more CPU capacity.

### 2. Some scenarios still need explicit backpressure

The project still keeps some traditional thread-pool configurations in places where concurrency must be capped, downstream systems must be protected, or rejection behavior must be explicit. In those cases, the key concern is system boundary control, not just thread cost.

### 3. Async execution still requires context awareness

Some aspects in the project already document that if code still depends on request context such as `HttpServletRequest`, it cannot simply be moved into async execution. This is not unique to virtual threads; it is a general rule of asynchronous programming, but it remains important here as well.

## Summary

In Weiyu customer service system, virtual threads are not enabled just to follow a new Java feature. They are used because they match the system's real operating characteristics:

- many high-concurrency, blocking, wait-heavy tasks
- many external integrations and long-lived connections
- a need to improve concurrency without rewriting the existing Spring architecture

That is why the project adopts virtual threads on Java 21 and applies them to Spring async executors, website crawling, call-center integration, AI streaming, channel callbacks, mail listeners, and WebRTC gateway clients.

For an IO-intensive customer service platform, virtual threads are a pragmatic upgrade: they improve scalability and maintainability without forcing a complete architectural rewrite.
