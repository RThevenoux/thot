var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');
var pctDataBuilder = require('./src/build/pct-data-builder');

gulp.task('clean', function () {
    return del(['./dist/**', '!dist'], { force: true });
});

gulp.task('copy-file', function () {
    return gulp.src("./src/main/**/*.+(js|json|html|css)")
        .pipe(gulp.dest("./dist/"));;
});

gulp.task('linkage', function () {
    var target = gulp.src('./dist/index.html');
    var sources = gulp.src(['./dist/**/*.js', './dist/**/*.css'], { read: false });
    var options = { "relative": true };
    return target.pipe(inject(sources, options))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function () {
    // 'pct-feature' and 'linkage' can be parallelized
    runSequence('clean', 'copy-file', 'pct-feature', 'linkage', function () { });
});

gulp.task('pct-feature', function () {
    pctDataBuilder.build();
});


