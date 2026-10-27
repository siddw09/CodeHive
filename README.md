# CodeHive

> A real-time collaborative code review workspace for writing, discussing, and improving code together.

CodeHive is a browser-based collaborative coding and code review platform. It allows developers, students, mentors, and teams to create shared coding rooms, edit code together in real time, and discuss specific lines through threaded comments.

Instead of switching between code editors, chat applications, screenshots, and review tools, CodeHive brings collaborative coding and contextual discussion into one workspace.

## Table of Contents

- [Idea Overview](#idea-overview)
  - [The Problem](#the-problem)
  - [The Solution](#the-solution)
  - [Intended Users](#intended-users)
- [Project Goals](#project-goals)
- [Core Features](#core-features)
- [How CodeHive Works](#how-codehive-works)
- [Technical Implementation](#technical-implementation)
  - [Frontend](#frontend)
  - [Backend](#backend)
  - [Database](#database)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Installation](#local-installation)
- [Using CodeHive](#using-codehive)
- [API Reference](#api-reference)
- [Real-Time Events](#real-time-events)
- [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)
- [Development Notes](#development-notes)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Project Links](#project-links)

---

## Idea Overview

Code reviews and collaborative programming are often spread across multiple tools. Developers may share code in a chat application, discuss it in a separate call, and later copy the final changes into a repository. This process can make discussions difficult to follow because feedback is separated from the code it refers to.

CodeHive solves this problem by providing a shared coding environment where users can:

1. Create a collaborative coding room.
2. Select a programming language.
3. Edit code together in real time.
4. Share the room URL with other users.
5. Add comments to specific lines of code.
6. Reply to comments in threaded discussions.
7. Review and improve code without leaving the room.

The platform is designed to make code discussions more focused, interactive, and easier to understand.

### The Problem

Traditional code review and collaborative coding workflows can create several problems:

- Feedback may be disconnected from the relevant code.
- Developers may need to switch between multiple applications.
- Beginners may find traditional pull request workflows difficult.
- Mentors and students may need a simpler way to discuss code.
- Teams may want to review ideas before opening a formal pull request.
- Real-time collaboration is not always available in standard code review tools.

### The Solution

CodeHive provides a simple room-based collaboration model:

```text
Create a room
      ↓
Choose a programming language
      ↓
Share the room URL
      ↓
Edit code together
      ↓
Comment on specific lines
      ↓
Reply and discuss improvements
```

### Intended Users

CodeHive can be used by:

- Developers performing collaborative code reviews
- Students working on programming assignments
- Teachers and mentors explaining code
- Interviewers and candidates discussing solutions
- Open-source contributors reviewing ideas
- Teams debugging code together
- Developers brainstorming before creating a pull request

---

## Project Goals

The main goals of CodeHive are:

- Make collaborative coding simple and accessible.
- Keep feedback connected to specific lines of code.
- Provide real-time code synchronization.
- Reduce dependency on multiple communication tools.
- Create a lightweight alternative to complex review workflows.
- Help users learn, discuss, and improve code together.

---

## Core Features

- Create collaborative coding rooms.
- Join existing rooms using a shareable URL.
- Browse recently created rooms.
- Select a programming language for each room.
- Edit code using the Monaco Editor.
- Synchronize code changes in real time.
- Add comments to specific code lines.
- Reply to comments through threaded discussions.
- Receive new comments and replies without refreshing the page.
- Copy room URLs for easy collaboration.
- Store recently visited rooms in the browser.
- Use a command palette with `Ctrl + K` or `⌘ + K`.
- Navigate between landing, feature, room, and editor pages.
- Support for JavaScript, Python, Java, TypeScript, and C++ rooms.

---

## How CodeHive Works

### 1. Create a Room

A user enters:

- Their name
- A room title
- A programming language

The frontend sends this information to the backend API. The server creates a new room in MongoDB and returns the room information.

### 2. Open the Room

After the room is created, the user is redirected to:

```text
/room/:id
```

The room ID allows the room to be accessed through a unique URL.

### 3. Share the Room

The user can copy the room URL and send it to collaborators. Anyone with the URL can open the same room in their browser.

### 4. Edit Code Together

When a user modifies the code:

- The local editor updates immediately.
- The frontend emits a Socket.IO event.
- The server receives the event.
- The server broadcasts the change to other users in the same room.
- The latest code is stored in MongoDB.

### 5. Add Line Comments

Users can comment on specific lines of code. Each comment includes:

- Room ID
- Line number
- Author
- Comment text
- Creation time

Comments are saved in MongoDB and broadcast to other participants in real time.

### 6. Reply to Comments

Users can reply to existing comments. Replies are embedded in the parent comment document and displayed as discussion threads.

---

## Technical Implementation

CodeHive uses a client-server architecture:

```text
React + Vite Frontend
        │
        ├── Axios REST API requests
        └── Socket.IO real-time communication
        │
Express + Socket.IO Backend
        │
        └── MongoDB database through Mongoose
```

### Frontend

The frontend is a React single-page application created with Vite.

It uses:

- **React** for the user interface.
- **React Router** for navigation.
- **Axios** for API requests.
- **Socket.IO Client** for real-time updates.
- **Monaco Editor** for code editing.
- **Tailwind CSS** for styling.

The main frontend routes are:

| Route | Description |
| :--- | :--- |
| `/` | Landing page |
| `/features` | Features overview |
| `/rooms` | Create and browse rooms |
| `/room/:id` | Collaborative coding room |

### Backend

The backend is built with Node.js and Express.

It is responsible for:

- Creating rooms.
- Fetching rooms.
- Updating room code.
- Fetching comments.
- Creating comments.
- Adding replies.
- Connecting to MongoDB.
- Managing Socket.IO connections.
- Broadcasting code and comment updates.

The backend listens on port `5000`.

### Database

MongoDB stores rooms and comments.

#### Room Model

A room contains:

- `title`
- `language`
- `code`
- `createdAt`

#### Comment Model

A comment contains:

- `roomId`
- `lineNumber`
- `author`
- `text`
- `replies`
- `createdAt`

Replies contain:

- `author`
- `text`
- `createdAt`

---

## Technology Stack

### Frontend

- JavaScript
- React 18
- Vite
- React Router
- Monaco Editor
- Axios
- Socket.IO Client
- Tailwind CSS
- Radix UI
- Lucide React

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Socket.IO
- CORS
- dotenv

### Repository Language Composition

- **JavaScript**: ~63.9%
- **CSS**: ~35.7%
- **HTML**: ~0.4%

---

## Project Structure

```text
CodeHive/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CommentSidebar.jsx
│   │   │   ├── CommentThread.jsx
│   │   │   ├── CommandPalette.jsx
│   │   │   ├── Editor.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ui/
│   │   ├── lib/
│   │   ├── pages/
│   │   │   ├── Features.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Landing.jsx
│   │   │   └── Room.jsx
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── jsconfig.json
│   └── vite.config.js
│
├── server/
│   ├── models/
│   │   ├── Room.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── room.js
│   │   └── comments.js
│   ├── socket/
│   │   └── handlers.js
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── index.js
├── .gitignore
└── README.md
```

---

## Prerequisites

Before running CodeHive locally, make sure the following are installed:

- **Node.js 18** or newer
- **npm**
- **Git**
- **MongoDB** (running locally or MongoDB Atlas)

Check installed versions:

```bash
node --version
npm --version
git --version
```

---

## Local Installation

### 1. Clone the Repository

```bash
git clone [https://github.com/sohamm-76/CodeHive.git](https://github.com/sohamm-76/CodeHive.git)
cd CodeHive
```

### 2. Configure MongoDB

Create a `.env` file inside the `server` directory:

```text
server/.env
```

Add your MongoDB connection string:

```env
MONGO_URI=mongodb://127.0.0.1:27017/codehive
```

If you are using MongoDB Atlas, use your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>?retryWrites=true&w=majority
```

> **Note:** Do not commit your `.env` file or expose database credentials publicly.

### 3. Install Backend Dependencies

```bash
cd server
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../client
npm install
```

### 5. Start the Backend

From the `server` directory, run:

```bash
node index.js
```

The backend runs at:

```text
http://localhost:5000
```

The backend provides:

- REST API endpoints
- MongoDB connection
- Socket.IO real-time communication

The current `server/package.json` does not define a `start` script. To use `npm start`, add the following script:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

### 6. Start the Frontend

From the `client` directory, run:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5174
```

Open the application in your browser at `http://localhost:5174`.

---

## Using CodeHive

### Create a New Room

1. Open `http://localhost:5174`.
2. Navigate to the rooms page.
3. Enter your name.
4. Enter a room title.
5. Select a programming language.
6. Click **Create Room**.

You will be redirected to your new collaborative coding room.

### Join an Existing Room

1. Ask another user for the room URL.
2. Open the URL in your browser.
3. Enter or confirm your username.
4. Start collaborating inside the room.

### Invite Collaborators

1. Open a room.
2. Click **Copy Link**.
3. Send the copied URL to your collaborators.
4. All participants opening the same room URL connect to the same Socket.IO room.

### Edit Code

Inside a room:

- Type directly into the code editor.
- Select the appropriate programming language.
- Changes are broadcast to connected users.
- The latest version of the code is saved to MongoDB.

### Add a Comment

To add a line-specific comment:

1. Select the relevant line in the editor.
2. Open the comments panel.
3. Enter your feedback.
4. Submit the comment.

The comment will be saved and shared with other users in real time.

### Reply to a Comment

To reply to an existing comment:

1. Open the comment thread.
2. Enter your reply.
3. Submit the reply.

The updated thread will be shown to everyone in the room.

### Use the Command Palette

Press:

```text
Ctrl + K
```

on Windows/Linux, or:

```text
⌘ + K
```

on macOS.

The command palette provides quick access to supported application actions.

---

## API Reference

The backend API is available at:

```text
http://localhost:5000
```

### Room Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/rooms` | Returns the six most recent rooms |
| `POST` | `/api/rooms` | Creates a new room |
| `GET` | `/api/rooms/:id` | Retrieves a room by ID |
| `PUT` | `/api/rooms/:id/code` | Updates room code |

#### Create Room Example

```http
POST /api/rooms
Content-Type: application/json
```

```json
{
  "title": "Authentication Review",
  "language": "javascript",
  "code": "// Start writing code here..."
}
```

### Comment Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/comments/:roomId` | Returns comments for a room |
| `POST` | `/api/comments` | Creates a line-specific comment |
| `POST` | `/api/comments/:id/reply` | Adds a reply to a comment |

#### Create Comment Example

```http
POST /api/comments
Content-Type: application/json
```

```json
{
  "roomId": "ROOM_ID",
  "lineNumber": 12,
  "author": "Your Name",
  "text": "Could this logic be extracted into a helper?"
}
```

#### Create Reply Example

```http
POST /api/comments/COMMENT_ID/reply
Content-Type: application/json
```

```json
{
  "author": "Reviewer",
  "text": "Good suggestion. I will refactor this section."
}
```

---

## Real-Time Events

CodeHive uses Socket.IO rooms to isolate collaboration sessions.

| Event | Direction | Description |
| :--- | :--- | :--- |
| `join-room` | Client → Server | Joins a user to a room |
| `code-change` | Client → Server | Sends a code change |
| `code-update` | Server → Client | Sends updated code to other users |
| `new-comment` | Client → Server | Sends a new comment |
| `comment-added` | Server → Client | Sends a new comment to other users |
| `new-reply` | Client → Server | Sends a new reply |
| `reply-added` | Server → Client | Sends an updated comment thread |

### Code Collaboration Flow

```text
User changes code
      ↓
Client emits "code-change"
      ↓
Server receives the event
      ↓
Server broadcasts "code-update"
      ↓
Other users update their editors
```

### Comment Collaboration Flow

```text
User creates a comment
      ↓
Comment is saved through the REST API
      ↓
Client emits "new-comment"
      ↓
Server broadcasts "comment-added"
      ↓
Other users see the comment immediately
```

---

## Available Scripts

### Client Scripts

Run these commands from the `client` directory:

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server |
| `npm start` | Starts the Vite development server |
| `npm run build` | Creates a production build |
| `npm run preview` | Previews the production build locally |

### Server Commands

Run the backend from the `server` directory:

```bash
node index.js
```

A production start script can be added to `server/package.json`:

```json
{
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## Configuration

### Backend Environment Variables

The backend currently uses the following environment variable:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/codehive` |

Example `server/.env` file:

```env
MONGO_URI=mongodb://127.0.0.1:27017/codehive
```

### Frontend URLs

The frontend currently connects to the backend using:

```text
http://localhost:5000
```

The Vite development server runs on:

```text
http://localhost:5174
```

For production deployment, these URLs should be moved into environment variables.

---

## Troubleshooting

### MongoDB Connection Errors

If the backend cannot connect to MongoDB:

- Confirm MongoDB is running locally.
- Check the `MONGO_URI` value.
- Confirm that your MongoDB Atlas cluster is active.
- Add your IP address to MongoDB Atlas network access.
- Verify that the database username and password are correct.

### Frontend Cannot Connect to Backend

Check the following:

- The backend is running on port `5000`.
- The frontend is running on port `5174`.
- The frontend API URLs point to `http://localhost:5000`.
- No other application is using port `5000`.
- Check the browser developer console for errors.

### Real-Time Updates Are Not Working

If code or comments are not synchronizing:

- Confirm that both users opened the same room URL.
- Confirm that the backend is running.
- Check the browser console for Socket.IO errors.
- Check the backend terminal for connection messages.
- Verify that the frontend is connecting to port `5000`.

### Port Already in Use

If port `5000` or `5174` is already being used:

- Stop the application using the port.
- Change the backend port in `server/index.js`.
- Update the frontend API and Socket.IO URLs accordingly.
- Update the Vite port in `client/vite.config.js` if necessary.

---

## Development Notes

- Authentication is not currently implemented.
- Usernames are stored in browser `localStorage`.
- CORS is currently enabled for all origins for development purposes.
- Production deployments should restrict CORS to trusted frontend domains.
- The frontend uses hard-coded local development URLs.
- Production deployments should use environment variables for API URLs.
- Room code and comments are persisted in MongoDB.
- Automated tests are not currently configured.
- The backend package currently contains a placeholder test script.

---

## Future Improvements

Potential future enhancements include:

- User authentication and account management
- Room access control and private rooms
- User presence indicators
- Multiple users with live cursors
- Syntax validation and code execution
- More programming languages
- Comment resolution and status tracking
- Markdown support in comments
- File and project-level collaboration
- Room expiration and cleanup
- Deployment configuration
- Automated unit and integration tests
- CI/CD workflows
- Improved error handling and validation
- Environment-based frontend configuration

---

## Contributing

Contributions are welcome.

### Contribution Steps

1. Fork the repository.
2. Clone your fork:
   ```bash
   git clone [https://github.com/](https://github.com/)<your-username>/CodeHive.git
   cd CodeHive
   ```
3. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
4. Install dependencies:
   ```bash
   cd server
   npm install

   cd ../client
   npm install
   ```
5. Configure your local MongoDB connection.
6. Make your changes.
7. Test the frontend and backend locally.
8. Commit your changes:
   ```bash
   git add .
   git commit -m "Add your feature"
   ```
9. Push your branch:
   ```bash
   git push origin feature/your-feature
   ```
10. Open a pull request.

When submitting a pull request, include:

- A clear description of the change.
- Screenshots for UI changes.
- Setup instructions if configuration changed.
- Testing steps.
- Any known limitations.

---

## License

This project does not currently declare a license.

Add a `LICENSE` file before distributing CodeHive or accepting external contributions under formally defined terms.

---

## Project Links

- **Repository**: [sohamm-76/CodeHive](https://github.com/sohamm-76/CodeHive)