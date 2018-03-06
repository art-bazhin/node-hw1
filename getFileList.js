const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const handle = require('./handleError');

const fileList = [];

/**
 * Creates a list of all files in directory and its subdirectories
 *
 * @param {string} dir - Path to the directory
 * @returns {Promise.<Array>}
 */
async function getFileList (dir) {
  try {
    const files = await readdir(dir);

    await Promise.all(files.map(async str => {
      let fullPath = path.resolve(dir, str);
      let fileStat = await stat(fullPath);

      if (fileStat.isFile()) {
        fileList.push(fullPath);
      } else if (fileStat.isDirectory()) {
        await getFileList(fullPath);
      }
    }));

    return fileList;
  } catch (err) {
    handle(err);
  }
}

module.exports = getFileList;
