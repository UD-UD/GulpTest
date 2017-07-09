var gulp = require('gulp'),
    gutil=require('gulp-util'),
    coffee=require('gulp-coffee'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    concat=require('gulp-concat'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify');

var env,jsSources,sassSources,coffeeSources,htmlSources,jsonSources,outputDir;

env = process.env.NODE_ENV || 'production';

if(env === "development"){
    outputDir = 'builds/development';
}else{
    outputDir = 'builds/production';
}
    

jsSources=[
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
];

sassSources =['components/sass/style.scss'];

coffeeSources = ['components/coffee/tagline.coffee'];

htmlSources = [outputDir + '/*.html'];
jsonSources = [outputDir + '/js/*.json'];


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
    .pipe(gulpif(env === 'production',uglify()))
    .pipe(gulp.dest(outputDir + '/js'))
    .pipe(connect.reload());
});

gulp.task('sassCompile',function(){
    gulp.src(sassSources)
    .pipe(compass({
        sass :'components/sass',
        image:outputDir + '/images',
        style : 'expanded'
    }))
        .on('error',gutil.log)
    .pipe(gulp.dest(outputDir + '/css'))
    .pipe(connect.reload());;
});

gulp.task('default',['coffee','ja','sassCompile','server','html','json','watch']);

gulp.task('watch', function() {
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(jsSources, ['ja']);
  gulp.watch('components/sass/*.scss', ['compass']);
  gulp.watch(htmlSources, ['html']);
  gulp.watch(jsonSources, ['json']);
});

gulp.task('server',function(){
    connect.server({
        root : outputDir,
        livereload : true
    });
});

gulp.task('html', function() {
  gulp.src(htmlSources)
    .pipe(connect.reload())
});

gulp.task('json', function() {
  gulp.src(jsonSources)
    .pipe(connect.reload())
});
