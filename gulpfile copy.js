var gulp = require("gulp");
var path = require("path");
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var open = require("gulp-open");
var concat = require('gulp-concat'); // Gulp File concatenation plugin

var Paths = {
  HERE: "./",
  DIST: "dist/",
  PAGES: "./pages/",
  CSS: "./assets/css/",
  SCSS_TOOLKIT_SOURCES: "./assets/scss/paper-kit.scss",
  SCSS: "./assets/scss/**/**",
};

gulp.task("compile-scss", () => {
  return gulp
    .src(Paths.SCSS_TOOLKIT_SOURCES)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(sourcemaps.write(Paths.PAGES))
    .pipe(gulp.dest(Paths.CSS));
});

// Configuration
var configuration = {
  paths: {
      src: {
          html: './pages/*.html',
      },
      dist: './dist'
  }
};

// Gulp task to copy HTML files to output directory
gulp.task('html', function() {
  gulp.src(configuration.paths.src.html)
      .pipe(gulp.dest(configuration.paths.dist));
});

gulp.task("watch", () => {
  gulp.watch(Paths.SCSS, ["compile-scss"]);
});

gulp.task("open", () => {
  gulp.src("index.html").pipe(open());
});

gulp.task("open-app", gulp.series('open', 'watch', 'html'));
