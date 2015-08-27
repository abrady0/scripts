#!/bin/zsh
set -e
if [[ $# -ne 1 ]]; then
  echo "usage $0 docx_to_import (run in directory where docx to be unzipped into)"
  exit 1;
fi

docxInPath=$(realpath $1)
docxFn=$(basename $1)
dirName=$(basename $1 .docx)
echo 'docxInPath' $docxInPath 'source file: ' $docxFn ' dest dir ./' $dirName

rm -rf $dirName
mkdir $dirName
cd $dirName
cp $docxInPath .
unzip $docxFn
rm $docxFn
cd word
xmllint --format document.xml | sponge document.xml