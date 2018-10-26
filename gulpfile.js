const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const child = require('child_process');
const gutil = require('gulp-util');


const cssFiles = '_scss/**/*.?(s)css';

gulp.task('css', () => {
  gulp.src(cssFiles)
  	.pipe(sass())
    .pipe(concat('all.css'))
    .pipe(gulp.dest('_assets'))
});

gulp.task('watch', () => {
  gulp.watch(cssFiles, ['css']);
});

gulp.task('jekyll', () => {
  const jekyll = child.spawn('jekyll', ['serve',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('default', ['css', 'jekyll', 'watch']);