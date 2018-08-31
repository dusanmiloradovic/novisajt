#!/bin/bash

for f in *.jpg; do mv "$f" "${f// /-}"; done

for f in {1024,700,500,320,640}; do for g in {70,50,60,40}; do mkdir -p $f/$g; done; done

mkdir -p thumb/out

for f in {1024,700,500,320,640,thumb}; do for g in *.jpg; do cp $g $f; done; done

echo "Krecem convert"

for f in {1024,700,500}
do
    {
    cd $f
    for g in *.jpg
    do
	convert $g -strip -resize x$f $g
    done
    cd ..
    }
done

echo "krecem 320 i 640"

for f in {320,640}
do
    {
    cd $f
    for g in *.jpg
    do
	convert $g -strip -resize "$f"x $g
    done
    cd ..
    }
done

echo "Krecem cjpeg"

for f in {1024,700,500,640,320}
do
    {
	cd $f
	for g in {70,60,50,40}
	do
	    {
		for h in *.jpg
		do
		    cjpeg -quality $g $h > $g/$h
		done
	    }
	done
	cd ..
    }
done

cd thumb

echo "pravim thumbove"

for f in *.jpg;do convert $f -strip -resize 150x $f; cjpeg -quality 30 $f > out/$f;done

cd ..

rm 1024/*.jpg 700/*.jpg 500/*.jpg 640/*.jpg 320/*.jpg thumb/*.jpg


