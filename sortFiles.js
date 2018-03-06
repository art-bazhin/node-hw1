const getFileList = require('./getFileList');
const createTransferArray = require('./createTransferArray');
const copyFile = require('./copyFile');
const rmdirRecursive = require('./rmdirRecursive');

/**
 * Sorts files the directory by extensions and names and puts it to desired path
 *
 * @param {Object} options - Options object
 * @param {string} options.src - Path to the directory which files from will be copied
 * @param {string} options.dest - Path to the directory where the files will be copied
 * @param {boolean} options.rm - If true src directory will be removed after finishing the copying
 * @returns {Promise.<void>}
 */
module.exports = async function (options) {
  const files = await getFileList(options.src);
  const transferArray = createTransferArray(files, options.dest);

  await Promise.all(transferArray.map(
    item => copyFile(item.src, item.dest)
  ));

  if (options.rm) await rmdirRecursive(options.src);
};
