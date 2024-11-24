# RealTimeEdify

RealTimeEdify is a real-time collaborative document editing web application built using the MERN stack (MongoDB, Express.js, React, Node.js), Socket.IO for real-time communication, and Quill as the text editor.

## Screenshots:
![image](https://github.com/user-attachments/assets/adcf343e-4cd4-409e-b194-c9ec7a3be3ac)
![image](https://github.com/user-attachments/assets/808859f8-d3a0-40af-80aa-dff6e978a5c1)
![image](https://github.com/user-attachments/assets/1a759dce-e026-4a16-8f93-13bce44c99e8)


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
2. **Install dependencies for frontend:**

  ```bash
     cd src
     cd client
     npm i
  ```
3. **Install dependencies for backend:**

  ```bash
     cd src
     npm i
  ```

3. **Set up .env variables by creating a .env file in the server directory and adding the following variables:**

  - For server side:
   ```bash
    MONGODB_URI=your_mongo_db_uri
    JWT_SECRET=your_jwt_secret
    PORT=8000
    PASSWORD=your_app_password_for_email
    EMAIL=your_gmail_email
    BACKEND_URL=your_backend_url/api/v1
    FRONTEND_URL=your_frontend_url
    PRODUCTION=false
   ```

   Replace `your_mongodb_connection_string`, `your_jwt_secret`, `your_email_username`, `your_email_password`, `your_email_host`, and `your_email_port` with your own values.

  **Note:** If you are using Gmail for sending emails, you need to enable "Less secure app access" in your Google account settings.

  - For client side:
   ```bash
    VITE_APP_BACKEND_URL=your_backend_url/api/v1
    VITE_APP_SOCKET_URL=your_backend_url
   ```

   Replace `your_backend_url` with the URL where the backend server is running.

4. **Run the frontend**
  ```bash
    cd src
    cd client
    npm run dev
  ```

5. **Run the backend**
  ```bash
    cd src
    npm run dev
  ```
6. **Access the application in your browser at http://localhost:5173.**

7. **Create an account and start collaborating on documents!**

## **Contributing**

Contributions are welcome! Please refer to the [Contributing Guidelines](contributing.md) for more information.

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
