// pages/api/ping.js or /api/ping.js depending on setup
import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  const now = new Date().toISOString();
  await kv.set("lastPing", now);
  res.status(200).json({ status: "pong", timestamp: now });
}
