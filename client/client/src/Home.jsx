import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

 if (!user) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0f0f0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'DM Sans, sans-serif'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ color: '#f5f5f5', marginBottom: '16px' }}>Please login first</h2>
        <button
          onClick={() => window.location.href = '/'}
          style={{
            background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
            border: 'none',
            borderRadius: '10px',
            color: 'white',
            fontSize: '14px',
            fontFamily: 'DM Sans, sans-serif',
            padding: '10px 24px',
            cursor: 'pointer'
          }}
        >
          Go to Login →
        </button>
      </div>
    </div>
  );
}

  const user_id = user.id;

  const createPost = async () => {
    await axios.post("https://react-app-server-95bw.onrender.com/post", {
      content,
      user_id,
    });
    setContent("");
    loadPosts();
  };

  const loadPosts = async () => {
    const res = await axios.get(`https://react-app-server-95bw.onrender.com/posts/${user_id}`);
    setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Welcome {user.username}</h2>

      <input
        value={content}
        placeholder="Type something..."
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={createPost}>Post</button>

      <h3>Your Posts</h3>
      {posts.map((p) => (
        <div key={p.id}>
          <p>{p.content}</p>
          <small>{new Date(p.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

export default Home;