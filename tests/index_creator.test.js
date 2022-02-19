"use strict"
const fs = require("fs");
const path = require("path");
const process = require("process");
const createIndex = require("../src/index_creator");

beforeAll( () => {
  process.chdir(path.resolve(__dirname));
  if (fs.existsSync(path.resolve(__dirname, "target", "index.ts"))) {
    fs.rmSync(path.resolve(__dirname, "target", "index.ts"));
  }
});

afterAll( () => {
  if (fs.existsSync(path.resolve(__dirname, "target", "index.ts"))) {
    fs.rmSync(path.resolve(__dirname, "target", "index.ts"));
  }
});


test("Create index.ts", () => {
  createIndex(path.resolve(__dirname, "target"));
  let indexContent = fs.readFileSync(path.resolve(__dirname, "target", "index.ts"), { encoding: "utf-8"});
  let refContent = fs.readFileSync("expected_index.txt", {encoding: "utf-8"});
  indexContent = indexContent.trim().replace(/\s/gm, '');
  expect(indexContent.trim()).toBe(refContent.trim().replace(/\s/gm, ''));
});
