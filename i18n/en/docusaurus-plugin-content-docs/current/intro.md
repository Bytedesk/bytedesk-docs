---
sidebar_position: 1
---

# Weiyu Collaboration Platform

import nin1Image from '/img/nin1.png';

## 📚 Overview

**Weiyu** is a newly built open-source enterprise-level [multi-tenant](./development/saas.md) team collaboration tool based on AI, integrating multiple functions into one:

> [Enterprise IM](modules/team.md), [Online Customer Service](modules/service.md), [Enterprise Knowledge Base/Help Documentation](modules/kbase.md), [Ticket System](modules/ticket.md), [AI Agent](modules/ai.md), [Workflow](modules/workflow.md), [Voice of Customer](modules/voc.md), [Call Center](plugins/freeswitch.md), [Video Customer Service](plugins/webrtc.md), [Open Platform](modules/open.md)

<img src={nin1Image} alt="Weiyu Function Integration" />

---

## 🔍 System Architecture

import archLayerImage from '/img/arch/arch_layer.png';
import archModuleImage from '/img/arch/arch_module.png';
import archFrontImage from '/img/arch/arch_front.png';

The system is developed based on modular design, with each module being independent and flexibly combinable to meet the personalized needs of different enterprises.

### 📊 Layered Architecture Diagram

<img src={archLayerImage} alt="Layered Architecture Diagram" />

### 🧩 Module Architecture Diagram

<img src={archModuleImage} alt="Module Architecture Diagram" />

### 🖥️ Frontend Architecture Diagram

<img src={archFrontImage} alt="Frontend Architecture Diagram" />

### 📚 [View Complete Architecture Documentation](https://www.weiyuai.cn/architecture.html)

---

## 🎯 Use Cases

The Weiyu Collaboration Platform is based on modular design, focusing on customer service + ticket + order + consultation + knowledge base core functions, and can flexibly adapt to different industries and business scenario needs:

### 🏛️ [Government Services](solution/gov)

- **Intelligent Government Consultation**: 24-hour policy interpretation, service guides, intelligent Q&A services
- **Multi-channel Integration**: Unified management of websites, APPs, hotlines and other consultation channels
- **Ticket Workflow**: Intelligent classification and processing of public livelihood demands, full-process ticket management
- **Knowledge Base Management**: Policy and regulation knowledge base, intelligent search and updates

### 🏥 [Healthcare](solution/hospital)

- **Intelligent Medical Consultation**: Symptom description analysis, intelligent recommendation of departments and doctors
- **Medical Customer Service**: Professional medical knowledge base, providing health consultation answers
- **Patient Service Tickets**: Medical service ticket processing, complaint and suggestion management
- **Medical Knowledge Base**: Disease diagnosis and treatment knowledge base, medication guidance information management

### 🎓 [Education and Training](solution/edu)

- **Admissions Consultation Services**: Intelligent course recommendations, admissions question answers
- **Learning Consultation Support**: AI learning assistant, 24-hour Q&A
- **Education Service Tickets**: Student problem ticket processing, service quality tracking
- **Education Knowledge Base**: Course information database, learning material intelligent management

### 🛒 [E-commerce Retail](solution/retail)

- **Product Consultation Services**: Knowledge base-based product intelligent Q&A
- **Order Management System**: Automatic processing of order inquiries, returns and exchanges
- **Customer Service Ticket Processing**: After-sales problem ticket management, customer complaint handling
- **Product Knowledge Base**: Product information database, usage guide intelligent search

### 🏢 [Internal Collaboration](solution/teamim)

- **Internal Customer Service Support**: Internal employee service consultation platform
- **Knowledge Base Management**: Enterprise knowledge base construction, experience accumulation and inheritance
- **Ticket Process Management**: Internal service tickets, problem tracking and processing
- **Customer Service Platform**: Unified customer service platform, improving service quality

### 💰 [Financial Services](solution/finance)

- **Financial Consultation Services**: Investment consultation, product introduction, risk explanation
- **Business Processing Consultation**: Business process consultation, processing guidance services
- **Customer Service Tickets**: Financial service complaint tickets, problem processing tracking
- **Financial Knowledge Base**: Product knowledge base, policy and regulation intelligent queries

### 🏠 [Real Estate](solution/realestate)

- **Property Consultation Services**: Intelligent property recommendations, property information consultation
- **Customer Service Tickets**: Home purchase service tickets, after-sales problem processing
- **Real Estate Knowledge Base**: Property information database, home purchase guide knowledge management
- **Customer Relationship Management**: Home purchase customer service tracking, satisfaction management

### 🚗 [Automotive Services](solution/auto)

- **Automotive Consultation Services**: Vehicle model recommendation consultation, car purchase question answers
- **After-sales Service Tickets**: Maintenance and service tickets, service problem tracking
- **Automotive Knowledge Base**: Vehicle parameter database, maintenance knowledge management
- **Customer Service Support**: Automotive customer service, complaint and suggestion processing

### 🛫 [Travel and Hospitality](solution/travel)

- **Travel Consultation Services**: Travel route consultation, destination information answers
- **Booking Service Support**: Hotel and flight booking consultation, order problem processing
- **Service Ticket Management**: Travel service tickets, complaint processing tracking
- **Travel Knowledge Base**: Destination information database, travel guide intelligent search

