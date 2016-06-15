var gulp = require('gulp');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');

gulp.task('jade-compile', function() {
  // var my_locals = {
  //   title: 'WFO Data Viewer'
  // };

  gulp.src(['views/templates/index.jade'])
    .pipe(jade({
      // locals: my_locals,
      pretty: true
    }))
    .pipe(gulp.dest('./'));
});

// Default task
gulp.task('default', function() {
  gulp.start('jade-compile');
});

// Watch
gulp.task('watch', function() {

  gulp.watch('views/**/*.jade', ['jade-compile']);

  // Create LiveReload server
  livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['views/**']).on('change', livereload.changed);

});