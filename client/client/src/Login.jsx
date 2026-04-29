import { useState, useEffect } from "react";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      window.location.href = "/home";
    }
  }, []);

  const login = async () => {
    try {
      const res = await axios.post("https://react-app-server-95bw.onrender.com/login", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));
      window.location.href = "/home";
    } catch (err) {
      try {
        const res = await axios.post("https://react-app-server-95bw.onrender.com/register", {
          username,
          password,
        });

        localStorage.setItem("user", JSON.stringify(res.data));
        window.location.href = "/home";
      } catch (e) {
        alert("Error connecting to server");
      }
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login Page</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      /><br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;