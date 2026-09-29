import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.resolve(__dirname, "..");
const indexPath = path.join(rootDir, "index.html");
const optionsPath = path.join(rootDir, "assets", "options.json");

const indexHtml = fs.readFileSync(indexPath, "utf8");
const optionsJson = fs.readFileSync(optionsPath, "utf8").replace(/^\uFEFF/, "");
const formattedOptions = JSON.stringify(JSON.parse(optionsJson), null, 2)
  .split("\n")
  .map(line => `  ${line}`)
  .join("\n");

const startToken = '<script type="application/json" id="options-json">';
const endToken = "</script>";
const startIndex = indexHtml.indexOf(startToken);
if(startIndex === -1){
  throw new Error("Embedded options block was not found in index.html.");
}

const afterStartIndex = startIndex + startToken.length;
const endIndex = indexHtml.indexOf(endToken, afterStartIndex);
if(endIndex === -1){
  throw new Error("Embedded options block terminator was not found in index.html.");
}

const nextHtml = `${indexHtml.slice(0, afterStartIndex)}\n${formattedOptions}\n  ${indexHtml.slice(endIndex)}`;
fs.writeFileSync(indexPath, nextHtml);

console.log("Embedded options block synced from assets/options.json.");
