const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// =======================
// 🔌 WebSocket Server (REAL)
// =======================
const wss = new WebSocket.Server({ server });

let clients = new Set();

wss.on("connection", (ws) => {
  console.log("🟢 Cliente WS conectado");

  clients.add(ws);

  // Enviar estado inicial
  ws.send(JSON.stringify({
    type: "kpi:update",
    data: getKPIs()
  }));

  ws.on("close", () => {
    console.log("🔴 Cliente WS desconectado");
    clients.delete(ws);
  });
});

// =======================
// 🧠 "Base de datos" en memoria
// =======================
let users = [];

// 50 members
for (let i = 0; i < 50; i++) {
  users.push({
    id: uuidv4(),
    email: `user${i}@test.com`,
    status: "member"
  });
}

// 10 pending
for (let i = 0; i < 10; i++) {
  users.push({
    id: uuidv4(),
    email: `pending${i}@test.com`,
    status: "pending"
  });
}

// =======================
// 🔧 Helpers
// =======================
const getKPIs = () => {
  const members = users.filter(u => u.status === "member").length;
  const pending = users.filter(u => u.status === "pending").length;

  return { members, pending };
};

const broadcast = (type, data) => {
  const message = JSON.stringify({ type, data });

  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// =======================
// 📡 Eventos (WS)
// =======================
const emitKPIUpdate = () => {
  broadcast("kpi:update", getKPIs());
};

const emitInvited = () => {
  const pending = users.filter(u => u.status === "pending").length;
  broadcast("users:invited", { pending });
};

const emitAccepted = () => {
  broadcast("users:accepted", getKPIs());
};

// =======================
// 📌 Endpoints REST
// =======================

// GET users
app.get("/users", (req, res) => {
  res.json(users);
});

// POST invite user
app.post("/users/invite", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email requerido" });
  }

  const newUser = {
    id: uuidv4(),
    email,
    status: "pending"
  };

  users.push(newUser);

  emitInvited();
  emitKPIUpdate();

  res.status(201).json(newUser);
});

// POST accept invitation
app.post("/users/accept", (req, res) => {
  const { idUser } = req.body;

  if (!idUser) {
    return res.status(400).json({ error: "idUser requerido" });
  }

  const user = users.find(u => u.id === idUser);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  if (user.status !== "pending") {
    return res.status(400).json({ error: "El usuario no está pendiente" });
  }

  user.status = "member";

  emitAccepted();
  emitKPIUpdate();

  res.json(user);
});

// GET KPI
app.get("/kpi", (req, res) => {
  res.json(getKPIs());
});

// =======================
// ▶️ Start server
// =======================
const PORT = 3000;

server.listen(PORT, () => {
  console.log(`🚀 HTTP + WS server running on http://localhost:${PORT}`);
});