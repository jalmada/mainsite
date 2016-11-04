"use strict";
var gulp = require("gulp");
var del = require("del");
var sourcemaps = require('gulp-sourcemaps');

/**
 * Remove build directory.
 */
gulp.task('clean', function (cb) {
    return del(["build"], cb);
});

/**
 * Copy all resources that are not TypeScript files into build directory.
 */
gulp.task("resources", ["server", "apps", "assets"], function () {
    console.log("Building resources...");
});
/* copy the app core files to the build folder */
gulp.task("apps", ['index'], function(){
    return gulp.src(["apps/**", "!apps/**/*.ts"])
        .pipe(gulp.dest("build/apps"));
});
/* get the index file to the root of the build */
gulp.task("index", function(){
    return gulp.src(["index.html","systemjs.config.js","favicon.ico"])
        .pipe(gulp.dest("build"));
});
/* copy node server to build folder */
gulp.task("server",["express-server"], function () {
    console.log("Building server...");
    return gulp.src(["package.json","app.js"])
        .pipe(gulp.dest("build"))
});

/* styles and other assets */
gulp.task("assets", function(){
    return gulp.src(["styles.css"])
        .pipe(gulp.dest("build"));
});

gulp.task("views", function(){
    return gulp.src(["views/**"])
        .pipe(gulp.dest("build/views"));
});

gulp.task("express-server", function(){
    return gulp.src(["server/**"])
        .pipe(gulp.dest("build/server"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", function () {
    return gulp.src([
        'core-js/client/shim.min.js',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'systemjs/dist/system.src.js',
        'jquery/dist/jquery.min.js',
        'bootstrap/dist/js/bootstrap.min.js',
        'bootstrap/dist/css/bootstrap.min.css',
        'bootstrap/dist/fonts/**',
        'font-awesome/css/font-awesome.min.css',
        'font-awesome/fonts/**',
        '@angular/**',
        'rxjs/**',
        'express/**',
        'ejs/**'    
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("build/node_modules"));
});
/**
 * Build the project.
 */
gulp.task("default", ['resources', 'libs', 'views'], function () {
    console.log("Building the project ...");
});