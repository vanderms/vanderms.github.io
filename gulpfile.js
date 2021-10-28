const { src, dest, watch, series, parallel } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const cmd = require('node-cmd');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


const path = { 
  scss: 'src/scss/**/*.scss',  
  images: 'src/images/**/*.{png,jpeg,jpg}'
};


function scssTask(){  
  return (
    src([path.scss])     
      .pipe(sass())
      .pipe(postcss([autoprefixer(), cssnano({zindex: false})]))
      .pipe(concat('styles.css'))
      .pipe(dest('./'))
  );
}


async function imageTask(){  
  cmd.run('python main.py', function(err, data, stderr){
    console.log(data)
  })
}


//watchers
function watchScssPath(){
  watch([path.scss], scssTask);
}

function watchImagePath(){
  watch([path.images], imageTask);
}


exports.default = series(
  parallel(scssTask, imageTask),
  parallel(watchImagePath, watchScssPath)
);