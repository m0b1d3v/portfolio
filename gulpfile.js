const browserSync = require("browser-sync").create();
const cacheBuster = require("gulp-cache-bust");
const clean = require("gulp-clean");
const concat = require("gulp-concat");
const gulp = require("gulp");
const postcss = require("gulp-postcss");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const uncss = require("postcss-uncss");

// Creating objects for/from NPM modules
const srcDir = "src";
const outDir = "dist";

// Clean the build directory
gulp.task("clean", function () {
  return gulp
    .src(outDir, {allowEmpty: true})
    .pipe(clean());
});

// Copy assets to the build directory
gulp.task("assets", function () {
  return gulp
    .src(`${srcDir}/assets/**/*`)
    .pipe(gulp.dest(outDir))
    .pipe(browserSync.stream());
});

// Process all of our SCSS files into the build
gulp.task("css", function () {

  console.log(uncss);

  return gulp
    .src(`${srcDir}/styles/index.scss`)
    .pipe(sass({outputStyle: "compressed"}).on("error", sass.logError))
    .pipe(concat("index.css"))
    .pipe(postcss([
      uncss({
        html: [`${outDir}/**/*.html`]
      })
    ]))
    .pipe(gulp.dest(outDir))
    .pipe(browserSync.stream());
});

// Process all of our HTML files into the build
gulp.task("html", function () {
  return gulp
    .src(`${srcDir}/html/routes/**/*.pug`)
    .pipe(pug())
    .pipe(gulp.dest(outDir))
    .pipe(browserSync.stream());
});

// Start a BrowserSync server that executes tasks on file changes
gulp.task("sync", function () {

  browserSync.init({
    server: {
      baseDir: `${outDir}/`,
      serveStaticOptions: {
        extensions: ["html"],
      },
    },
  });

  gulp.watch(`${srcDir}/assets/**/*`, gulp.series("assets"));
  gulp.watch(`${srcDir}/**/*.scss`, gulp.series("css"));
  gulp.watch(`${srcDir}/**/*.pug`, gulp.series("html", "css"));
});

// Create a production build

gulp.task("cacheBuster", function () {
  return gulp
    .src(`${outDir}/index.html`)
    .pipe(cacheBuster())
    .pipe(gulp.dest(outDir))
});

gulp.task("build", gulp.series("clean", "assets", "html", "css", "cacheBuster"));

// Tasks run on default `gulp` invocation
gulp.task("default", gulp.series("build", "sync"));
