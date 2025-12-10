// api/lookup.js

export default function handler(req, res) {
  try {
    const { path = '' } = req.query;

    const match = path.match(/^([A-Z]+-\d{5}-[A-Z]{3})-([a-zA-Z0-9]{10,12})-(\d{3})$/);

    if (!match) {
      return res.status(400).json({ error: 'Invalid code format' });
    }

    const [_, humanId, logicBlock, pts] = match;

    // 🔐 Later this is where we'll do logicBlock interpretation, DB fetch, etc.
    // For now, return hardcoded status
    const rentalStatus = "available"; // Stub — future logic will check actual status

    res.status(200).json({
      humanId,
      logicBlock,
      pts,
      rentalStatus
    });

  } catch (err) {
    res.status(500).json({ error: 'Lookup failed', details: err.message });
  }
}
