# Run an MCP Server on Vercel

## Usage

### Tool: createSheetPdf

**Parameters:**
- `createSheetPdfBaseUrl` (string, required): GASのWeb Apps URL
- `spreadsheetId` (string, required): スプレッドシートID
- `sheetName` (string, required): PDF出力対象のシート名
- `downloadFileName` (string, required): PDFファイル名

**Example request:**
```json
{
  "method": "createSheetPdf",
  "params": {
    "createSheetPdfBaseUrl": "https://xxxxxxxxxxxx",
    "spreadsheetId": "1234567890abcdefg",
    "sheetName": "サンプル",
    "downloadFileName": "サンプルPDF"
  }
}
```

### Tool: renameSheet

**Parameters:**
- `renameSheetBaseUrl` (string, required): GASのWeb Apps URL
- `spreadsheetId` (string, required): スプレッドシートID
- `oldSheetName` (string, required): 変更対象のシート名
- `newSheetName` (string, required): 変更後のシート名

**Example request:**
```json
{
  "method": "renameSheet",
  "params": {
    "renameSheetBaseUrl": "https://xxxxxxxxxxxx",
    "spreadsheetId": "1234567890abcdefg",
    "oldSheetName": "サンプル",
    "newSheetName": "サンプル修正後"
  }
}
```


