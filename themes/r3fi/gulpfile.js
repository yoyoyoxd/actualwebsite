'use strict';

const gulp = require("gulp");
const sass = require("gulp-sass");

gulp.task("sass", function () {
   return gulp.src("./src/style/**/*.scss")
       .pipe(sass().on("error", sass.logError))
       .pipe(gulp.dest("./static/css/"));
});


gulp.task("sass:watch", function () {
   gulp.watch("./src/style/**/*.scss", gulp.series("sass"));
});

gulp.task("js", function () {
   return gulp.src("./src/scripts/**/*.js")
       .pipe(gulp.dest("./static/js/"));
});

gulp.task("js:watch", function () {
   gulp.watch("./src/scripts/**/*.js", gulp.series("js"));
});

gulp.task("webfonts", function () {
   return gulp.src("./node_modules/@fortawesome/fontawesome-free/webfonts/**")
       .pipe(gulp.dest("./static/webfonts/"));
});

gulp.task("watch", gulp.parallel("js:watch", "sass:watch"));
