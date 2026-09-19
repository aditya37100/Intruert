# Intruert

Intruert is a modern, responsive web application designed for integrating and managing security cameras with active AI anomaly detection (such as fighting or accident detection).

## Features
- **Camera Management**: Seamlessly add and manage RTSP camera streams (or use `0` to test with your local webcam!).
- **AI Anomaly Detection**: Built-in computer vision models (PyTorch & Keras) running in the background to automatically flag unusual activities.
- **Automated Cloud Recording**: Automatically records incidents and uploads them securely to the cloud (Cloudinary) when an anomaly is detected.
- **Real-Time Dashboard**: A stunning React frontend using glassmorphism and modern UI design to view cameras, live streams, and historical incidents.

## Architecture
- **Frontend**: React, Vite, CSS
- **Backend**: Flask (Python), MongoDB, OpenCV, PyTorch, Keras
- **Cloud**: MongoDB Atlas, Cloudinary

## Getting Started

### Prerequisites
1. **Python 3.10+**: Ensure Python is installed and accessible in your terminal.
2. **Node.js**: Ensure Node.js (and `npm`) is installed.
3. **MongoDB Atlas**: Create a free MongoDB Atlas cluster and get your connection string.
4. **Cloudinary**: Create a free Cloudinary account and get your Cloud Name, API Key, and API Secret.

### Backend Setup
1. Open a terminal and navigate to the `backend` folder.
2. Create a virtual environment: `python -m venv venv`
3. Activate the virtual environment: 
   - Windows: `.\venv\Scripts\activate`
   - Mac/Linux: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Configure your environment variables:
   - Copy `.env.example` to a new file named `.env`
   - Fill in your `MONGO_PASS` (MongoDB connection string).
   - Fill in your `SECRET_KEY` (Any random string for JWT token generation).
   - Fill in your `CLOUD_NAME`, `API_KEY`, and `API_SECRET` from Cloudinary.
6. Run the server: `python main.py`

### Frontend Setup
1. Open a new terminal and navigate to the `frontend` folder.
2. Install dependencies: `npm install`
3. Start the dev server: `npm run dev`
4. Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

## How to Use the App
1. **Register**: Create an account on the home page.
2. **Add a Camera**: On the dashboard, click "Add Camera". Give it a name and provide the RTSP URL of your security camera. *(Note: If you just want to test the AI on your laptop, enter `0` as the URL to use your local webcam!)*
3. **View Live Stream**: Click "View Live Stream" on your camera card to monitor the feed in real-time.
4. **Start Anomaly Detection**: 
   - Ensure the Live Stream is **closed** (webcams can only be accessed by one process at a time).
   - Click **Start Service**. The AI will now silently monitor the camera in the background.
   - Act out a rapid movement or struggle in front of the camera for 10-15 seconds.
5. **View Recordings**: If the AI detects an anomaly (like a fight), it will flag it and upload the video to Cloudinary. Click **View Recordings** on the dashboard to review and watch the incident!
