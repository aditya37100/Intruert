import { useState, useEffect } from "react";
import { api } from "../api";
import CameraCard from "../components/CameraCard";

function Dashboard() {
  const [cameras, setCameras] = useState([]);
  const [newCameraName, setNewCameraName] = useState("");
  const [newRtspUrl, setNewRtspUrl] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCameras = async () => {
    try {
      const res = await api.getCameraList();
      if (res.status === "success" && res.camera_list) {
        setCameras(res.camera_list);
      } else if (res.error === "Unauthorized") {
        localStorage.removeItem("intruert_token");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error("Failed to fetch cameras");
    }
  };

  useEffect(() => {
    fetchCameras();
  }, []);

  const handleAddCamera = async (e) => {
    e.preventDefault();
    if (!newRtspUrl || !newCameraName) return;
    const res = await api.addCamera(newRtspUrl, newCameraName);
    if (res.status === "success") {
      setNewCameraName("");
      setNewRtspUrl("");
      setShowAddForm(false);
      fetchCameras();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this camera?")) {
      await api.deleteCamera(id);
      fetchCameras();
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <div className="flex justify-between items-center mb-4">
        <h2>Dashboard</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Cancel" : "+ Add Camera"}
        </button>
      </div>

      {showAddForm && (
        <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <h3>Add New Camera</h3>
          <form onSubmit={handleAddCamera} style={{ marginTop: "1rem" }}>
            <div className="form-group">
              <label>Camera Name</label>
              <input 
                type="text" 
                className="input-field" 
                value={newCameraName} 
                onChange={(e) => setNewCameraName(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label>RTSP URL</label>
              <input 
                type="text" 
                className="input-field" 
                value={newRtspUrl} 
                onChange={(e) => setNewRtspUrl(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Camera</button>
          </form>
        </div>
      )}

      <div>
        {cameras.length === 0 ? (
          <div className="glass-panel text-center" style={{ padding: "3rem" }}>
            <p style={{ color: "var(--color-text-muted)" }}>No cameras found. Add a camera to get started.</p>
          </div>
        ) : (
          cameras.map(camera => (
            <CameraCard 
              key={camera._id} 
              camera={camera} 
              onDelete={handleDelete}
              onUpdate={fetchCameras}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
