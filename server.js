import express from "express";
import cors from "cors";
import pg from "pg";

const app = express();
const { Pool } = pg;

const allowedOrigin = process.env.ALLOWED_ORIGIN || "*";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false
});

app.use(cors({
  origin: allowedOrigin === "*" ? true : allowedOrigin
}));
app.use(express.json());
app.use(express.static("public"));

async function setupDatabase() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS guestbook_entries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      website TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

function cleanText(value, fallback, maxLength) {
  const text = String(value || "").trim();
  return (text || fallback).slice(0, maxLength);
}

app.get("/health", (req, res) => {
  res.json({ ok: true, message: "Guestbook backend is running." });
});

app.get("/entries", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, website, message, created_at
      FROM guestbook_entries
      ORDER BY created_at DESC
      LIMIT 50
    `);

    res.json(result.rows);
  } catch (error) {
    console.error("Could not load entries:", error);
    res.status(500).json({ error: "Could not load entries." });
  }
});

app.post("/entries", async (req, res) => {
  try {
    const name = cleanText(req.body.name, "Mystery Visitor", 80);
    const website = cleanText(req.body.website, "", 200);
    const message = cleanText(req.body.message, "Signing the guestbook!", 1000);

    const result = await pool.query(
      `
        INSERT INTO guestbook_entries (name, website, message)
        VALUES ($1, $2, $3)
        RETURNING id, name, website, message, created_at
      `,
      [name, website, message]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Could not save entry:", error);
    res.status(500).json({ error: "Could not save entry." });
  }
});

const port = process.env.PORT || 3000;

setupDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Guestbook running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Could not set up database:", error);
    process.exit(1);
  });
