import { useState } from "react";
import { api } from "../api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.register(name, email, password);
      if (res.status === "success") {
        localStorage.setItem("intruert_token", res.token);
        window.location.href = "/";
      } else {
        setError(res.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error occurred.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div className="glass-panel" style={{ padding: "2rem", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              className="input-field" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              className="input-field" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              className="input-field" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          {error && <div className="text-error mb-4">{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Register</button>
        </form>
        <p className="text-center mt-4" style={{ color: "var(--color-text-muted)" }}>
          Already have an account? <a href="/login" style={{ color: "var(--color-primary)" }}>Login</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
