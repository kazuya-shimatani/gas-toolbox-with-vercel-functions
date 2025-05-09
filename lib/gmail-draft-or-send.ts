interface GmailDraftOrSendParams {
  gasGmailApiBaseUrl: string; // GAS Web APIのURL
  to: string;
  subject: string;
  body: string;
  filename: string;
  mimeType: string;
  base64Data: string;
  sendType?: 'draft' | 'send'; // 省略時は'draft'
}

/**
 * GAS Web APIのdoPostでGmail下書き保存または送信
 * @returns GASのレスポンス(JSON文字列)
 */
async function gmailDraftOrSendViaGas({ gasGmailApiBaseUrl, to, subject, body, filename, mimeType, base64Data, sendType = 'draft' }: GmailDraftOrSendParams): Promise<string> {
  const nodeFetch = require('node-fetch');
  const headers = { 'Content-Type': 'application/json' };
  const postBody = JSON.stringify({ to, subject, body, filename, mimeType, base64Data, sendType });

  const res = await nodeFetch(gasGmailApiBaseUrl, {
    method: 'POST',
    headers,
    body: postBody,
  });
  if (!res.ok) throw new Error(`GAS API error: ${res.statusText}`);
  return res.text();
}

module.exports = { gmailDraftOrSendViaGas }; 