import gulp from 'gulp';
import babel from 'gulp-babel';
import htmlmin from 'gulp-htmlmin';
import inject from 'gulp-inject';
import rename from 'gulp-rename';
import sass from 'gulp-sass';
import uglify from 'gulp-uglify-es';
import postcss from 'gulp-postcss';
import svgmin from 'gulp-svgmin';

import browserSync from 'browser-sync';
import cssnano from 'cssnano';
import del from 'del';
import prefix from 'autoprefixer';

const server = browserSync.create();

const paths = {
  input: 'src/',
  output: 'dist/',
  scripts: {
    input: 'src/js/*',
    output: 'dist/js/'
  },
  styles: {
    input: 'src/sass/**/*.{scss,sass}',
    output: 'dist/css/'
  },
  svgs: {
    input: 'src/assets/**/*.svg',
    output: 'dist/assets/'
  },
  html: {
    input: 'src/**/*.html',
    output: 'dist/**/*.html'
  },
  copy: [
    'src/**/*',
    '!src/js/*',
    '!src/sass/**/*',
    '!src/assets/**/*.svg',
    '!src/index.html'
  ],
  serve: './dist/'
};

const clean = () => del(paths.output);

function html() {
  return gulp.src(paths.html.input).pipe(gulp.dest(paths.output));
}

function styles() {
  return gulp
    .src(paths.styles.input)
    .pipe(sass())
    .pipe(postcss([prefix()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(postcss([cssnano()]))
    .pipe(gulp.dest(paths.styles.output));
}

function js() {
  return gulp
    .src(paths.scripts.input)
    .pipe(babel())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.scripts.output))
    .pipe(uglify({toplevel:true, mangle: {toplevel: true, properties: true}}))
    .pipe(gulp.dest(paths.scripts.output));
}

function svg() {
  return gulp
    .src(paths.svgs.input)
    .pipe(svgmin())
    .pipe(gulp.dest(paths.svgs.output));
}

function move() {
  return gulp.src(paths.copy).pipe(gulp.dest(paths.output));
}

const copy = gulp.parallel(html, styles, js, svg, move);

function injectDependencies() {
  const SOURCES = gulp.src(
    [paths.styles.output + '*', paths.scripts.output + '*'],
    {
      read: false
    }
  );
  return gulp
    .src(paths.html.output)
    .pipe(inject(SOURCES, { relative: true }))
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true
      })
    )
    .pipe(gulp.dest(paths.output));
}

function serve(done: (error?: any) => void) {
  server.init({
    server: {
      baseDir: paths.serve
    }
  });
  done();
}

function reload(done: (error?: any) => void) {
  server.reload();
  done();
}

const build = gulp.series(copy, injectDependencies);
const watch = () => gulp.watch(paths.input, gulp.series(build, reload));

export const prod = gulp.series(clean, build);
export const dev = gulp.series(clean, build, serve, watch);
export default dev;