### 🎮 [Gaming and Entertainment](solution/gaming)

- **Game Customer Service Support**: Game problem answers, account service consultation
- **Player Service Tickets**: Game problem ticket processing, player complaint management
- **Game Knowledge Base**: Game strategy database, common problem intelligent answers
- **Technical Support Services**: Game technical problem diagnosis and customer service support

### ⚖️ [Legal Services](solution/legal)

- **Legal Consultation Services**: Online legal consultation, legal problem intelligent answers
- **Legal Service Ticket Processing**: Legal service ticket management, case consultation tracking
- **Legal Knowledge Base**: Legal provision database, case database intelligent search
- **Customer Service Management**: Legal customer service, consultation record management

### 🏥 [Medical Aesthetics and Health](solution/beauty)

- **Medical Aesthetics Consultation Services**: Project introduction consultation, pre and post-operative question answers
- **Appointment Service Tickets**: Appointment consultation tickets, service tracking management
- **Medical Aesthetics Knowledge Base**: Project information database, care knowledge intelligent queries
- **Customer Relationship Maintenance**: Customer service tracking, satisfaction survey management

### 🎓 [University Services](solution/university)

- **Admissions Consultation Services**: Intelligent admissions Q&A, major introduction, registration guide
- **Student Affairs Management**: Student status management, course selection guidance, student complaint processing
- **Campus Service Tickets**: Dormitory repair requests, academic affairs consultation, campus facility feedback
- **Teaching Resource Database**: Course materials, academic literature, learning guide intelligent search
- **Alumni Service Management**: Alumni information consultation, alumni activity organization, alumni donation management

### 💼 [Professional Services](solution/)

- **Consultation Service Platform**: Professional consultation Q&A, multi-domain knowledge support
- **Service Ticket System**: Unified ticket management, service quality monitoring
- **Professional Knowledge Base**: Industry knowledge base construction, intelligent search matching
- **Customer Service Optimization**: Service process optimization, customer experience improvement

### 📝 [AI Text Generation Scenarios](solution/text-generation)

- **Automatic Meeting Minutes Generation**: Speech recognition + AI processing, automatic generation of standardized meeting minutes
- **Intelligent Document Proofreading**: Professional proofreading engine, automatic correction of typos and grammar errors
- **Official Document Format Application**: Automatic application of official document formats, ensuring compliance
- **Intelligent Writing Assistant**: Knowledge base-based AI writing assistant, improving document quality

---

## 💼 Core Function Modules

### 1. [Enterprise IM](modules/team.md)

📱 **Enterprise-level Instant Messaging System**

- Supports one-on-one chat, group chat, message recall
- Read/unread status, file transfer and other functions
- Meets enterprise internal efficient communication and collaboration needs

### 2. [Online Customer Service](modules/service.md)

🛎️ **Multi-channel Integrated Customer Service System**

- Supports web, APP, WeChat and other channel access
- Implements intelligent assignment, queuing, transfer, monitoring
- Improves customer service experience and efficiency

### 3. [AI Agent](modules/ai.md)

🤖 **Intelligent Customer Service Assistant**

- Large language model-based automatic answering system
- Handles common problems, reducing manual customer service workload
- Achieves 24-hour uninterrupted service

### 4. [Knowledge Base/Help Center](modules/kbase.md)

📚 **Enterprise Knowledge Management Platform**

- Supports document creation, editing, classification management
- Powerful permission control and collaboration functions
- Helps enterprises accumulate and share professional knowledge

### 5. [Ticket System](modules/ticket.md)

🎫 **Customer Problem Process Management Tool**

- Supports ticket creation, assignment, tracking, evaluation
- Customizable workflow and priority management
- Ensures customer problems are resolved timely and effectively

### 6. [Workflow - In Development...](modules/workflow.md)

⚙️ **Business Process Design Platform**

- Visual process design and execution
- Supports custom approval processes, task assignment
- Status tracking, improving team collaboration efficiency

### 7. [Call Center - In Development...](plugins/freeswitch.md)

☎️ **Full-featured Call System**

- Professional call platform based on FreeSwitch
- Supports incoming call popup, automatic assignment, call recording
- Data statistics, seamless integration of voice and text services

### 8. [Video Customer Service - In Development...](plugins/webrtc.md)

📹 **Real-time Video Service Solution**

- High-definition video calls based on WebRTC technology
- Supports one-click video dialogue and screen sharing
- Suitable for service scenarios requiring intuitive display

### 9. [Voice of Customer - In Development...](modules/voc.md)

📣 **Customer Feedback Management System**

- Collects and analyzes customer feedback and suggestions
- Helps enterprises understand customer needs and pain points
- Discovers product and service improvement opportunities

### 10. [Open Platform...](modules/open.md)

<!-- ## Download

- [Download](https://www.weiyuai.cn/download/)
- [PPT](https://www.weiyuai.cn/download/ppt/) 
-->

## Terms of Use

- **Prohibited Uses**: Strictly prohibited for use in illegal and non-compliant businesses containing trojans, viruses, pornography, gambling, fraud, etc.
- **Disclaimer**: This software does not guarantee any form of legal liability, please bear the usage risks yourself
