var gulp = require('gulp');
var filesystem = require("fs");
var webpack = require('webpack-stream');
var webpackConfigFile = require('./webpack.config.js');


gulp.task('default', ["file-list", "webpack", "css", "textures", "html"]);

gulp.task('webpack', function () {
    return gulp.src('./index.js')
        .pipe(webpack(webpackConfigFile))
        .pipe(gulp.dest('out/js/'));
});

gulp.task('css', function () {
    return gulp.src('css/style.css')
        .pipe(gulp.dest('out/css/'));
});

gulp.task('html', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('out/'));
});

gulp.task('textures', function () {
    return gulp.src('./textures/**/*.*', {base: './'})
        .pipe(gulp.dest('out/'));
});
gulp.task("file-list", function () {

    var dir = './textures';
    var results = getAllFilesFromFolder(dir);
    console.log("done", results);
    var path = dir + "/texture-list.json";
    filesystem.writeFileSync(path, '{\"files\":[' + results + "]}", 'utf8');
});

function getAllFilesFromFolder(dir) {
    var results = [];

    filesystem.readdirSync(dir).forEach(function (file) {

        file = dir + '/' + file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(getAllFilesFromFolder(file))
        }
        else results.push("\"" + file + "\"");
    });
    return results;
}