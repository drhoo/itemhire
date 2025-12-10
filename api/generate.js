// api/generate.js

const { generateHireId } = require('../lib/itemhire.js');

export default function handler(req, res) {
  const {
    serial,
    business = 'BUN',
    prefix = 'HIRE',
    pts = '004',
    rentalStatus = 'n', // n = new, o = out, etc.
    typeFlag = 'A',
    classFlag = 'H',
  } = req.query;

  const logicParams = { rentalStatus, typeFlag, classFlag };

  const hireId = generateHireId({
    serial,
    business,
    prefix,
    pts,
    logicParams
  });

  res.status(200).json(hireId);
}
