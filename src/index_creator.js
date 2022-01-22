const fs = require("fs");
const os = require("os");
const path = require("path");

function createIndex(folder) {
  if (!folder) folder = ".";
  var files = fs.readdirSync(folder);
  var indexContent = "";
  for (let f of files) {
    if (f.endsWith(".ts") && !(f == "index.ts")) {
      indexContent = indexContent + "export * from \"./" + f.substring(0, f.length-3) + "\";" + os.EOL;
    }
  }
  fs.writeFileSync(path.resolve(folder, "index.ts"), indexContent, "utf-8");
}

module.exports = createIndex;
