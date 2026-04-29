import { useState, useEffect } from "react";
import axios from "axios";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600&family=DM+Sans:wght@300;400;500&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  .home-bg { min-height: 100vh; background: #0f0f0f; font-family: "DM Sans", sans-serif; color: #f5f5f5; }
  .navbar { display: flex; align-items: center; justify-content: space-between; padding: 20px 32px; border-bottom: 1px solid #1e1e1e; background: #0f0f0f; position: sticky; top: 0; z-index: 10; }
  .nav-logo { font-family: "Playfair Display", serif; font-size: 20px; color: #f5f5f5; }
  .nav-user { display: flex; align-items: center; gap: 12px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #6c63ff, #a78bfa); display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 500; color: white; }
  .logout-btn { background: transparent; border: 1px solid #2a2a2a; border-radius: 8px; color: #888; font-size: 13px; font-family: "DM Sans", sans-serif; padding: 6px 14px; cursor: pointer; transition: all 0.2s; }
  .logout-btn:hover { border-color: #444; color: #f5f5f5; }
  .main-content { max-width: 640px; margin: 0 auto; padding: 40px 20px; }
  .post-box { background: #161616; border: 1px solid #2a2a2a; border-radius: 16px; padding: 20px; margin-bottom: 32px; }
  .post-textarea { width: 100%; background: transparent; border: none; outline: none; color: #f5f5f5; font-size: 15px; font-family: "DM Sans", sans-serif; resize: none; min-height: 80px; line-height: 1.6; }
  .post-textarea::placeholder { color: #444; }
  .post-footer { display: flex; justify-content: flex-end; border-top: 1px solid #2a2a2a; padding-top: 14px; margin-top: 14px; }
  .post-btn { background: linear-gradient(135deg, #6c63ff, #a78bfa); border: none; border-radius: 10px; color: white; font-size: 14px; font-weight: 500; font-family: "DM Sans", sans-serif; padding: 10px 24px; cursor: pointer; transition: opacity 0.2s; }
  .post-btn:hover { opacity: 0.85; }
  .section-title { font-size: 12px; font-weight: 500; color: #555; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px; }
  .post-card { background: #161616; border: 1px solid #2a2a2a; border-radius: 16px; padding: 20px; margin-bottom: 12px; transition: border-color 0.2s; }
  .post-card:hover { border-color: #3a3a3a; }
  .post-content { font-size: 15px; line-height: 1.7; color: #d5d5d5; margin-bottom: 12px; }
  .post-time { font-size: 12px; color: #555; }
  .empty-state { text-align: center; padding: 60px 20px; color: #444; font-size: 15px; }
`;

function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const user_id = user?.id;
  const initials = user?.username?.slice(0, 2).toUpperCase();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const loadPosts = async () => {
    if (!user_id) return;
    const res = await axios.get(`https://react-app-server-95bw.onrender.com/posts/${user_id}`);
    setPosts(res.data);
  };

  const createPost = async () => {
    if (!content.trim()) return;
    await axios.post("https://react-app-server-95bw.onrender.com/post", { content, user_id });
    setContent("");
    loadPosts();
  };

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    } else {
      loadPosts();
    }
  }, []);

  if (!user) return null;

  return (
    <>
      <style>{styles}</style>
      <div className="home-bg">
        <nav className="navbar">
          <span className="nav-logo">Thoughts</span>
          <div className="nav-user">
            <div className="avatar">{initials}</div>
            <button className="logout-btn" onClick={logout}>Logout</button>
          </div>
        </nav>
        <div className="main-content">
          <div className="post-box">
            <textarea
              className="post-textarea"
              placeholder="What is on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="post-footer">
              <button className="post-btn" onClick={createPost}>Post</button>
            </div>
          </div>
          <p className="section-title">Your posts</p>
          {posts.length === 0 ? (
            <div className="empty-state">No posts yet. Write something!</div>
          ) : (
            posts.map((p) => (
              <div key={p.id} className="post-card">
                <p className="post-content">{p.content}</p>
                <span className="post-time">{new Date(p.created_at).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
