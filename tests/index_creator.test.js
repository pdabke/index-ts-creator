"use strict"
const fs = require("fs");
const path = require("path");
const createIndex = require("../src/index_creator");

const TEST_1 = 
`
export class Test1 {

}
`;

const TEST_2 = 
`
export class Test2 {

}
`;
const INDEX_CONTENT =
`
export * from "./Test1";
export * from "./Test2";
`;

beforeAll( () => {
  setupTargetFiles();
});

afterAll(async () => {
  cleanupTargetFiles();
});

test("Create index.ts", () => {
  createIndex(path.resolve(__dirname, "target"));
  let indexContent = fs.readFileSync(path.resolve(__dirname, "target", "index.ts"), { encoding: "utf-8"});
  indexContent = indexContent.trim().replace(/\s/gm, '');
  expect(indexContent.trim()).toBe(INDEX_CONTENT.trim().replace(/\s/gm, ''));
});

function setupTargetFiles() {
  let targetDir = path.resolve(__dirname, "target");
  // check if target directory exists
  if (fs.existsSync(targetDir)) {
    fs.rmdirSync(targetDir, { recursive: true, force: true});
  }

  fs.mkdirSync(targetDir);
  fs.writeFileSync(path.join(targetDir, "Test1.ts"), TEST_1);
  fs.writeFileSync(path.join(targetDir, "Test2.ts"), TEST_2);
}

function cleanupTargetFiles() {
  fs.rmdirSync(path.resolve(__dirname, "target"), { recursive: true, force: true});  
}