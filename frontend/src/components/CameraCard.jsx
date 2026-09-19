import { useState, useEffect } from "react";
import { api } from "../api";

function CameraCard({ camera, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(camera.camera_name);
  const [isStreamOpen, setIsStreamOpen] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [showRecordings, setShowRecordings] = useState(false);

  const handleUpdate = async () => {
    if (newName.trim() === "") return;
    const res = await api.updateCameraName(camera._id, newName);
    if (res.status === "success") {
      setIsEditing(false);
      onUpdate();
    }
  };

  const handleStartService = async () => {
    // In a real app, device_token would come from Firebase
    const deviceToken = "dummy_device_token";
    await api.startService(camera._id, deviceToken);
    alert("Service started for " + camera.camera_name);
  };

  const toggleRecordings = async () => {
    if (!showRecordings) {
      const res = await api.getRecordings(camera._id);
      if (res.status === "success" && res.recordings) {
        setRecordings(res.recordings);
      }
    }
    setShowRecordings(!showRecordings);
  };

  return (
    <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "1rem" }}>
      <div className="flex justify-between items-center mb-4">
        {isEditing ? (
          <div className="flex gap-4">
            <input 
              type="text" 
              className="input-field" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
            />
            <button className="btn btn-primary" onClick={handleUpdate}>Save</button>
            <button className="btn" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <h3>{camera.camera_name}</h3>
            <span style={{ 
              padding: "0.25rem 0.75rem", 
              borderRadius: "999px", 
              fontSize: "0.75rem", 
              backgroundColor: camera.current_status === "on" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.2)",
              color: camera.current_status === "on" ? "var(--color-success)" : "var(--color-error)"
            }}>
              {camera.current_status.toUpperCase()}
            </span>
          </div>
        )}
        
        <div className="flex gap-4">
          {!isEditing && <button className="btn" onClick={() => setIsEditing(true)}>Edit</button>}
          <button className="btn btn-danger" onClick={() => onDelete(camera._id)}>Delete</button>
        </div>
      </div>

      <div style={{ color: "var(--color-text-muted)", marginBottom: "1.5rem" }}>
        URL: {camera.rtsp_url}
      </div>

      <div className="flex gap-4 mb-4">
        <button className="btn btn-primary" onClick={handleStartService}>Start Service</button>
        <button className="btn btn-primary" onClick={() => setIsStreamOpen(!isStreamOpen)}>
          {isStreamOpen ? "Close Stream" : "View Live Stream"}
        </button>
        <button className="btn btn-primary" onClick={toggleRecordings}>
          {showRecordings ? "Hide Recordings" : "View Recordings"}
        </button>
      </div>

      {isStreamOpen && (
        <div style={{ marginTop: "1rem", borderRadius: "var(--radius-md)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
          <img 
            src={api.getLiveStreamUrl(camera._id)} 
            alt="Live Stream" 
            style={{ width: "100%", height: "auto", display: "block" }} 
          />
        </div>
      )}

      {showRecordings && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Recordings ({recordings.length})</h4>
          {recordings.length === 0 ? (
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>No recordings found.</p>
          ) : (
            <div style={{ display: "grid", gap: "1rem", marginTop: "1rem" }}>
              {recordings.map((rec, idx) => (
                <div key={idx} style={{ padding: "1rem", backgroundColor: "rgba(0,0,0,0.2)", borderRadius: "var(--radius-md)" }}>
                  <div className="flex justify-between">
                    <div>
                      <div style={{ fontWeight: 500, color: "var(--color-error)" }}>Anomaly: {rec.anomaly}</div>
                      <div style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}>Time: {rec.current_time}</div>
                    </div>
                    <a href={rec.video_url} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                      Watch
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CameraCard;
