import { google } from 'googleapis';
import PDFDocument from 'pdfkit';
import { Readable } from 'stream';
import { z } from 'zod';

interface SheetToPdfOptions {
  spreadsheetId: string;
  sheetName: string;
  range: string;
  accessToken: string;
}

export async function sheetRangeToPdfBuffer({ spreadsheetId, sheetName, range, accessToken }: SheetToPdfOptions): Promise<Buffer> {
  // Google認証
  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: accessToken });
  const sheets = google.sheets({ version: 'v4', auth });

  // データ取得
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!${range}`,
  });
  const values = response.data.values || [];

  // PDF生成
  const doc = new PDFDocument({ margin: 40 });
  const chunks: Buffer[] = [];
  doc.on('data', (chunk) => chunks.push(chunk));

  // 簡易テーブル描画
  values.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      doc.text(cell, 50 + colIndex * 100, 50 + rowIndex * 20);
    });
  });

  doc.end();

  await new Promise((resolve) => doc.on('end', resolve));
  return Buffer.concat(chunks);
}