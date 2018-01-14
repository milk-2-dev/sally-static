var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    rename          = require('gulp-rename'),
    cssnano         = require('gulp-cssnano'),
    del             = require('del'),
    autoprefixer    = require('gulp-autoprefixer'),
	svgSprite         = require('gulp-svg-sprites'),
    svgmin          = require('gulp-svgmin'),
    cheerio         = require('gulp-cheerio'),
    replace         = require('gulp-replace'),
    fs              = require('fs'),
    spritesmith     = require('gulp.spritesmith'),
    //phantomjssmith  = require('phantomjssmith');,
    merge           = require('merge-stream'),
    buffer          = require('vinyl-buffer'),
    imagemin        = require('gulp-imagemin'),
    csso            = require('gulp-csso'),
    sourcemaps      = require('gulp-sourcemaps');

gulp.task('sass', function(){
    return gulp.src('app/sass/**/*.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
        //.pipe(sourcemaps.write('../css', {addComment: false}))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync',function(){
    browserSync({
        server: "./app"
    });
});

gulp.task('scripts', function() {
    return gulp.src([
        // 'app/libs/modernizr.js',
        'app/libs/jquery/dist/jquery.min.js',
        'app/libs/tether/dist/js/tether.min.js',
        'app/libs/bootstrap/dist/js/bootstrap.min.js',
        'app/libs/OwlCarousel2/dist/owl.carousel.min.js',
        'app/libs/carousel-2rows/carousel-2rows.js',
        'app/libs/gsap/src/minified/TweenMax.min.js',
        'app/libs/seiyria-bootstrap-slider/dist/bootstrap-slider.js',
        'app/libs/dropzone/dist/dropzone.js',
        'app/libs/chosen/chosen.jquery.js',
        'app/libs/mobile-detect/mobile-detect.js',
        'app/libs/ThreeDots/ThreeDots.js',
        'app/libs/sprite-cash.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

gulp.task('css-libs', ['sass'], function() {
    return gulp.src('app/css/libs.css')
    .pipe(cssnano())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/css'));
});

gulp.task('sprite', function () {
    // Generate our spritesheet
    var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        cssName: '_sprite.scss'
    }));

    // Pipe image stream through image optimizer and onto disk
    var imgStream = spriteData.img
    // DEV: We must buffer our stream into a Buffer for `imagemin`
        //.pipe(buffer())
        //.pipe(imagemin())
        .pipe(gulp.dest('app/images/sprites/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        //.pipe(csso())
        .pipe(gulp.dest('app/sass/'));

    // Return a merged stream to handle both `end` events
    return merge(imgStream, cssStream);
});

gulp.task('svgSpriteBuild', function () {
	return gulp.src('app/images/icons-svg/*.svg')
	// minify svg
	.pipe(svgmin({
		js2svg: {
			pretty: true
		}
	}))
	//remove all fill and style declarations in out shapes
	.pipe(cheerio({
		run: function ($) {
			$('[fill]').removeAttr('fill');
			$('[style]').removeAttr('style');
		},
		parserOptions: { xmlMode: true }
	}))
	// cheerio plugin create unnecessary string '>', so replace it.
	.pipe(replace('&gt;', '>'))
	// build svg sprite
	.pipe(svgSprite({
				mode: "symbols",
				preview: false,
				selector: "icon-%f",
				layout: "vertical",
				svg: {
					symbols: 'symbol_sprite.html'
				}
			}
	))
	.pipe(gulp.dest('app/'));
});

// create sass file for our sprite
gulp.task('svgSpriteSass', function () {
	return gulp.src('app/images/icons-svg/*.svg')
	.pipe(svgSprite({
				preview: false,
				selector: "icon-%f",
				svg: {
					sprite: 'svg_sprite.html'
				},
				cssFile: 'sass/_svg_sprite.scss',
				templates: {
					css: fs.readFileSync('app/sass/_sprite-template.scss', "utf-8")
				}
			}
	))
	.pipe(gulp.dest('app/'));
});

gulp.task('svgSprite', ['svgSpriteBuild', 'svgSpriteSass']);

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/sass/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// ----------------------Дефолтный таск gulp --------------------------------

gulp.task('default', ['watch']);