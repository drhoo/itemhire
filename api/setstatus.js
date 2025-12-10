// api/setstatus.js

import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  const { id, status } = req.query;

  if (!id || !status) {
    return res.status(400).json({ error: 'Missing id or status' });
  }

  await kv.set(`status:${id}`, status);

  res.status(200).json({ message: `Status for ${id} set to ${status}` });
}
