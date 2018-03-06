const path = require('path');

/**
 * Creates an array of objects which looks like
 * { src: 'path/to/the/source/file', dest: 'path/to/the/dest/file' }
 * from the array of source files paths and destination folder path
 *
 * @param {Array.<string>} files - Array of source files paths
 * @param {string} dest - Destination folder path
 * @returns {Array}
 */
module.exports = function (files, dest) {
  let filesCount = {};

  return files
    .filter(file => path.extname(file).length > 1)
    .map(file => {
      let obj = path.parse(file);

      let ext = obj.ext.slice(1);
      let name = obj.name;
      let letter = name[0].toUpperCase();

      if (!filesCount[ext]) filesCount[ext] = {};
      if (filesCount[ext][name] === undefined) {
        filesCount[ext][name] = 0;
      } else {
        filesCount[ext][name]++;
        name += `(${filesCount[ext][name]})`;
      }

      return {
        src: file,
        dest: path.join(dest, ext, letter, `${name}.${ext}`)
      };
    });
};
