const sortFiles = require('./sortFiles');
const getArgs = require('./getArgs');

const args = getArgs();

sortFiles(args.src, args.dest, args.rm, () => {
  console.log('SUCCESS');
});
