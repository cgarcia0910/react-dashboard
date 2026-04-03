const WebSocket = require("ws");
const readline = require("readline");

const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on("connection", (ws) => {
  console.log("🟢 Cliente conectado");

  clients.push(ws);

  ws.on("close", () => {
    console.log("🔴 Cliente desconectado");
    clients = clients.filter(c => c !== ws);
  });

  ws.on("message", (message) => {
    console.log("📩 Mensaje del cliente:", message.toString());
  });
});

// 🎛️ interfaz para escribir en consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("✍️ Escribe un JSON y pulsa Enter para enviarlo a los clientes");

rl.on("line", (input) => {
  try {
    // opcional: validar JSON
    const parsed = JSON.parse(input);

    clients.forEach(ws => {
      ws.send(JSON.stringify(parsed));
    });

    console.log("📤 Enviado:", parsed);
  } catch (err) {
    console.log("❌ JSON inválido. Ejemplo válido:");
    console.log(`{"users": 100, "sales": 50}`);
  }
});