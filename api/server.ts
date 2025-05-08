import { z } from "zod";
import { initializeMcpApiHandler } from "../lib/mcp-api-handler";
import { fetchPdfFromGas } from "../lib/sheet-to-pdf";

const handler = initializeMcpApiHandler(
  (server) => {
    // Add more tools, resources, and prompts here
    server.tool("echo", { message: z.string() }, async ({ message }) => ({
      content: [{ type: "text", text: `Tool echo: ${message}` }],
    }));
    server.tool(
      "createSheetPdf",
      {
        baseUrl: z.string(), // GASのWeb Apps URL
        spreadsheetId: z.string(),
        sheetName: z.string(),
        downloadFileName: z.string(),
      },
      async ({ baseUrl, spreadsheetId, sheetName, downloadFileName }) => {
        try {
          const createdPdfFileName =await fetchPdfFromGas({ baseUrl, spreadsheetId, sheetName, downloadFileName });
          return {
            content: [
              { type: "text", text: `${createdPdfFileName}を作成しました` },
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
      },
    },
  }
);

export default handler;
