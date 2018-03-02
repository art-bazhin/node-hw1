const path = require('path');

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
