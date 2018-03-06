/**
 * Simple error handler
 *
 * @param err - Errror object
 */
module.exports = function (err) {
  if (err) {
    console.log(err.toString());
    process.exit(-1);
  }
};
