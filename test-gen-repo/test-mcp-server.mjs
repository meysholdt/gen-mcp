import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverPath = path.join(
  __dirname,
  "generated-mcp-server",
  "build",
  "index.js"
);

async function main() {
  const transport = new StdioClientTransport({
    command: "node",
    args: [serverPath],
  });

  const client = new Client({ name: "test-client", version: "1.0.0" });
  await client.connect(transport);

  // List tools and verify getPosts and getPost exist
  const { tools } = await client.listTools();
  const toolNames = tools.map((t) => t.name);
  console.log("Available tools:", toolNames.join(", "));

  if (!toolNames.includes("getPosts")) {
    console.error("FAIL: getPosts tool not found");
    process.exit(1);
  }
  if (!toolNames.includes("getPost")) {
    console.error("FAIL: getPost tool not found");
    process.exit(1);
  }
  console.log("✅ getPosts and getPost tools exist");

  // Call getPost with id=1
  const result = await client.callTool({ name: "getPost", arguments: { id: 1 } });
  const text = result.content
    .filter((c) => c.type === "text")
    .map((c) => c.text)
    .join("\n");

  console.log("getPost response (first 300 chars):", text.slice(0, 300));

  if (!text.includes("Status: 200")) {
    console.error('FAIL: Response does not contain "Status: 200"');
    process.exit(1);
  }
  console.log('✅ getPost response contains "Status: 200"');

  console.log("All tests passed");
  await client.close();
}

main().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});
