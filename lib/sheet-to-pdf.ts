const nodeFetch = require('node-fetch');

/**
 * GAS Web APIを呼び出してPDFバッファを取得
 */
async function fetchPdfFromGas({ baseUrl, spreadsheetId, sheetName, downloadFileName }) {
  const url = `${baseUrl}?spreadsheetId=${encodeURIComponent(spreadsheetId)}&sheetName=${encodeURIComponent(sheetName)}&downloadFileName=${encodeURIComponent(downloadFileName)}`;
  const headers = {};

  const res = await nodeFetch(url, { headers });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  return res.text();
}

module.exports = { fetchPdfFromGas };