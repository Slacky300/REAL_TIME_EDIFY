# RealTimeEdify

RealTimeEdify is a real-time collaborative document editing web application built using the MERN stack (MongoDB, Express.js, React, Node.js), Socket.IO for real-time communication, and Quill as the text editor.

## Screenshots:
![image](https://github.com/Slacky300/REAL_TIME_DOCUMENT_COLLAB/assets/98531038/ccc71196-ef17-4e6b-a009-6890ccf29801)
![image](https://github.com/Slacky300/REAL_TIME_DOCUMENT_COLLAB/assets/98531038/8ed42342-12ac-484c-9de8-a5e4497f565c)
![image](https://github.com/Slacky300/REAL_TIME_DOCUMENT_COLLAB/assets/98531038/f6b69a9b-7e5f-4211-87f6-016e766ab8ec)


## Features

### 1. Document Collaboration

Users can create documents and collaborate with others in real-time. Collaborators can simultaneously edit the document, and changes are instantly reflected for all participants.

### 2. Collaborator Presence

The web app displays a list of online collaborators for each document. Users can see who else is currently active in the document, making collaboration more transparent.

### 3. Email Verification
<p align="center">
  <img width="521" alt="Email Verification" src="https://github.com/Slacky300/REAL_TIME_EDIFY/assets/98531038/1ecad94d-eb4b-408c-9b84-9434a9994461">
</p>

To enhance security and user authentication, RealTimeEdify implements email verification for user accounts. Users receive an email with a verification link upon registration.

To enhance security and user authentication, RealTimeEdify implements email verification for user accounts. Users receive an email with a verification link upon registration.

### 4. Real-Time Editing

Quill, a powerful and customizable WYSIWYG editor, is integrated into RealTimeEdify to provide a seamless real-time editing experience. Users can see live updates as collaborators edit the document.

## Technologies Used

- **MERN Stack:**
  - MongoDB: NoSQL database for storing user data and document content.
  - Express.js: Backend framework for building the API.
  - React: Frontend library for building the user interface.
  - Node.js: JavaScript runtime for server-side development.

- **Socket.IO:**
  - Enables real-time bidirectional communication between clients and the server. Used for collaborative editing and presence tracking.

- **Quill:**
  - Feature-rich WYSIWYG editor used for document editing. Customized for real-time collaboration.

## Getting Started

Follow these steps to run RealTimeEdify locally:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/RealTimeEdify.git
   cd RealTimeEdify
   ```
2. **Install dependencies:**

  ```bash
   cd client
   npm i
   cd ../server
   npm i
  ```
3. **Set up your MongoDB database and update the connection string in the server's .env file.**

4. **Run the application**
  ```bash
  cd server
  npm run dev
  cd ../client
  npm run dev
  ```

5. **Access the application in your browser at http://localhost:5173.**
