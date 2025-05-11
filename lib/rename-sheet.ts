const renameSheetFetch = require('node-fetch');

/**
 * GAS Web APIのdoPostでシート名を変更
 */
async function renameSheetViaGas({ renameSheetBaseUrl, spreadsheetId, oldSheetName, newSheetName }): Promise<string> {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ spreadsheetId, oldSheetName, newSheetName });

  const res = await renameSheetFetch(renameSheetBaseUrl, {
    method: 'POST',
    headers,
    body,
  });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  return res.text();
}

module.exports = { renameSheetViaGas }; 