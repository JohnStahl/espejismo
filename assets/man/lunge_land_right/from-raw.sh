#!/usr/bin/env bash
cd "$(dirname "$0")"

files=( `printf "%s\n" ../raw/lunge_landing/*.png | sort` )
i=1
for f in "${files[@]}"
do
  cp "$f" "$(printf "%04d.png" $i)"
  let i++
done
