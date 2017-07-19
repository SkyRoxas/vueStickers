// require module
var gulp = require('gulp'),
  jade = require('gulp-jade'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  browserSync = require('browser-sync').create()

// gulp sass
var sass_Config = {}
    // autoprefixer config
var autoprefixer_Config = {
  browsers: ['last 2 versions'],
  cascade: false
}
    // browserSync config
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }

        // proxy: "你的域名或IP";
  })
  gulp.watch('**/*.html').on('change', browserSync.reload)
})

// for jade to html
gulp.task('jade', function () {
  gulp.src('jade/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('.'))
        .pipe(browserSync.reload({
          stream: true
        }))
})

gulp.task('jade:watch', function () {
  gulp.watch('./**/*.jade', ['jade'])
})

// for sass to css
gulp.task('sass', function () {
  gulp.src('styles/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer(autoprefixer_Config))
        .pipe(sass(sass_Config).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('styles'))
        .pipe(browserSync.reload({
          stream: true
        }))
})

gulp.task('sass:watch', function () {
  gulp.watch('styles/sass/**/*.scss', ['sass'])
})

gulp.task('js', function () {
  gulp.src('./scripts/js/**/*.js')
        .pipe(browserSync.reload({
          stream: true
        }))
})

gulp.task('js:watch', function () {
  gulp.watch('./scripts/js/**/*.js', ['js'])
})

gulp.task('default', ['browser-sync', 'sass', 'sass:watch', 'js:watch', 'jade', 'jade:watch'])
