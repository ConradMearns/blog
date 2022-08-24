https://twemoji.twitter.com/
1f40c.svg

npm i -g pwa-asset-generator

touch ADD_TO_INDEX.html
pwa-asset-generator ./node_modules/twemoji-emojis/vendor/svg/1f40c.svg ./public/icons -m ./public/manifest.json -f -o false -i ADD_TO_INDEX.html