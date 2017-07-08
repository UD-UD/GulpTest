var gulp = require('gulp'),
    gutil=require('gulp-util'),
    coffee=require('gulp-coffee'),
    concat=require('gulp-concat');

var jsSources=[
    'components/scripts/rclick.js',
    'components/scripts/pixgrid.js',
    'components/scripts/tagline.js',
    'components/scripts/template.js',
];

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
    .pipe(gulp.dest('builds/development/js'));
});