import fetch from 'node-fetch';

interface GasSheetToPdfOptions {
  baseUrl: string;
  spreadsheetId: string;
  sheetName: string;
  downloadFileName: string;
}
/**
 * GAS Web APIを呼び出してPDFバッファを取得
 */
export async function fetchPdfFromGas({ baseUrl, spreadsheetId, sheetName, downloadFileName }: GasSheetToPdfOptions): Promise<string> {
  const url = `${baseUrl}?spreadsheetId=${encodeURIComponent(spreadsheetId)}&sheetName=${encodeURIComponent(sheetName)}&downloadFileName=${encodeURIComponent(downloadFileName)}`;
  const headers: Record<string, string> = {};

  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  return res.text();
}