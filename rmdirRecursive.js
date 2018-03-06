const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const rmdir = promisify(fs.rmdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const handle = require('./handleError');

/**
 * Removes a directory with all its content
 *
 * @param {string} dir - Path to the directory
 * @returns {Promise.<void>}
 */
async function rmdirRecursive (dir) {
  try {
    await rmdir(dir);
  } catch (err) {
    if (err.code === 'ENOTEMPTY') {
      let files = await readdir(dir);

      await Promise.all(files.map(async str => {
        let fullPath = path.resolve(dir, str);
        let fileStat = await stat(fullPath);

        if (fileStat.isFile()) {
          await unlink(fullPath);
        } else if (fileStat.isDirectory()) {
          await rmdirRecursive(fullPath);
        }
      }));

      await rmdir(dir);
    } else {
      handle(err);
    }
  }
}

module.exports = rmdirRecursive;
