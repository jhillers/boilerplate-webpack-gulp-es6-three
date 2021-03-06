var gulp = require('gulp');
var filesystem = require("fs");
var webpack = require('webpack');
var webpackConfigFile = require('./webpack.config.js');
var WebpackDevServer = require("webpack-dev-server");

gulp.task('default', ["file-list", "css", "textures", "html", "webpack-dev-server"]);

gulp.task("webpack", function (callback) {
    // run webpack
    webpack(webpackConfigFile, function (err, stats) {
        if (err) {
            console.log("error running webpack\n", err.message);
        }
        callback();
    });
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
    var path = dir + "/texture-list.json";
    filesystem.writeFileSync(path, '{\"files\":[' + results + "]}", 'utf8');
});

/**
 * Creates an array of a list of files from a given folder.
 * @param dir
 * @returns {Array}
 */
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

gulp.task("webpack-dev-server", function (callback) {

    var config = Object.create(webpackConfigFile);

    new WebpackDevServer(webpack(config), {
        hot: true,
        contentBase: ".",
        publicPath: config.output.publicPath,
        stats: {
            colors: true
        }
    }).listen(8080, "localhost", function (err) {
        if (err) console.log("Error running server", err.message);
    });
    callback();
});
// server.close();