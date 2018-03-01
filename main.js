const fs = require('fs');
const path = require('path');

const getArgs = require('./getArgs');
const getFileList = require('./getFileList');
//const writeFile = require('./writeFile');

const args = getArgs();
//const files = getFileList(args.src);

//console.log(path.parse('~/test'));

//files.forEach(str => writeFile(str, args.dest));

getFileList(args, files => {
  console.log(files);
});
