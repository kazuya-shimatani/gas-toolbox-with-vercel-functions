import { z } from "zod";
import { initializeMcpApiHandler } from "../lib/mcp-api-handler";
import { sheetRangeToPdfBuffer } from "../lib/sheet-to-pdf";

const handler = initializeMcpApiHandler(
  (server) => {
    // Add more tools, resources, and prompts here
    server.tool("echo", { message: z.string() }, async ({ message }) => ({
      content: [{ type: "text", text: `Tool echo: ${message}` }],
    }));
    server.tool(
      "downloadSheetPdf",
      {
        spreadsheetId: z.string(),
        sheetName: z.string(),
        range: z.string(),
        accessToken: z.string(),
      },
      async ({ spreadsheetId, sheetName, range, accessToken }) => {
        try {
          const pdfBuffer = await sheetRangeToPdfBuffer({ spreadsheetId, sheetName, range, accessToken });
          return {
            content: [
              {
                type: "resource",
                resource: {
                  uri: "data:application/pdf;base64," + pdfBuffer.toString("base64"),
                  blob: pdfBuffer.toString("base64"),
                  mimeType: "application/pdf",
                  text: "sheet.pdf"
                }
              }
            ]
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
      },
    },
  }
);

export default handler;
