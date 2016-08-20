var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-html-replace');
var sourcemap = require('gulp-sourcemaps');

gulp.task('content', function(){
	gulp.src('./src/index.html')
		.pipe(gulp.dest('./dist/'))
		.pipe(reload({stream: true}))
});

gulp.task('scripts', function(){
	gulp.src('./src/scripts/*.js')
		.pipe(sourcemap.init())
			.pipe(uglify())
			.pipe(concat('app.js'))
		.pipe(sourcemap.write())
		.pipe(gulp.dest('./dist/scripts'))
		.pipe(reload({stream: true}))
});

gulp.task('styles', function(){
	gulp.src('./src/styles/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest('./dist/styles'))
		.pipe(reload({stream: true}))
});

gulp.task('serve', function(){
	browserSync.init({
		server: {
			baseDir: './dist/'
		}
	});
gulp.watch('./src/index.html', ['content']);
	gulp.watch('./src/scripts/*.js', ['scripts']);
	gulp.watch('./src/styles/*.css', ['styles']);
});
gulp.task('default', ['content', 'scripts', 'styles', 'serve']);