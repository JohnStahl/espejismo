#!/usr/bin/env bash

cd "$(dirname "$0")"

convert raw/images/background_elements/left_brokenBridge.png -resize 745 ../web/assets/images/bridge_left.png
convert raw/images/background_elements/right_brokenBridge.png -resize 650 ../web/assets/images/bridge_right.png
convert  raw/images/background_elements/ground.png -resize 768 ../web/assets/images/ground.png
