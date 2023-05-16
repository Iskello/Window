'use strict';

//Імпортуємо пакети для збірки
const gulp = require('gulp');
const webpack = require('webpack-stream');
const browsersync = require('browser-sync');

//Змінна зі щляхом для компіляції
const dist = './dist/';

//Задачі для зборки проекту

//Відслідковування змін для html файлу (беремо файл з src, переміщуємо в dist, запускаємо browsersync для перезавантаження сторінки )
gulp.task('copy-html', () => {
	return gulp.src('./src/index.html')
		.pipe(gulp.dest(dist))
		.pipe(browsersync.stream());
});

//Компіляція скриптів: на файлі main.js запускаємо webpack, після чого виводимо код в script.js. Також створюємо карту проекту, і підключаємо babel/preset-env і налаштовуємо corejs для поліфілів. Після всіх операцій файл переміщуємо в dist, запускаємо browsersync для перезавантаження сторінки)
gulp.task('build-js', () => {
	return gulp.src('./src/js/main.js')
		.pipe(webpack({
			mode: 'development',
			output: {
				filename: 'script.js'
			},
			watch: false,
			devtool: 'source-map',
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', {
									debug: true,
									corejs: 3,
									useBuiltIns: 'usage'
								}]]
							}
						}
					}
				]
			}
		}))
		.pipe(gulp.dest(dist))
		.on('end', browsersync.reload);
});

//Відслідковування любих змін в папці assets (картинки, шрифт, css-стилі)
gulp.task('copy-assets', () => {
	return gulp.src('./src/assets/**/*.*')
		.pipe(gulp.dest(dist + '/assets'))
		.on('end', browsersync.reload);
});

//Запускається сервер з папки dist, який працює від browsersync. Також gulp слідкує за зміною кода в папці src і запускає попередні технічні завдання відповідно
gulp.task('watch', () => {
	browsersync.init({
		server: './dist/',
		port: 4000,
		notify: true
	});
    
	gulp.watch('./src/index.html', gulp.parallel('copy-html'));
	gulp.watch('./src/assets/**/*.*', gulp.parallel('copy-assets'));
	gulp.watch('./src/js/**/*.js', gulp.parallel('build-js'));
});

//Паралельно запускає всі три технічні задачі при першому запуску gulp
gulp.task('build', gulp.parallel('copy-html', 'copy-assets', 'build-js'));

//Чистова компіляція скриптів
gulp.task('build-prod-js', () => {
	return gulp.src('./src/js/main.js')
		.pipe(webpack({
			mode: 'production',
			output: {
				filename: 'script.js'
			},
			module: {
				rules: [
					{
						test: /\.m?js$/,
						exclude: /(node_modules|bower_components)/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [['@babel/preset-env', {
									corejs: 3,
									useBuiltIns: 'usage'
								}]]
							}
						}
					}
				]
			}
		}))
		.pipe(gulp.dest(dist));
});

//Задача, що запускається за замовчуванням: запускається паралельно сервер та 3 технічні задачі з компіляції коду
gulp.task('default', gulp.parallel('watch', 'build'));