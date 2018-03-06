var gulp = require('gulp'),
  pug = require('gulp-pug'),
  stylus = require('gulp-stylus'),
  livereload = require('gulp-livereload'),
  csso = require('gulp-csso'),
  imagemin = require('gulp-imagemin'),
  uglify = require('gulp-uglify'),
  autoprefixer = require('gulp-autoprefixer'),
  concat = require('gulp-concat');

gulp.task('pug', function() {
  gulp.src(['./pug/*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .on('error', console.log)
    .pipe(gulp.dest('../'))
    .pipe(livereload());
});

gulp.task('stylus', function() {
  gulp.src('./stylus/global.styl')
    .pipe(stylus({
      compress: true
    }))
    .on('error', console.log) 
    .pipe(autoprefixer({
      browsers: ['ie >= 10', 'last 2 versions']
    }))
    .on('error', console.log)
    .pipe(gulp.dest('../css/')) 
    .pipe(livereload());
});

gulp.task('js', function() {
  gulp.src(['./js/*.js'])
  .pipe(concat('script.js'))
  .pipe(uglify())
  .pipe(gulp.dest('../js/'))
  .pipe(livereload());
});

gulp.task('images', function() {
  gulp.src(['./img/*'])
    .pipe(imagemin())
    .on('error', console.log)
    .pipe(gulp.dest('../img/'))
    .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('./pug/*', ['pug']);
  gulp.watch('./stylus/**/*', ['stylus']);
  gulp.watch('./js/*', ['js']);
  gulp.watch('./img/*', ['images']);
});
