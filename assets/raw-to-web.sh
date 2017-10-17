#!/usr/bin/env bash

cd "$(dirname "$0")"

convert raw/images/background_elements/left_brokenBridge.png -resize 745 ../web/assets/images/bridge_left.png
convert raw/images/background_elements/right_brokenBridge.png -resize 650 ../web/assets/images/bridge_right.png
convert raw/images/background_elements/left_bank.png -resize x576 ../web/assets/images/bank_left.png
convert raw/images/background_elements/right_bank.png -resize x576 ../web/assets/images/bank_right.png
convert raw/images/background_elements/ground.png -resize 1024 ../web/assets/images/ground.png
convert raw/images/speech_bubble.png -resize 200 ../web/assets/images/speech_bubble.png

ffmpeg -y -t 19 -i audio/'Maria-Luiza Original.wav' -acodec libmp3lame ../web/assets/audio/song.mp3
ffmpeg -y -t 19 -i audio/'Maria-Luiza Altered.wav' -acodec libmp3lame ../web/assets/audio/songAltered.mp3
