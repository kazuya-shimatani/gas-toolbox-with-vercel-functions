import * as fs from 'fs';
interface GmailDraftOrSendFileParams {
  gasGmailApiBaseUrl: string;
  to: string;
  subject: string;
  body: string;
  filePath: string;
  filename: string;
  mimeType: string;
  sendType?: 'draft' | 'send';
}

/**
 * ローカルファイルをbase64エンコードしてGAS Web APIに送信
 */
export async function gmailDraftOrSendFileViaGas({ gasGmailApiBaseUrl, to, subject, body, filePath, filename, mimeType, sendType = 'draft' }: GmailDraftOrSendFileParams): Promise<string> {
  const nodeFetch = require('node-fetch');
  // ファイルをbase64エンコード
  const fileBuffer = fs.readFileSync(filePath);
  const base64Data = fileBuffer.toString('base64');
  const headers = { 'Content-Type': 'application/json' };
  const postBody = JSON.stringify({ to, subject, body, filename, mimeType, base64Data, sendType });

  const res = await nodeFetch(gasGmailApiBaseUrl, {
    method: 'POST',
    headers,
    body: postBody,
  });
  if (!res.ok) throw new Error(`GAS API error: ${res.status} ${res.statusText}`);
  return await res.text();
}

module.exports = { gmailDraftOrSendFileViaGas }; 