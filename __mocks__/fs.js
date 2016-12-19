const path = require('path');

const fs = jest.genMockFromModule('fs');

let mockFiles = Object.create(null);

const __setMockFiles = (files) => {
  mockFiles = files;
  return null;
};


const readFileSync = filePath =>
  mockFiles[filePath] || '';
//
fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;
