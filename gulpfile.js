var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var log = require('gulplog');
var inject = require('gulp-inject');
// var sourcemaps = require('gulp-sourcemaps');

var runSequence = require('run-sequence');
var del = require('del');
var browserify = require('browserify');
var brfs = require('brfs');

var pctDataBuilder = require('./src/build/pct-data-builder');


gulp.task('clean', function () {
    return del(['./dist/**', '!dist'], { force: true });
});

gulp.task('copy-file', function () {
    let allfiles = "./src/main/**/*.+(js|json|html|css)";
    return gulp.src([allfiles, "!./src/**/genetic-run-factory.js"])
        .pipe(gulp.dest("./dist/"));;
});

gulp.task('browserify', function () {
    var b = browserify({
        entries: './src/main/core/genetic/genetic-run-factory.js',
        debug: true,
        // defining transforms here will avoid crashing your stream
        transform: [brfs]
    });

    return b.bundle()
        .pipe(source('./src/main/core/genetic/genetic-run-factory.js'))
        .pipe(buffer())
        //.pipe(sourcemaps.init({ loadMaps: true }))
        .on('error', log.error)
        //.pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/bundle/'));
})

gulp.task('linkage', function () {
    var target = gulp.src('./dist/index.html');
    var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], { read: false });
    var options = { "relative": true };
    return target.pipe(inject(sources, options))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
    // 'pct-feature' and 'linkage' can be parallelized
    runSequence('clean', 'copy-file', 'browserify', 'pct-feature', 'linkage', function () { });
});

gulp.task('pct-feature', function () {
    pctDataBuilder.build();
});


