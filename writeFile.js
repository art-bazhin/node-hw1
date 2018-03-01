const fs = require('fs');
const path = require('path');

function mkdir (dest) {
  const fullPath = path.resolve(dest);

  if (fs.existsSync(fullPath)) return;

  try {
    fs.mkdirSync(fullPath);
  } catch (e) {
    if (e.code === 'ENOENT') {
      mkdir(path.parse(fullPath).dir);
      mkdir(fullPath);
    } else throw (e);
  }
}

module.exports = function (str, dest) {
  const ext = path.extname(str).slice(1);
  const letter = path.basename(str)[0].toUpperCase();

  mkdir(dest);
  mkdir(path.join(dest, ext));
  mkdir(path.join(dest, ext, letter));
};