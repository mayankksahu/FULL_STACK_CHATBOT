// src/services/api.js

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Normalize backend message to frontend form
// function normalizeMessage(m) {
//   const role = m.role ?? m.sender ?? (m.from === "assistant" ? "assistant" : "user");

//   return {
//     _id: m._id ?? `${role}-${Date.now()}`,
//     text: m.text ?? m.message ?? "",
//     sender: role === "assistant" ? "bot" : "user",
//     type:
//       m.role === "assistant"
//         ? (m.text?.startsWith("http") ? "image" : "text")
//         : "text",
//     timestamp: m.timestamp ?? new Date().toISOString(),
//   };
// }
function normalizeMessage(m) {
  const role = m.role ?? m.sender ?? (m.from === "assistant" ? "assistant" : "user");
  const rawText = m.text ?? m.message ?? "";
  const text = typeof rawText === "string" ? rawText.trim() : String(rawText ?? "");

  // Only treat assistant replies as images (and ensure it's a plausible URL)
  const isImage =
    role === "assistant" &&
    typeof text === "string" &&
    (text.startsWith("http://") || text.startsWith("https://"));

  return {
    _id: m._id ?? `${role}-${Date.now()}`,
    text,
    sender: role === "assistant" ? "bot" : "user",
    type: isImage ? "image" : "text",
    timestamp: m.timestamp ?? new Date().toISOString(),
  };
}


export async function fetchMessages() {
  const res = await fetch(`${API_BASE}/messages`);
  if (!res.ok) throw new Error("Failed to fetch messages");
  const data = await res.json();
  return data.map(normalizeMessage);
}

export async function postMessage(message, type = "text") {
  const res = await fetch(`${API_BASE}/message`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, type }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || "Failed to send message");
  }

  const data = await res.json();

  const userMessage = data.userMessage ? normalizeMessage(data.userMessage) : null;
  const aiMessage = data.aiMessage ? normalizeMessage(data.aiMessage) : null;

  return { userMessage, aiMessage };
}


export async function deleteMessages() {
  const res = await fetch(`${API_BASE}/messages`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete messages");
  return res.json();
}

