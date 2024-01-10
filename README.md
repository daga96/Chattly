# Chattly

Chattly is a real-time messaging platform that facilitates seamless connections, chats, and sharing of experiences among users.

## Getting Started

Follow these steps to set up and run the Chat Application locally:

1. Clone the repository: 
   ```
   git clone https://github.com/daga96/Chattly.git
   ```

2. Install dependencies for the frontend: 
   ```
   cd frontend/Chatterly && npm install
   ```

3. Install dependencies for the backend: 
   ```
   cd server && npm install
   ```

4. If you want to run the building of TailwindCSS: 
   ```
   npx tailwindcss -i src/input.css -o public/output.css --watch
   ```
5. Set up MongoDB: Make sure to have MongoDB installed and running. Create a database named Chattly and update the MongoDB connection string in the .env file in the server directory.

6. Start the frontend and backend servers: 
   ```
   npm run dev
   ```

7. Open your browser and visit [http://localhost:5173](http://localhost:5173) to access the application.

## Technologies Used

**Frontend:**
- React
- Tailwind CSS

**Backend:**
- Node.js
- Koa.js
- Socket.IO
