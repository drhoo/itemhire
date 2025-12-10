// api/parse.js

export default function handler(req, res) {
  try {
    const { path = '' } = req.query;

    // Extract path from full Vera-style URL:
    // e.g. HIRE-77140-BUN-vnAH7f4u5Y-004
    const match = path.match(/^([A-Z]+-\d{5}-[A-Z]{3})-([a-zA-Z0-9]{10,12})-(\d{3})$/);

    if (!match) {
      return res.status(400).json({ error: 'Invalid format' });
    }

    const [_, humanId, logicBlock, pts] = match;

    import { kv } from '@vercel/kv';

const currentStatus = await kv.get(`status:${humanId}`) || 'available';


  res.status(200).json({
  humanId,
  logicBlock,
  pts,
  rentalStatus: currentStatus
});

  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
}
