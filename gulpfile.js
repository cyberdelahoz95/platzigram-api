const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js1', () => {
    return gulp.src(['auth.js','pictures.js','users.js','config.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js2', () => {
    return gulp.src('./lib/utils.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/lib/'));
});

gulp.task('js3', () => {
    return gulp.src('./test/fixtures/index.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/test/fixtures/'));
});

gulp.task('js4', () => {
    return gulp.src('./test/stub/db.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/test/stub/'));
});

gulp.task('default', [ 'js1', 'js2', 'js3','js4']);