//
//  Required Plugins
var gulp         = require('gulp'),
    browserSync  = require('browser-sync');
    reload          = browserSync.reload;

//
//  Watch
gulp.task('serve', function() {
    browserSync.init({
        server: "src/",
        notify: false
    });
    gulp.watch('src/*.css').on('change', reload);
    gulp.watch('src/*.html').on('change', reload);
    gulp.watch('src/*.js').on('change', reload);
});

//
//  Default
gulp.task('default', ['serve']);
