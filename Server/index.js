console.log("File started...");
const express = require("express");
const pool = require("./db");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    console.log("API hit"); 
  res.send("Server working");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users(username, password) VALUES($1,$2) RETURNING *",
      [username, password]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1 AND password=$2",
    [username, password]
  );

  if (result.rows.length > 0) {
    res.json(result.rows[0]); // send user
  } else {
    res.status(400).send("Invalid user");
  }
});

app.get("/posts/:id", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM posts WHERE user_id=$1 ORDER BY created_at DESC",
      [req.params.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
  }
});
app.post("/post", async (req, res) => {
  const { content, user_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO posts(content, user_id) VALUES($1, $2) RETURNING *",
      [content, user_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});
