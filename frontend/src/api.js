const API_URL = "http://localhost:8000";

const getHeaders = (authorized = false) => {
  const headers = {
    "Content-Type": "application/json",
  };
  
  if (authorized) {
    const token = localStorage.getItem("intruert_token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

export const api = {
  // Authentication
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },
  
  register: async (name, email, password) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  // Camera
  addCamera: async (rtsp, camera_name) => {
    const response = await fetch(`${API_URL}/camera/addCamera`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ rtsp, camera_name }),
    });
    return response.json();
  },

  getCameraList: async () => {
    const response = await fetch(`${API_URL}/camera/camera_list`, {
      method: "GET",
      headers: getHeaders(true),
    });
    return response.json();
  },

  deleteCamera: async (camera_id) => {
    const response = await fetch(`${API_URL}/camera/delete_camera`, {
      method: "DELETE",
      headers: getHeaders(true),
      body: JSON.stringify({ camera_id }),
    });
    return response.json();
  },

  updateCameraName: async (camera_id, new_camera_name) => {
    const response = await fetch(`${API_URL}/camera/update_camera_name`, {
      method: "PATCH",
      headers: getHeaders(true),
      body: JSON.stringify({ camera_id, new_camera_name }),
    });
    return response.json();
  },

  // Service
  startService: async (camera_id, device_token) => {
    const response = await fetch(`${API_URL}/user/start`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ camera_id, device_token }),
    });
    return response.json();
  },

  // Recordings
  getRecordings: async (camera_id) => {
    const response = await fetch(`${API_URL}/recording/get_recordings?id=${camera_id}`, {
      method: "GET",
      headers: getHeaders(true),
    });
    return response.json();
  },

  deleteRecording: async (camera_id, filename) => {
    const response = await fetch(`${API_URL}/recording/delete_recording`, {
      method: "DELETE",
      headers: getHeaders(true),
      body: JSON.stringify({ camera_id, filename }),
    });
    return response.json();
  },

  getLiveStreamUrl: (camera_id) => {
    const token = localStorage.getItem("intruert_token") || "";
    return `${API_URL}/user/view?id=${camera_id}&token=${token}`;
  }
};
