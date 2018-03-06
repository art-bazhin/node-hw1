const fs = require('fs');
const path = require('path');
const promisify = require('util').promisify;

const mkdir = promisify(fs.mkdir);
const handle = require('./handleError');

/**
 * Creates a directory with desired path (and its intermediate directories if needed)
 *
 * @param {string} dir - Path to the directory
 * @returns {Promise.<void>}
 */
async function mkdirRecursive (dir) {
  const fullPath = path.resolve(dir);

  try {
    await mkdir(fullPath);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await mkdirRecursive(path.parse(fullPath).dir);
      await mkdirRecursive(fullPath);
    } else if (err.code !== 'EEXIST') {
      handle(err);
    }
  }
}

module.exports = mkdirRecursive;
