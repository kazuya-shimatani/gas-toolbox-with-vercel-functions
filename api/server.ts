import { z } from "zod";
import { initializeMcpApiHandler } from "../lib/mcp-api-handler";
const { fetchPdfFromGas } = require("../lib/sheet-to-pdf");
const { renameSheetViaGas } = require("../lib/rename-sheet");

const handler = initializeMcpApiHandler(
  (server) => {
    // Add more tools, resources, and prompts here
    server.tool("echo", { message: z.string() }, async ({ message }) => ({
      content: [{ type: "text", text: `Tool echo: ${message}` }],
    }));
    server.tool(
      "createSheetPdf",
      {
        createSheetPdfBaseUrl: z.string(), // GASのWeb Apps URL
        spreadsheetId: z.string(),
        sheetName: z.string(),
        downloadFileName: z.string(),
      },
      async ({ createSheetPdfBaseUrl, spreadsheetId, sheetName, downloadFileName }) => {
        try {
          const downloadUrl = await fetchPdfFromGas({ createSheetPdfBaseUrl, spreadsheetId, sheetName, downloadFileName });
          return {
            content: [
              { type: "text", text: `ダウンロードリンク: ${downloadUrl}` },
            ],
          };
        } catch (e: any) {
          return {
            content: [
              { type: "text", text: `Error: ${e.message}` },
            ],
          };
        }
      }
    );
    server.tool(
      "renameSheet",
      {
        renameSheetBaseUrl: z.string(), // GASのWeb Apps URL
        spreadsheetId: z.string(),
        oldSheetName: z.string(),
        newSheetName: z.string(),
      },
      async ({ renameSheetBaseUrl, spreadsheetId, oldSheetName, newSheetName }) => {
        try {
          const response = await renameSheetViaGas({ renameSheetBaseUrl, spreadsheetId, oldSheetName, newSheetName });
          return {
            content: [
              { type: "text", text: `シート名を変更しました: ${oldSheetName} -> ${newSheetName}` },
            ],
          };
        } catch (e: any) {
          return {
            content: [
              { type: "text", text: `Error: ${e.message}` },
            ],
          };
        }
      }
    );
  },
  {
    capabilities: {
      tools: {
        echo: {
          description: "Echo a message",
        },
        createSheetPdf: {
          description: "Create a PDF from a Google Sheet",
        },
        renameSheet: {
          description: "Rename a Google Sheet",
        },
      },
    },
  }
);

export default handler;
