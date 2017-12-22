var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),

	////Minify JavaScript
    uglify = require('gulp-uglify'),

	////Compile scss
    sass = require('gulp-sass'),

	/////Take all template
    rigger = require('gulp-rigger'),

    cssnano = require('gulp-cssnano'),

	////Optimize images
    imagemin = require('gulp-imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    pngquant = require('imagemin-pngquant'),


    browserSync = require('browser-sync'),

    concat = require('gulp-concat'),

    rename = require('gulp-rename'),

	////Cleaning directories
    rimraf = require('rimraf'),

    ////Generate svg sprite
	svgSprite = require('gulp-svg-sprites'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    fs = require('fs'),

	////Generate png sprite
    spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream'),
    buffer = require('vinyl-buffer'),
    imagemin = require('gulp-imagemin')


var buildFolder = 'build',
	srcFolder = 'src',
	path = {
		build: { //Where gulp must build project
			html: buildFolder +'/',
			js: buildFolder +'/js/',
			css: buildFolder +'/css/',
			img: buildFolder +'/img/',
			fonts: buildFolder +'/fonts/'
		},
		src: { //From where gulp must take sources
			html: srcFolder +'/*.html',
			js: srcFolder +'/js/*.js',
			style: srcFolder +'/scss/*.scss',
			img: srcFolder +'/img/**/*.*',
			fonts: srcFolder +'/fonts/**/*.*'
		},
		watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
			html: srcFolder +'/**/*.html',
			js: srcFolder +'/js/**/*.js',
			style: srcFolder +'/style/**/*.scss',
			img: srcFolder +'/img/**/*.*',
			fonts: srcFolder +'/fonts/**/*.*'
		},
		clean: './' + buildFolder
	};

var config = {
    server: {
        baseDir:'./' + buildFolder
    },
    // tunnel: true,
    host: 'localhost',
    port: 3000
};


gulp.task('html:build', function () {
    gulp.src(path.src.html) //Take all html files
	.pipe(rigger()) //Take all template in html
	.pipe(gulp.dest(path.build.html)) //Put result into build directory
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('libsJs:build', function() {//scripts
    return gulp.src([
        srcFolder + '/libs/jquery/dist/jquery.min.js',
        srcFolder + '/libs/tether/dist/js/tether.min.js',
        srcFolder + '/libs/bootstrap/dist/js/bootstrap.min.js',
        srcFolder + '/libs/OwlCarousel2/dist/owl.carousel.min.js',
        srcFolder + '/libs/gsap/src/minified/TweenMax.min.js',
        srcFolder + '/libs/seiyria-bootstrap-slider/dist/bootstrap-slider.js',
        srcFolder + '/libs/dropzone/dist/dropzone.js',
        srcFolder + '/libs/chosen/chosen.jquery.js',
        srcFolder + '/libs/mobile-detect/mobile-detect.js',
        srcFolder + '/libs/ThreeDots/ThreeDots.js',
        srcFolder + '/libs/sprite-cash.js'
    ])
	.pipe(concat('libs.min.js'))
	//.pipe(uglify()) this doing on next step
	.pipe(gulp.dest(srcFolder + '/js'));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
	.pipe(uglify()) //Optimize over js files
	.pipe(gulp.dest(path.build.js))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
	.pipe(sourcemaps.init()) //То же самое что и с js
	.pipe(sass()) //Скомпилируем
	.pipe(prefixer()) //Добавим вендорные префиксы
	.pipe(cssmin()) //Сожмем
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.css)) //И в build
	.pipe(reload({stream: true}));
});




gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
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
        .pipe(buffer())
        .pipe(imagemin())
        .pipe(gulp.dest('app/images/sprites/'));

    // Pipe CSS stream through CSS optimizer and onto disk
    var cssStream = spriteData.css
        //.pipe(csso())
        .pipe(gulp.dest('app/scss/'));

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

// create scss file for our sprite
gulp.task('svgSpriteSass', function () {
	return gulp.src('app/images/icons-svg/*.svg')
	.pipe(svgSprite({
				preview: false,
				selector: "icon-%f",
				svg: {
					sprite: 'svg_sprite.html'
				},
				cssFile: 'scss/_svg_sprite.scss',
				templates: {
					css: fs.readFileSync('app/scss/_sprite-template.scss', "utf-8")
				}
			}
	))
	.pipe(gulp.dest('app/'));
});

gulp.task('svgSprite', ['svgSpriteBuild', 'svgSpriteSass']);

gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// ----------------------Дефолтный таск gulp --------------------------------

gulp.task('default', ['watch']);