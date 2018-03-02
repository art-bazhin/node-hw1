const getFileList = require('./getFileList');
const createTransferArray = require('./createTransferArray');
const writeFile = require('./writeFile');
const removeSource = require('./removeSource');

module.exports = function (src, dest, rm, cb) {
  getFileList(src, files => {
    let transferArray = createTransferArray(files, dest);
    let total = transferArray.length;
    let counter = 0;

    transferArray.forEach(file => {
      writeFile(file.src, file.dest, () => {
        counter++;
        if (counter === total) {
          if (rm) {
            removeSource(src, cb);
          } else {
            cb();
          }
        }
      });
    });
  });
};
