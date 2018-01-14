var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    //watch = require('gulp-watch'),

	////Minify JavaScript
    uglify = require('gulp-uglify'),

	////Compile scss
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),

	/////Take all template
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),

    cssnano = require('gulp-cssnano'),

	/////Compile pug files
    pug = require('gulp-pug'),

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
	filter    = require('gulp-filter'),
	svg2png   = require('gulp-svg2png'),
    svgmin = require('gulp-svgmin'),
    cheerio = require('gulp-cheerio'),
    replace = require('gulp-replace'),
    fs = require('fs'),

	////Generate png sprite
    spritesmith = require('gulp.spritesmith'),
	merge = require('merge-stream'),
    buffer = require('vinyl-buffer')


var buildFolder = 'build',
	srcFolder = 'src',
	path = {
		build: { //Where gulp must build project
			html: buildFolder +'/',
			js: buildFolder +'/js/',
			css: buildFolder +'/css/',
			img: buildFolder +'/images/**/*.*',
			fonts: buildFolder +'/fonts/'
		},
		src: { //From where gulp must take sources
			pugFiles: srcFolder +'/*.pug',
			js: srcFolder +'/js/*.js',
			style: srcFolder +'/scss/',
			img: [
				srcFolder +'/images/**/*',
				!srcFolder +'/images/icons'
			],
			icons: srcFolder +'/images/icons/',
			// iconsPng: srcFolder +'/images/icons/iconsPng/*',
			fonts: srcFolder +'/fonts/**/*.*'
		},
		watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
            pugFiles: srcFolder +'/**/*.pug',
			js: srcFolder +'/js/**/*.js',
			style: srcFolder +'/scss/**/*.scss',
			img: srcFolder +'/images/**/*.*',
			//fonts: srcFolder +'/fonts/**/*.*'
		},
		clean: './' + buildFolder
	};

var ServerConfig = {
    server: {
        baseDir:'./' + buildFolder
    },
    // tunnel: true,
    host: 'localhost',
    port: 3000
};


gulp.task('html:build', function buildHTML() {
    return gulp.src(path.src.pugFiles)
        .pipe(pug({
            pretty:true,
            filename: true
        }))
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
	.pipe(gulp.dest(srcFolder + '/js'));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
	.pipe(uglify()) //Optimize over js files
	.pipe(gulp.dest(path.build.js))
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('style:build', function () {
    gulp.src(path.src.style + 'main.scss') //Выберем наш main.scss
	.pipe(sourcemaps.init()) //То же самое что и с js
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: false }))
	.pipe(cssmin()) //Сожмем
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.css)) //И в build
	.pipe(browserSync.reload({stream: true}))
});

gulp.task('libsCss:build', function () {
    gulp.src(path.src.style + '/libs.scss')
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(cssnano())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(buildFolder + '/css'));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
	.pipe(gulp.dest(path.build.fonts))
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.build.img)) //И бросим в build
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('build', [
    'html:build',
    'libsJs:build',
    'js:build',
    'style:build',
    'libsCss:build',
    'fonts:build',
    'image:build'
]);

// gulp.task('sprite', function () {
//     // Generate our spritesheet
//     var spriteData = gulp.src('app/images/icons/*.png').pipe(spritesmith({
//         imgName: 'sprite.png',
//         cssName: '_sprite.scss'
//     }));
//
//     // Pipe image stream through image optimizer and onto disk
//     var imgStream = spriteData.img
//     // DEV: We must buffer our stream into a Buffer for `imagemin`
//         .pipe(buffer())
//         .pipe(imagemin())
//         .pipe(gulp.dest('app/images/sprites/'));
//
//     // Pipe CSS stream through CSS optimizer and onto disk
//     var cssStream = spriteData.css
//         //.pipe(csso())
//         .pipe(gulp.dest('app/scss/'));
//
//     // Return a merged stream to handle both `end` events
//     return merge(imgStream, cssStream);
// });

gulp.task('svgSpriteBuild', function () {
	return gulp.src(path.src.icons + '/iconsSvg/*')
		// .pipe(svgmin({
		// 	js2svg: {
		// 		pretty: true
		// 	}
		// }))
		//remove all fill and style declarations in out shapes
		// .pipe(cheerio({
		// 	run: function ($) {
		// 		$('[fill]').removeAttr('fill');
		// 		$('[style]').removeAttr('style');
		// 	},
		// 	parserOptions: { xmlMode: true }
		// }))
		// cheerio plugin create unnecessary string '>', so replace it.
		//.pipe(replace('&gt;', '>'))
		// build svg sprite
		.pipe(svgSprite({
            cssFile: '_spriteSvg.scss',
            preview: false,
            svg: {
                sprite: "../../images/sprites/spriteSvg.svg"
            },
            svgPath: '../../images/sprites/spriteSvg.svg',
            pngPath: '../../images/sprites/spriteSvg.png',
            layout: "vertical",
            padding: 10,
            templates: { scss: true },
            // templates: {
            //     css: fs.readFileSync( ''+path.src.style +'sprites/_sprite-template.scss', "utf-8")
            // }
				//mode: "symbols",
				//preview: false,
				//selector: "icon-%f",
				//layout: "vertical",
				// svg: {
				// 	symbols: 'symbol_sprite.html'
				// }
		}))
		.pipe(gulp.dest(path.src.style + '/sprites/')) // Write the sprite-sheet + CSS + Preview
		.pipe(filter(path.src.img + '/icons/iconsSvg/*'))  // Filter out everything except the SVG file
		.pipe(svg2png())           // Create a PNG
		.pipe(gulp.dest(path.src.img + '/sprites/'))
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

// gulp.task('watch', function(){
//     watch([path.watch.html], function(event, cb) {
//         gulp.start('html:build')
// 		//.pipe(browserSync.reload({stream: true}))
//     });
//     watch([path.watch.style], function(event, cb) {
//         gulp.start('style:build')
// 		//.pipe(browserSync.reload({stream: true}))
//     });
//     // watch([path.watch.js], function(event, cb) {
//     //     gulp.start('libsJs:build');
//     // });
//     watch([path.watch.js], function(event, cb) {
//         gulp.start('js:build')
//         //.pipe(browserSync.reload({stream: true}))
//     });
//     watch([path.watch.img], function(event, cb) {
//         gulp.start('image:build')
// 		//.pipe(browserSync.reload({stream: true}))
//     });
//     watch([path.watch.fonts], function(event, cb) {
//         gulp.start('fonts:build')
// 		//.pipe(browserSync.reload({stream: true}))
//     });
// });

gulp.task('watch', function() {
    gulp.watch(path.watch.pugFiles, ['html:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['image:build']);
});

gulp.task('webserver', function () {
    browserSync(ServerConfig);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

// gulp.task('watch', ['browser-sync', 'css-libs', 'scripts'], function() {
//     gulp.watch('app/scss/**/*.scss', ['sass']);
//     gulp.watch('app/*.html', browserSync.reload);
//     gulp.watch('app/js/**/*.js', browserSync.reload);
// });

// ----------------------Дефолтный таск gulp --------------------------------

//gulp.task('default', ['watch']);
gulp.task('default', ['build', 'webserver', 'watch']);
gulp.task('watch-spriteSvg', ['svgSprite', 'build', 'webserver', 'watch']);
gulp.task('watch-spritePng', ['sprite', 'build', 'webserver', 'watch']);