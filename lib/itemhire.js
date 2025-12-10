// lib/itemhire.js

function pad(num, len = 5) {
  return String(num).padStart(len, '0');
}

function generateLogicBlock({
  version = 'v',
  rentalStatus = 'n', // n = new, o = out, r = returned, x = expired
  typeFlag = 'A',
  classFlag = 'H',
  timestamp = null,
}) {
  const salt = Math.random().toString(36).substring(2, 4); // 2-char random salt
  const time = timestamp || generateTimestamp();           // 3-char encoded timestamp
  const hash = generateEntropyChar();                      // single filler char

  return `${version}${rentalStatus}${typeFlag}${classFlag}${salt}${time}${hash}`;
}

function generateTimestamp() {
  const now = Date.now();
  const mod = now % 46656; // 36^3 = 46656 (for 3-char base36)
  return mod.toString(36).padStart(3, '0');
}

function generateEntropyChar() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // readable set
  return chars[Math.floor(Math.random() * chars.length)];
}

function generateHireId({
  serial = Math.floor(Math.random() * 99999),
  business = 'BUN',
  prefix = 'HIRE',
  pts = '004',
  logicParams = {}
}) {
  const serialStr = pad(serial);
  const humanId = `${prefix}-${serialStr}-${business}`;
  const logicBlock = generateLogicBlock(logicParams);
  const qrUrl = `https://vera.id/${humanId}-${logicBlock}-${pts}`;
  
  return {
    humanId,
    qrUrl,
    logicBlock,
    pts,
  };
}

function parseLogicBlock(logic) {
  if (logic.length !== 10) return { error: 'Invalid logic length' };

  const [v, r, type, classFlag, s1, s2, t1, t2, t3, h] = logic.split('');
  const timestamp = `${t1}${t2}${t3}`;

  return {
    version: v,
    rentalStatus: r,
    typeFlag: type,
    classFlag,
    checksum: `${s1}${s2}`,
    timestamp,
    entropy: h,
  };
}

module.exports = {
  generateHireId,
  parseLogicBlock,
};
