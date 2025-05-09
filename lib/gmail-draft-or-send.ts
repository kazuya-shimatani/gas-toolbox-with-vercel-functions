import * as fs from 'fs';
interface GmailDraftOrSendFileParams {
  gasGmailApiBaseUrl: string;
  to: string;
  subject: string;
  body: string;
  fileUrl: string;
  filename: string;
  mimeType: string;
  sendType?: 'draft' | 'send';
}

/**
 * fileUrlをGAS Web APIに送信
 */
export async function gmailDraftOrSendFileViaGas({ gasGmailApiBaseUrl, to, subject, body, fileUrl, filename, mimeType, sendType = 'draft' }: GmailDraftOrSendFileParams): Promise<string> {
  const nodeFetch = require('node-fetch');
  const headers = { 'Content-Type': 'application/json' };
  const postBody = JSON.stringify({ to, subject, body, filename, mimeType, fileUrl, sendType });

  const res = await nodeFetch(gasGmailApiBaseUrl, {
    method: 'POST',
    headers,
    body: postBody,
  });
  if (!res.ok) throw new Error(`GAS API error: ${res.status} ${res.statusText}`);
  return await res.text();
}

module.exports = { gmailDraftOrSendFileViaGas }; 