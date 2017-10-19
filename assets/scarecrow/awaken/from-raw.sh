#!/usr/bin/env bash
cd "$(dirname "$0")"

files=( `printf "%s\n" ../raw/awaken/*.png | sort` )
i=1
for f in "${files[@]}"
do
  convert "$f" -resize x250 "$(printf "%04d.png" $i)"
  let i++
done
