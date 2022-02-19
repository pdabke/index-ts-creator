const fs = require("fs");
const os = require("os");
const path = require("path");

function createIndex(folder) {
  if (!folder) folder = ".";
  var files = fs.readdirSync(folder);
  var indexContent = "";

  // Check if there is a package.json file in the current directory and extract 
  // package documentation
  if (fs.existsSync("package.json")) {
    let pkgObj = JSON.parse(fs.readFileSync("package.json"));
    if (pkgObj.description) {
      indexContent += "/**" + os.EOL;
      indexContent += " * " + pkgObj.description + os.EOL;
      if (pkgObj.version) indexContent += " * @remarks Version " + pkgObj.version + os.EOL;
      indexContent += " *" + os.EOL
      indexContent += " * @packageDocumentation" + os.EOL
      indexContent += " */" + os.EOL;
    }
  }
  for (let f of files) {
    if (f.endsWith(".ts") && !(f == "index.ts")) {
      indexContent = indexContent + "export * from \"./" + f.substring(0, f.length-3) + "\";" + os.EOL;
    }
  }
  fs.writeFileSync(path.resolve(folder, "index.ts"), indexContent, "utf-8");
}

module.exports = createIndex;
