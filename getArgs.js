const path = require('path');

function testArg (arg) {
  if (arg && arg.slice(0, 2) !== '--') return arg;
  return null;
}

module.exports = function () {
  const args = process.argv.slice(2);

  const src = testArg(args[0]);
  const destIndex = args.indexOf('--dest') + 1;
  const dest = destIndex > 0 ? testArg(args[destIndex]) : null;
  const rm = args.indexOf('--rm') > -1;

  return {
    src: src ? path.normalize(src) : 'src',
    dest: dest ? path.normalize(dest) : 'dest',
    rm: rm
  };
};
