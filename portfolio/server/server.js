const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { randomUUID } = require("crypto");

const app = express();
const PORT = 3001;
const MESSAGES_FILE = path.join(__dirname, "messages.json");

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors({ origin: "*" }));
app.use(express.json());

// ── Helpers ─────────────────────────────────────────────────────────────────
function readMessages() {
  if (!fs.existsSync(MESSAGES_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(MESSAGES_FILE, "utf8"));
  } catch {
    return [];
  }
}

function saveMessages(msgs) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2), "utf8");
}

// ── API Routes ──────────────────────────────────────────────────────────────

// POST /api/contact  →  save a new message
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Fields manqua: name, email, message" });
  }

  const newMsg = {
    id: randomUUID(),
    name,
    email,
    subject: subject || "(sans sujet)",
    message,
    date: new Date().toISOString(),
    read: false,
  };

  const msgs = readMessages();
  msgs.unshift(newMsg);
  saveMessages(msgs);

  console.log(`📩 Message reçu de: ${name} <${email}>`);
  res.status(201).json({ success: true, message: "Message envoyé avec succès!" });
});

// GET /api/messages  →  return all messages (JSON)
app.get("/api/messages", (req, res) => {
  res.json(readMessages());
});

// DELETE /api/messages/:id  →  delete a message
app.delete("/api/messages/:id", (req, res) => {
  const msgs = readMessages().filter((m) => m.id !== req.params.id);
  saveMessages(msgs);
  res.json({ success: true });
});

// PATCH /api/messages/:id/read  →  mark as read
app.patch("/api/messages/:id/read", (req, res) => {
  const msgs = readMessages().map((m) =>
    m.id === req.params.id ? { ...m, read: true } : m
  );
  saveMessages(msgs);
  res.json({ success: true });
});

// ── Dashboard ────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.redirect("/messages");
});

app.get("/messages", (req, res) => {
  res.json(readMessages());
});

// ── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running  →  http://localhost:${PORT}`);
  console.log(`📬 Dashboard       →  http://localhost:${PORT}/messages`);
  console.log(`📡 API contact     →  POST http://localhost:${PORT}/api/contact\n`);
});