#!/bin/sh

replace_var() {
    var_name=$1
    placeholder=$2
    value=$(printenv "$var_name")

    if [ -z "$value" ]; then
        # Если переменная не задана → null (без кавычек)
        replacement=null
    else
        # Экранируем кавычки и спецсимволы, оборачиваем значение в кавычки
        replacement="\"$(echo "$value" | sed 's/"/\\"/g')\""
    fi

    # Заменяем плейсхолдер в файле
    sed -i "s/\"__${placeholder}__\"/${replacement}/g" /usr/share/nginx/html/env-config.js
}

# Обрабатываем переменные
replace_var "API_PORT" "API_PORT"
replace_var "API_PROTOCOL" "API_PROTOCOL"
replace_var "API_HOST" "API_HOST"

exec "$@"