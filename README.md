# Chat Application

A real-time chat application with language-based rooms using NestJS, Socket.IO, MongoDB, React, and Tailwind CSS.

## Features

- Multiple chat rooms based on languages (English, Hindi, Gujarati, etc.)
- Real-time messaging using Socket.IO
- Messages stored in MongoDB
- Responsive UI with Tailwind CSS

## Setup

1. Ensure MongoDB is running locally on port 27017.

2. Backend:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

3. Frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open http://localhost:5175 in your browser.

## Usage

- Select a language from the left sidebar to join that chat room.
- Type and send messages in real-time.