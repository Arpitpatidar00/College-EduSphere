# EduSphere - Social Media Platform

## Overview

EduSphere a social media platform designed for students and colleges to connect, share achievements, participate in hackathons, and exchange valuable resources. The platform facilitates interaction between students of the same college and across different institutions.

## Features

### Functional Features

- **User Profiles**: Users (students, admins, colleges) can create and manage profiles.
- **College Network**: Connect with students from the same college and other institutions.
- **Post Sharing**: Users can share posts, achievements, and events.
- **Comment & Like System**: Engage with posts through comments and likes.
- **Event Management**: Colleges and students can create and participate in events.
- **Resource Sharing**: Colleges can upload and share learning materials.
- **Real-time Messaging**: Users can chat with each other in real time.

### Non-Functional Features

- **Scalability**: Supports a growing number of users and institutions.
- **Performance Optimization**: Indexed queries for fast data retrieval.
- **Security**: JWT authentication, role-based access control, and encrypted data storage.
- **Availability**: Uses a MongoDB replica set for high availability.

## System Architecture

```
       ┌─────────────┐              ┌───────────────┐
       │  Users      │  ─────────►  │  Colleges      │
       └─────────────┘              └───────────────┘
             │                               │
             ▼                               ▼
       ┌─────────────┐              ┌───────────────┐
       │  Posts      │◄───────────► │  Comments      │
       └─────────────┘              └───────────────┘
             │                               │
             ▼                               ▼
       ┌─────────────┐              ┌───────────────┐
       │  Events     │◄───────────► │  Achievements  │
       └─────────────┘              └───────────────┘
             │
             ▼
       ┌─────────────┐
       │  Messages   │
       └─────────────┘
```

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT-based authentication
- **Real-time Communication**: WebSockets for messaging

## Database Connection Diagram

```
              ┌──────────────────────────────┐
              │       FRONTEND (React)       │
              └──────────────┬───────────────┘
                             │
                             ▼
      ┌──────────────────────────────────────────┐
      │         API GATEWAY (Express)            │  ➝ Auth, Rate limiting, Routing
      └───────────────────────────┬─────────────┘
                                  │
    ┌─────────────────────────────┼────────────────────────────┐
    │           BACKEND SERVICES (Node.js)                     │
    ├──────────────────────────────────────────────────────────┤
    │ - User Service   → Manages Authentication & Profiles     │
    │ - Post Service   → Handles Posts, Comments, Likes       │
    │ - Event Service  → Manages Events & Resources           │
    │ - Chat Service   → Handles Real-time Messages           │
    └───────────────────┬─────────────────────────────────────┘
                        │ (MongoDB Client Connection)
                        ▼
 ┌───────────────────────────────────────────────────────┐
 │                DATABASE LAYER (MongoDB)              │
 ├───────────────────────────────────────────────────────┤
 │ **Replica Set for High Availability**                 │
 │    Primary   |  Secondary   |  Secondary             │
 │ (Write Node) | (Read Node)  | (Read Node)            │
 │                                                 🔄   │
 ├───────────────────────────────────────────────────────┤
 │ **Collections**                                      │
 │ - Users → { _id, name, email, collegeId, profilePic }│
 │ - Colleges → { _id, name, location, resources }      │
 │ - Posts → { _id, userId, collegeId, content, likes } │
 │ - Events → { _id, organizerId, collegeId, details }  │
 │ - Messages → { _id, senderId, receiverId, content }  │
 ├───────────────────────────────────────────────────────┤
 │ **Indexes for Fast Queries**                          │
 │ - `userId`, `collegeId` for quick lookups            │
 │ - `createdAt` for sorting posts/events               │
 └───────────────────────────────────────────────────────┘
```

## EduSphere - Social Media Platform

### Overview

EduSphere is a social media platform designed for students, colleges, and admins to connect, share achievements, and participate in hackathons and events. This document provides a structured breakdown of the platform, including functional and non-functional requirements, database schema, and future enhancements.

### 1. Functional Requirements

#### User Management

