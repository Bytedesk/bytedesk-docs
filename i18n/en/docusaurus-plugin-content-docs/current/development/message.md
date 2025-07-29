---
sidebar_label: Chat Messages
sidebar_position: 12
---

# Chat Messages

The Weiyu system supports multiple message types to meet communication needs in different scenarios. Each message type has its specific data structure and display method.

## Message Types

### Text Message

The most basic message type, used for sending pure text content.

**Properties:**

- Text content

**Use Cases:**

- General text communication
- Simple Q&A
- Command sending

### Image Message

Used for sending and displaying images.

**Properties:**

- url: Image link address
- width: Image width
- height: Image height
- label: Image label (optional)

**Use Cases:**

- Product display
- Problem screenshots
- Image material sharing

### Voice Message

Used for sending voice recordings.

**Properties:**

- url: Voice file link address
- duration: Voice duration (seconds)
- format: File format (e.g., ogg, mp3)
- caption: Voice description text (optional)
- label: Voice label (optional)

**Use Cases:**

- Voice messages
- Voice replies
- Voice guidance

### Video Message

Used for sending video content.

**Properties:**

- url: Video link address
- coverUrl: Video cover image link
- duration: Video duration
- width: Video width
- height: Video height
- format: Video format
- label: Video label (optional)

**Use Cases:**

- Product demo videos
- Operation guidance videos
- Video feedback

### File Message

Used for sending various types of files.

**Properties:**

- url: File link address
- name: File name
- size: File size
- type: File MIME type
- label: File label (optional)

**Use Cases:**

- Document transmission
- Contract sending
- Material sharing

### Document Message

Specifically used for sending and displaying various documents.

**Properties:**

- url: Document file URL
- name: File name
- size: File size
- type: File MIME type
- caption: Document description text
- thumbnail: Thumbnail URL
- label: Document label (optional)

**Use Cases:**

- PDF document sharing
- Office document sharing
- Technical document transmission

### Audio Message

Used for sending audio files.

**Properties:**

- url: Audio file link address
- duration: Audio duration
- format: File format
- label: Audio label (optional)

**Use Cases:**

- Music sharing
- Audio materials

### Music Message

Message type specifically for music sharing.

**Properties:**

- url: Music file link address
- title: Music title
- artist: Artist/singer
- album: Album name
- coverUrl: Album cover image link
- duration: Music duration
- label: Music label (optional)

**Use Cases:**

- Music recommendations
- Music sharing

### Location Message

Used for sharing geographical location information.

**Properties:**

- latitude: Latitude
- longitude: Longitude
- address: Address text description
- label: Location label (optional)

**Use Cases:**

- Location sharing
- Business address sending
- Meeting point description

### Link Message

Used for sharing web links.

**Properties:**

- url: Link address
- title: Link title
- description: Link description
- imageUrl: Link preview image
- label: Link label (optional)

**Use Cases:**

- Web page sharing
- Article recommendations
- Product links

### Button Message

Used for sending messages containing interactive buttons.

**Properties:**

- type: Button type (e.g., web_url, postback, phone_number, etc.)
- title: Button text title
- payload: Button payload data (for callbacks)
- url: Button click jump link (applicable to web_url type)

**Use Cases:**

- Menu selection
- Quick operations
- Guided interaction

### Robot Message

AI robot automatic reply messages.

**Properties:**

- Question content
- Answer content
- Related recommendations

**Use Cases:**

- Automatic Q&A
- Intelligent customer service
- Knowledge base queries

## Message Recall

Weiyu supports message recall functionality, allowing users to recall sent messages within a certain time after sending.

**Recall Limitations:**

- Time limit: Messages can be recalled within 5 minutes after sending
- Permission limit: Users can only recall messages they sent

**Recall Display:**

- After recall, both parties will see a "This message has been recalled" prompt

## Message Reference

Supports reference reply functionality, allowing users to reference previous message content for replies, facilitating message association.
