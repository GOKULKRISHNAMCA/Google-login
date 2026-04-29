import { useState, useEffect } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  .login-bg { min-height: 100vh; background: #0f0f0f; display: flex; align-items: center; justify-content: center; font-family: 'DM Sans', sans-serif; }
  .login-card { background: #161616; border: 1px solid #2a2a2a; border-radius: 24px; padding: 48px 40px; width: 100%; max-width: 420px; }
  .login-accent { width: 40px; height: 4px; background: linear-gradient(90deg, #6c63ff, #a78bfa); border-radius: 2px; margin-bottom: 24px; }
  .login-title { font-family: 'Playfair Display', serif; font-size: 32px; color: #f5f5f5; margin-bottom: 8px; }
  .login-subtitle { font-size: 14px; color: #666; margin-bottom: 36px; }
  .input-group { margin-bottom: 20px; }
  .input-label { display: block; font-size: 12px; font-weight: 500; color: #888; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; }
  .input-field { width: 100%; padding: 14px 16px; background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 12px; color: #f5f5f5; font-size: 15px; font-family: 'DM Sans', sans-serif; outline: none; transition: border-color 0.2s; }
  .input-field:focus { border-color: #6c63ff; }
  .input-field::placeholder { color: #444; }
  .login-btn { width: 100%; padding: 15px; background: linear-gradient(135deg, #6c63ff, #a78bfa); border: none; border-radius: 12px; color: white; font-size: 15px; font-weight: 500; font-family: 'DM Sans', sans-serif; cursor: pointer; margin-top: 8px; }
  .login-btn:hover { opacity: 0.9; }
  .login-hint { text-align: center; font-size: 13px; color: #555; margin-top: 20px; }
`;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/home";
    }
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      const res = await axios.post("https://react-app-server-95bw.onrender.com/login", { username, password });
      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/home";
    } catch (err) {
      try {
        const res = await axios.post("https://react-app-server-95bw.onrender.com/register", { username, password });
        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/home";
      } catch (e) {
        alert("Error connecting to server");
      }
    }
    setLoading(false);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="login-bg">
        <div className="login-card">
          <div className="login-accent" />
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in or create a new account</p>
          <div className="input-group">
            <label className="input-label">Username</label>
            <input className="input-field" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label className="input-label">Password</label>
            <input className="input-field" type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="login-btn" onClick={login} disabled={loading}>
            {loading ? "Connecting..." : "Continue →"}
          </button>
          <p className="login-hint">No account? We will create one automatically.</p>
        </div>
      </div>
    </>
  );
}

export default Login;