var gulp = require('gulp');
const del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean', function () {
    return del(['./dist/**', '!dist'], { force: true });
});

gulp.task('myJS', function () {
    return gulp.src("./src/main/**/*.+(js|json)")
        .pipe(gulp.dest("./dist/"));;
});

gulp.task('myCSS', function () {
    return gulp.src("./src/main/**/*.css")
        .pipe(gulp.dest("./dist/"));;
});

gulp.task('myHTML', function () {
    return gulp.src("./src/main/**/*.html")
        .pipe(gulp.dest("./dist/"));;
});

gulp.task('build', function (callback) {
    runSequence('clean', 'myJS', 'myHTML', 'myCSS', function () { });
});


