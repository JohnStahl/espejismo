#!/usr/bin/env bash

cd "$(dirname "$0")"

calc-width() {
  identify -format '%[fx:round(w/1920*1024)]' "$1"
}

resize() {
  convert "$1" -resize "$2" "../web/assets/images/$3"
}

resize-flop() {
  convert "$1" -flop -resize "$2" "../web/assets/images/$3"
}

convert-width() {
  resize "$1" "$(calc-width "$1")" "$2"
}

resize objects/raw/bridge/left_brokenBridge.png 745 bridge_left.png
resize objects/raw/bridge/right_brokenBridge.png 650 bridge_right.png
resize objects/raw/bridge/left_bank.png x576 bank_left.png
resize objects/raw/bridge/right_bank.png  x576 bank_right.png
resize objects/raw/ground.png 1024 ground.png

convert raw/images/speech_bubble.png -resize 200 ../web/assets/images/speech_bubble.png
convert raw/images/heart.png -resize 30 ../web/assets/images/heart.png
resize objects/raw/house/house.png x576 house.png
resize objects/raw/house/house_path.png 1024 house_path.png
resize objects/raw/starSkyBlur.png 1024 night_background.png
resize objects/raw/house/house_upper_path.png 800 house_upper_path.png
resize objects/raw/house/lamppost.png 300 lamppost.png
resize-flop daughter/raw/daughter.png x175 daughter.png

resize objects/raw/forest/log.png 500 log.png
resize objects/raw/forest/deadTree.png x400 dead_tree.png
resize objects/raw/forest/ground.png 1024 forest_ground.png
resize objects/raw/forest/forestDistantBkgrnd.png x576 forest_background.png
resize objects/raw/forest/forestMidground.png x576 forest_midground.png

resize objects/raw/cornfield/cornFieldFar.png 1024 cornfield_background.png
resize objects/raw/cornfield/cornFieldMid.png 1024 cornfield_midground.png
resize objects/raw/cornfield/cornStalk.png x300 corn_stalk.png
resize objects/raw/cornfield/ground.png 1024 cornfield_ground.png
resize objects/raw/cornfield/scarecrowPost.png x300 scarecrow_post.png
resize scarecrow/raw/awaken/scarecrow_awaken.0000.png x250 scarecrow.png

resize objects/raw/arrows/arrowUp.png 32 arrow_up.png
resize objects/raw/arrows/arrowDown.png 32 arrow_down.png
resize objects/raw/arrows/arrowLeft.png 32 arrow_left.png
resize objects/raw/arrows/arrowRight.png 32 arrow_right.png

ffmpeg -y -t 19 -i audio/'Maria-Luiza Original.wav' -acodec libmp3lame ../web/assets/audio/song.mp3
ffmpeg -y -t 19 -i audio/'Maria-Luiza Altered.wav' -acodec libmp3lame ../web/assets/audio/songAltered.mp3
