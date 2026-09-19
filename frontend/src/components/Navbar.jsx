function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("intruert_token");
    window.location.href = "/login";
  };

  return (
    <nav className="glass-panel" style={{ 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center", 
      padding: "1rem 2rem",
      margin: "1rem 2rem 0 2rem",
      borderRadius: "var(--radius-lg)"
    }}>
      <h3 style={{ margin: 0, color: "var(--color-primary)" }}>Intruert</h3>
      <button onClick={handleLogout} className="btn" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
