#!/usr/bin/env node

const indexts = require('../src/index_creator')
var folder = process.argv.slice(2)[0];
indexts(folder);

