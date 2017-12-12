var gulp = require("gulp");

//Browser
var browserify = require("browserify");
var source = require('vinyl-source-stream');
var watchify = require("watchify");
var tsify = require("tsify");
var gutil = require("gulp-util");

//Native
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

var paths = {
    pages: ['src/static/*']
};

var browserifyTS = browserify({
    basedir: '.',
    debug: true,
    entries: ['src/ts/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify).ignore('ammo-node');

var watchedBrowserify = watchify(browserifyTS);

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundleWatchify() {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
		.pipe(gulp.dest("dist"));
}

gulp.task("default", ["copy-html"], func => {
	bundleWatchify();
	watchedBrowserify.on("update", bundleWatchify);
	watchedBrowserify.on("log", gutil.log);
});

gulp.task("bundle", ["copy-html"], func => {
	return browserifyTS
    .bundle()
    .pipe(stripCode({
        start_comment: "start-test-block",
        end_comment: "end-test-block"
      }))
    .pipe(source('bundle.js'))
	.pipe(gulp.dest("dist"));
});

gulp.task("native", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist_native"));
});
