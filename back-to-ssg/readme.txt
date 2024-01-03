# Вернуть в package.json в скрипты
"postinstall": "nuxt prepare",
"heroku-postbuild": "npm run generate"

# убрать из package.json 
"start": "node .output/server/index.mjs"

# положить файлы из этой папки в корень пректа

# удалить файл app.json
# удалить Procfile