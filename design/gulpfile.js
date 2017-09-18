var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
var gutil = require('gulp-util');

var proxy_url = "http://fatline.loc/design/";

gulp.task('browser-sync'/*, ['less', 'less-watch']*/, function() {
    browserSync.init({
        proxy: proxy_url
    });

    gulp.watch(["**/*.html", "**/*.less", "./less/**/*.css", "**/*.js", "**/*.png", "**/*.jpg"]).on('change', browserSync.reload);
});

gulp.task('browser-no-sync'/*, ['less', 'less-watch']*/, function() {
    browserSync.init({
        proxy: proxy_url
    });

});

gulp.task('less', function() {
    return gulp.src(["./less/styles.less"])
        .pipe(less().on('error', function(err){
            require('fs').writeFileSync('./less.err', err.message);
            gutil.log(err.message);
            this.emit('end', err);
        }).on('end', function(err) {
            if (typeof err === 'undefined') {
                // у нас все закончилось успешно
                require('fs').writeFileSync('./less.err', '');
            }
            else {
            }
        }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({stream:true}));
});

gulp.task('less-watch', function() {
    gulp.watch(["./blocks/**/*.less", "./less/**/*.less"], ['less']);
});

gulp.task('sync', ['browser-sync']);
gulp.task('no-sync', ['browser-no-sync']);