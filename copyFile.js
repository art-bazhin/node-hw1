const fs = require('fs');
const path = require('path');

const mkdirRecursive = require('./mkdirRecursive');

/**
 * Copies a file and puts it to desired path
 *
 * @param {string} src - Path to the file which will be copied
 * @param {string} dest - Copying destination path
 * @returns {Promise}
 */
module.exports = async function (src, dest) {
  await mkdirRecursive(path.dirname(dest));

  const rs = fs.createReadStream(src);
  const ws = fs.createWriteStream(dest);

  return new Promise((resolve, reject) => {
    rs.on('error', reject)
      .pipe(ws)
      .on('error', reject)
      .on('finish', resolve);
  });
};
