# Workgroup Manual Routing Design

Date: 2026-02-06

## Goals
- Add workgroup routing mode MANUAL for human routing while keeping robot-first flows.
- When routingMode=MANUAL and a request enters human routing, place it into a routing pool and notify agents.
- Desktop client shows a Routing Pool list and allows manual accept.

## Non-Goals
- Replace existing queue logic or robot routing.
- Redesign queue message schema.

## Backend Changes
### Data Model
Reuse RoutingPoolEntity with new fields:
- threadUid
- threadTopic
- workgroupUid
- visitor (JSON string)
- enqueuedAt (epoch millis)

Add RoutingPoolTypeEnum value WORKGROUP_THREAD (or similar) to isolate this usage.

### Routing Logic
- In WorkgroupThreadRoutingStrategy, when routingMode=MANUAL and human routing path is selected, create a routing pool entry instead of auto-assigning.
- Keep robot-first flow intact; only human routing path is affected.
- Send MessageTypeEnum.ROUTING_POOL notice to available agents in the workgroup.

### APIs
- New list endpoint to query routing pool entries by org/workgroup, sorted by enqueuedAt ASC.
- Response includes routing pool entry plus thread summary joined by ThreadRestService.findByUidIn.
- Cleanup: remove routing pool entry on accept or when thread status leaves QUEUING.

## Frontend Changes
### Admin
- Add MANUAL option in workgroup routing settings.
- Add i18n label/description for MANUAL.

### Desktop
- Add filter category key routingPoolThread with label "路由池".
- Clicking opens RoutingPool modal (QueueList style).
- List shows visitor info, joined time, and waiting duration from enqueuedAt.
- Accept uses existing agentAcceptThread and refreshes lists.

## Messaging
- Add MessageTypeEnum.ROUTING_POOL.
- ThreadMessageUtil builds routing pool notice with payload similar to queue notification (threadUid, threadTopic, visitor, enqueuedAt).
- Desktop listens for ROUTING_POOL and refreshes routing pool list.

## Error Handling
- Pool creation and notifications are best-effort; failures are logged with threadUid/workgroupUid.
- UI shows error on list load or accept; allow retry.

## Testing
- MANUAL mode: human routing creates routing pool entries.
- Robot-first flows remain unchanged.
- Routing pool list sorts by enqueuedAt ASC.
- Agent accept removes routing pool entry and updates UI.
