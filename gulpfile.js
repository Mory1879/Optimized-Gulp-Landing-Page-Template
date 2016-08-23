"use strict"

// Подключаем пакеты/модули
var gulp         = require('gulp'), // Подключаем Gulp
		sass         = require('gulp-sass'), //Подключаем Sass пакет,
		browserSync  = require('browser-sync'), // Подключаем Browser Sync
		concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
		uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
		cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
		rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
		del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
		cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
		autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов


// // ======================
// Создаем задачу для browserSync (Обновление без перезагрузки)
// // ======================
gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'src' // Директория для сервера - src
		},
		notify: false // Отключаем уведомления
	});
});


// // ===============================================
// Создаем задачу для SASS (сборка/сжимание/выгрузка)
// // ===============================================
gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/sass/**/*.sass') // Берем источник
		.pipe(sass({
		includePaths: require('node-bourbon').includePaths
	}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(rename({suffix: '.min', prefix : ''})) // Переименовываем файл добавляя мин
		.pipe(autoprefixer(['last 15 versions'], { cascade: true })) // Создаем префиксы
		.pipe(cssnano()) // Минифицируем CSS
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку src/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
	});


// // ===================================================
// Создаем задачу js скриптов (сборка/сжимание/выгрузка)
// // ===================================================
gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'src/libs/jquery/build/jquery.min.js', // Берем jQuery
		// сюда через заяпятую перечисляем все библиотеки
		// сюда через заяпятую перечисляем все библиотеки
		// сюда через заяпятую перечисляем все библиотеки
		// сюда через заяпятую перечисляем все библиотеки
		])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('src/js')); // Выгружаем в папку src/js
	});

// // ==========================================
// Создаем задачу для минификации css
// // ==========================================
// gulp.task('css-libs', ['sass'], function() {
//	return gulp.src('src/css/libs.css') // Выбираем файл для минификации
//		.pipe(cssnano()) // Сжимаем
//		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
//		.pipe(gulp.dest('src/css')); // Выгружаем в папку src/css
//	});

// // ==========================================
// Создаем задачу для слежения за изменениями
// // ==========================================
gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function() {
	gulp.watch('src/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
	gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('src/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

// // ===========================
// Создаем задачу для очистки
// // ===========================
gulp.task('clean', function() {
	return del.sync('build'); // Удаляем папку build перед сборкой
});

// // =================================
// Создаем задачу для финальной сборки
// // =================================
gulp.task('build', ['clean', 'sass', 'scripts'], function() {

	var buildCss = gulp.src([ // Переносим библиотеки в продакшен
		'src/css/style.css',
		'src/css/libs.min.css'
		])
	.pipe(gulp.dest('build/css'))

	var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('build/fonts'))

	var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('build/js'))

	var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('build'));

});


// // =========================
// Создаем задачу для очистки
// // =========================
gulp.task('clear', function (callback) {
	return cache.clearAll();
})


gulp.task('default', ['watch']);