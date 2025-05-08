const renameSheetFetch = require('node-fetch');

interface RenameSheetParams {
  baseUrl: string; // GAS Web APIのURL
  spreadsheetId: string; // スプシのID
  oldSheetName: string; // 変更前のシート名
  newSheetName: string; // 変更後のシート名
}

/**
 * GAS Web APIのdoPostでシート名を変更
 * @returns GASのレスポンス(JSON文字列)
 */
async function renameSheetViaGas({ baseUrl, spreadsheetId, oldSheetName, newSheetName }: RenameSheetParams): Promise<string> {
  const headers = { 'Content-Type': 'application/json' };
  const body = JSON.stringify({ spreadsheetId, oldSheetName, newSheetName });

  const res = await renameSheetFetch(baseUrl, {
    method: 'POST',
    headers,
    body,
  });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  return res.text();
}

module.exports = { renameSheetViaGas }; 