const sortFiles = require('./sortFiles');

const args = require('yargs')
  .usage('Usage: node $0 [--src path/to/src/dir] [--dest path/to/dest/dir] [--rm]')
  .options({
    src: {
      describe: 'source folder',
      default: 'src'
    },
    dest: {
      describe: 'destination folder',
      default: 'dest'
    },
    rm: {
      describe: 'source folder removing flag',
      default: false
    }
  }).argv;

sortFiles(args).then(() => console.log('SUCCESS'));
