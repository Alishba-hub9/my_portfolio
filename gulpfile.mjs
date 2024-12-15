import { src, dest, watch, series, parallel } from 'gulp';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import autoprefixer from 'gulp-autoprefixer';

const sass = gulpSass(sassCompiler);

const paths = {
  styles: {
    src: 'assets/css/style.scss',
    dest: 'dist/css'
  },
  scripts: {
    vendors: {
      list: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/owl.carousel/dist/owl.carousel.min.js',
        'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
      ],
      dest: 'dist/js',
      filename: 'vendors.min.js'
    },
    main: {
      src: 'assets/js/script.js',
      dest: 'dist/js',
      filename: 'script.min.js'
    }
  },
  css: {
    vendors: {
      list: [
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/owl.carousel/dist/assets/owl.carousel.css',
        'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
      ],
      dest: 'dist/css',
      filename: 'vendors.min.css'
    },
  }
};

export function styles() {
  return src(paths.styles.src)
    .pipe(sass().on('error', function (err) {
      console.error('Sass Compilation Error:', err.message);
      this.emit('end');
    }))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest(paths.styles.dest));
}

export function vendorScripts() {
  return src(paths.scripts.vendors.list)
    .pipe(uglify())
    .pipe(concat(paths.scripts.vendors.filename))
    .pipe(dest(paths.scripts.vendors.dest));
}

export function vendorStyles() {
  return src(paths.css.vendors.list)
    .pipe(cleanCSS())
    .pipe(concat(paths.css.vendors.filename))
    .pipe(dest(paths.css.vendors.dest));
}

export function mainScripts() {
  return src(paths.scripts.main.src)
    .pipe(uglify())
    .pipe(concat(paths.scripts.main.filename))
    .pipe(dest(paths.scripts.main.dest));
}

export function watchFiles() {
  watch('assets/css/**/*.scss', styles);
  watch('assets/js/**/*.js', mainScripts);
}

export const build = parallel(styles, vendorScripts, vendorStyles, mainScripts);
export default series(build, watchFiles);
