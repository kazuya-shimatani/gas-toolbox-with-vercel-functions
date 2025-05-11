// NOTE: This file assumes node-fetch v2 is installed for CommonJS compatibility.
const nodeFetch = require('node-fetch');

/**
 * GAS Web APIのdoGetでPDFを生成およびダウンロードリンクを取得
 */
async function fetchPdfFromGas({ createSheetPdfBaseUrl, spreadsheetId, sheetName, downloadFileName }) {
  const url = `${createSheetPdfBaseUrl}?spreadsheetId=${encodeURIComponent(spreadsheetId)}&sheetName=${encodeURIComponent(sheetName)}&downloadFileName=${encodeURIComponent(downloadFileName)}`;
  const headers = {};

  const res = await nodeFetch(url, { headers });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  return res.text();
}

module.exports = { fetchPdfFromGas };