- Users (Students, Admins, Colleges) can register and log in.
- Students create profiles linked to their college.
- Admins can manage colleges and monitor activity.

#### Social Features

- Students can connect with other students from their own college and cross-college.
- Users can share achievements, hackathons events, and college resources.
- Users can like, comment, and share posts.

#### Content & Interaction

- Users can create posts (text, images, videos, links).
- Colleges can post announcements and share learning materials.
- Search functionality to find students, colleges, and events.

#### Events & Hackathons

- Colleges and students can create and manage events.
- Users can register for and discuss events.

#### Messaging & Notifications

- Students can send direct messages.
- Notifications for likes, comments, event invitations, and messages.

### 2. Non-Functional Requirements

#### Performance & Scalability

- NoSQL (MongoDB) for fast read/write operations.
- Indexing on frequently queried fields (e.g., collegeName, userId).
- Caching (Redis) for frequently accessed data.
- Horizontal scaling of databases to handle large user bases.

#### Security & Privacy

- JWT authentication for secure user access.
- Role-based access control (RBAC) for admin, student, and college users.
- Data encryption for user passwords and sensitive information.
- Moderation system to filter inappropriate content.

### 3. NoSQL Database Schema Design

#### User Collection (users**\*\*\*\***)

```json
{
  "_id": ObjectId,
  "fullName": "John Doe",
  "email": "johndoe@example.com",
  "password": "hashed_password",
  "role": "student", 
  "collegeId": ObjectId,
  "connections": [ObjectId],  
  "achievements": ["Won AI Hackathons", "Published Research Paper"],
  "createdAt": ISODate,
  "updatedAt": ISODate
}
```

#### College Collection (colleges**\*\*\*\***)

```json
{
  "_id": ObjectId,
  "name": "ABC University",
  "location": "New York",
  "adminId": ObjectId,
  "students": [ObjectId], 
  "events": [ObjectId],  
  "resources": [
    {
      "title": "AI Research Paper",
      "fileUrl": "https://example.com/ai_paper.pdf"
    }
  ],
  "createdAt": ISODate
}
```

#### Post Collection (posts**\*\*\*\***)

```json
{
  "_id": ObjectId,
  "userId": ObjectId,
  "content": "Attended Google Developer Conference!",
  "mediaUrl": "https://example.com/photo.jpg",
  "likes": [ObjectId],  
  "comments": [
    {
      "userId": ObjectId,
      "comment": "That's amazing!",
      "createdAt": ISODate
    }
  ],
  "createdAt": ISODate
}
```

#### Event Collection (events**\*\*\*\***)

```json
{
  "_id": ObjectId,
  "collegeId": ObjectId,
  "title": "Hackathon 2025",
  "description": "A coding competition for students.",
  "date": ISODate,
  "location": "Online",
  "participants": [ObjectId], 
  "createdAt": ISODate
}
```

#### Chat Collection (messages**\*\*\*\***)

```json
{
  "_id": ObjectId,
  "senderId": ObjectId,
  "receiverId": ObjectId,
  "message": "Hey, are you joining the hackathons?",
  "sentAt": ISODate
}
```

### 4. Additional Features & Enhancements

#### AI-Powered Features

- ✅ Smart Matching – Recommend students with similar interests from different colleges.
- ✅ Content Moderation – AI filters to remove spam or inappropriate content.

#### Gamification

- ✅ Leaderboard for Achievements – Show top students for hackathons, research, etc.
- ✅ Badges & Rewards – Earn badges for participation, contributions, and top scores.

#### Improved Search & Discovery

- ✅ Advanced Filtering – Find students by college, skillet, or events attended.
- ✅ Event Recommendations – Suggest relevant hackathons and conferences.

### 5. Conclusion

This schema is:

- ✅ Modular & Scalable – Can accommodate new features easily.
- ✅ Efficient – Uses indexes and references to optimize queries.
- ✅ Secure – Implements authentication and access control.

🔹 **Next Steps**:

- Finalize API routes based on the schema.
- Implement a caching strategy for frequently accessed data.
- Build a user-friendly front end for seamless navigation.

Would you like a REST API structure for these collections? 🚀
