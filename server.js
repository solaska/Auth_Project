import express from "express";
import session from "express-session";
import pg from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send(
    "<h1>Home</h1><a href='/register'>Register</a> | <a href='/login'>Login</a>",
  );
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query("INSERT INTO users (username, password) VALUES ($1, $2)", [
      username,
      hashedPassword,
    ]);

    res.redirect("/login");
  } catch (err) {
    res.send("User already exists");
  }
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const result = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);

  const user = result.rows[0];

  if (!user) return res.send("User not found");

  const match = await bcrypt.compare(password, user.password);

  if (match) {
    req.session.user = {
      id: user.id,
      username: user.username,
    };

    res.redirect("/dashboard");
  } else {
    res.send("Wrong password");
  }
});

app.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  res.send(`
    <h1>Dashboard</h1>
    <p>Welcome ${req.session.user.username}</p>
    <a href="/logout">Logout</a>
  `);
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
