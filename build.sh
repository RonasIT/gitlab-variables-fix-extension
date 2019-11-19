#!/usr/bin/env bash

# PROJECT BUILD SCRIPT
set -e
red=`tput setaf 1`
green=`tput setaf 2`
blue=`tput setaf 4`
reset=`tput sgr0`

# config
root=`pwd`
project_dir=$root/src
build_dir=$root/dist

# gets the js dependencies
function dependencies() {
    npm install
}

# building project

echo '-----';
echo "${blue}Building dist:${reset}";
dependencies $1;
rm -Rf $build_dir && mkdir $build_dir;

# coping all files
cp -R $project_dir/styles $build_dir/styles
mkdir $build_dir/js
cp $project_dir/popup.html $build_dir/
cp $project_dir/manifest.json $build_dir/

# minify custom js
node_modules/gulp/bin/gulp.js uglify

echo "${green}All done ${reset}";
echo '-----';
exit;