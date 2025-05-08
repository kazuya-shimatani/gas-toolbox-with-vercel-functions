const downloadFetch = require('node-fetch');
const fs = require('fs');


async function downloadFile({ downloadPdfBaseUrl,fileId, filePath }) {
  const url = `${downloadPdfBaseUrl}?fileId=${encodeURIComponent(fileId)}`;
  const headers = {};

  const res = await downloadFetch(url, { headers });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  const buffer = await res.buffer();
  fs.writeFileSync(filePath, buffer);
}

module.exports = { downloadFile }; 