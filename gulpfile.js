var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var inject = require('gulp-inject');

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
    var options = {"relative":true};
    return target.pipe(inject(sources,options))
        .pipe(gulp.dest('./dist'));
});

gulp.task('build', function (callback) {
    runSequence('clean', 'copy-file', 'linkage', function () { });
});


