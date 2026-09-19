import { useState } from "react";
import { api } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.login(email, password);
      if (res.status === "success") {
        localStorage.setItem("intruert_token", res.token);
        window.location.href = "/";
      } else {
        setError(res.error || "Login failed");
      }
    } catch (err) {
      setError("Network error occurred.");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "80vh" }}>
      <div className="glass-panel" style={{ padding: "2rem", width: "100%", maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Welcome to Intruert</h2>
        <form onSubmit={handleLogin}>
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
          <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>Login</button>
        </form>
        <p className="text-center mt-4" style={{ color: "var(--color-text-muted)" }}>
          Don't have an account? <a href="/register" style={{ color: "var(--color-primary)" }}>Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
