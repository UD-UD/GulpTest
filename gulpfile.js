var gulp = require('gulp'),
    gutil=require('gulp-util'),
    coffee=require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat=require('gulp-concat'),
    connect = require('gulp-connect');

var jsSources=[
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
];

var sassSources =['components/sass/style.scss'];

var coffeeSources = ['components/coffee/tagline.coffee'];

gulp.task('log',function(){
    gutil.log('Ujjal Dutta is awesome ');
});

gulp.task('coffee',function(){
    gulp.src('components/coffee/tagline.coffee')
        .pipe(coffee({bare : true})
            .on('error',gutil.log))
        .pipe(gulp.dest('components/scripts'))
});

gulp.task('ja',function(){
    gulp.src(jsSources)
    .pipe(concat('scripts.js'))
    .pipe(browserify())
    .pipe(gulp.dest('builds/development/js'))
    .pipe(connect.reload());
});

gulp.task('sassCompile',function(){
    gulp.src(sassSources)
    .pipe(compass({
        sass :'components/sass',
        image:'builds/development/images',
        style : 'expanded'
    }))
        .on('error',gutil.log)
    .pipe(gulp.dest('builds/development/css'))
    .pipe(connect.reload());;
});

gulp.task('default',['coffee','ja','sassCompile','server','watch']);

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['ja']);
  gulp.watch('components/sass/*.scss', ['compass']);
});

gulp.task('server',function(){
    connect.server({
        root : 'builds/development',
        livereload : true
    });
});