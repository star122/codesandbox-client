const gulp = require('gulp');
const _rimraf = require('rimraf');

function rimraf(dir) {
  let retries = 0;

  const retry = cb => {
    _rimraf(dir, { maxBusyTries: 1 }, err => {
      if (!err) {
        return cb();
      }

      if (err.code === 'ENOTEMPTY' && ++retries < 5) {
        return setTimeout(() => retry(cb), 10);
      }

      return cb(err);
    });
  };

  return cb => retry(cb);
}

gulp.task('app', () =>
  gulp.src('packages/app/www/**/*').pipe(gulp.dest('www'))
);

gulp.task('homepage', () =>
  gulp.src('packages/homepage/public/**/*').pipe(gulp.dest('www'))
);

gulp.task('statics', () =>
  gulp.src('packages/app/public/**/*').pipe(gulp.dest('www'))
);

gulp.task('default', ['app', 'homepage', 'statics']);

gulp.task('clean-vscode', rimraf('standalone-packages/monaco-editor-core'));

gulp.task('prepare-vscode', ['clean-vscode'], () =>
  gulp
    .src('standalone-packages/vscode/out-monaco-editor-core/**/*')
    .pipe(gulp.dest('standalone-packages/monaco-editor-core'))
);
