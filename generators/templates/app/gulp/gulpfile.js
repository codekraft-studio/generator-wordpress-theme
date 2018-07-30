var fs = require('fs');
var pkg = JSON.parse(fs.readFileSync('./package.json'));
var gulp = require('gulp');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var wpPot = require('gulp-wp-pot');
var merge = require('merge-stream');
var help = require('gulp-help')(gulp, {
  description: 'Show this help message.'
});

// Ufligy all the theme files and optionally vendor files
// the theme files only will be concat and babeled first
gulp.task('uglify', 'Concat and uglify all the javascript files into one file.', function () {
  var userScript = gulp.src('./src/assets/src/js/user/**/*.js')
    .pipe(concat(pkg.name + '-user.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./src/assets/dist/js/'))
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./src/assets/dist/js/'));

  var adminScript = gulp.src('./src/assets/src/js/admin/**/*.js')
    .pipe(concat(pkg.name + '-admin.js'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('./src/assets/dist/js/'))
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./src/assets/dist/js/'));

  var vendorScripts = gulp.src('./src/assets/src/js/vendor/**/*.js')
    .pipe(uglify())
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./src/assets/dist/js/'));

  return merge(userScript, adminScript, vendorScripts);
});

gulp.task('sass', 'Compile and minify all the sass files into one file.', function () {
  var options = {outputStyle: 'compressed'};

  var mainStyle = gulp.src('./src/assets/src/scss/user-style.scss')
    .pipe(sass(options))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./src/'));

  var adminStyle = gulp.src('./src/assets/src/scss/admin-style.scss')
    .pipe(sass(options))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./src/assets/dist/css/'));

  var editorStyle = gulp.src('./src/assets/src/scss/editor-style.scss')
    .pipe(sass(options))
    .on('error', notify.onError('Error: <%= error.message %>'))
    .pipe(gulp.dest('./src/assets/dist/css/'));

  return merge(mainStyle, adminStyle, editorStyle);
});

// Do the potfile for the translations
gulp.task('makepot', 'Generates pot files for your WordPress project.', function () {
  gulp.src('src/**/*.php')
    .pipe(wpPot({
      domain: pkg.name,
      package: pkg.description
    }))
    .pipe(gulp.dest('./src/languages/' + pkg.name + '.pot'));
});

gulp.task('watch', 'Watch for file changes and execute various tasks.', function () {
  watch('./src/assets/src/js/**/*.js', function () {
    gulp.start('uglify');
  });

  watch('./src/assets/src/scss/**/*.scss', function () {
    gulp.start('sass');
  });

  watch('./src/assets/src/img/*', function () {
    gulp.start('imagemin');
  });
});

// Minify and compress all the theme images
gulp.task('images', 'Minify and prepare image files for the distribution.', function () {
  // Optimize all the images
  var img = gulp.src('./src/assets/src/img/**/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('./src/assets/dist/img'));
  // Optmize all the svgs
  var svg = gulp.src('./src/assets/src/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./src/assets/dist/img'));
  // Merge the streams
  return merge(img, svg);
});

gulp.task('build', 'Build all the project for the distribution.', ['uglify', 'sass', 'images', 'makepot']);

gulp.task('default', ['watch']);
