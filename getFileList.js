const fs = require('fs');
const path = require('path');

function getFileList (dir) {
  let files;
  let array = [];

  try {
    files = fs.readdirSync(dir);
  } catch (e) {
    switch (e.code) {
      case 'ENOENT':
        console.log(`No such directory ${dir}`);
    }
    process.exit(1);
  }

  files.forEach(str => {
    let fullPath = path.resolve(dir, str);
    let stat = fs.lstatSync(fullPath);

    if (stat.isFile()) {
      array.push(fullPath);
    } else if (stat.isDirectory()) {
      array = array.concat(getFileList(fullPath));
    }
  });

  return array;
}

module.exports = getFileList;
