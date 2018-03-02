const fs = require('fs');
const path = require('path');

const handle = require('./handleError');

function getDirFiles (dir, cb, obj) {
  fs.readdir(dir, (err, files) => {
    handle(err);

    obj.total += files.length;
    obj.counter++;

    files.forEach(str => {
      let fullPath = path.resolve(dir, str);
      fs.stat(fullPath, (err, stat) => {
        handle(err);

        if (stat.isFile()) {
          obj.files.push(fullPath);
          obj.counter++;
        } else if (stat.isDirectory()) {
          getDirFiles(fullPath, cb, obj);
        }

        if (obj.total === obj.counter) cb(obj.files);
      });
    });
  });
}

module.exports = function (dir, cb) {
  getDirFiles(dir, cb, {
    files: [],
    total: 1,
    counter: 0
  });
};
