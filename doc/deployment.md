#Как развернуть в проде

##Клиент
> Путь должен быть абсолютным. В конце обязательно должна присутствовать папка **build**.
> Для сборки выполнить команду из корневой дирректории проекта:
```
cross-env NODE_ENV=production PUBLIC_PATH=<project_folder>/build/client/build/ webpack --config ./webpack/webpack.config-prod.babel.js --progress -p
```

##Web Сервер
> выполнить команду из корневой дирректории проекта:
```
cross-env NODE_ENV=production PUBLIC_PATH=<project_folder>/build/server/ webpack --config ./webpack/webpack.config-server.babel.js --progress
```

> Пример скрипта для запуска сервера тут: [bin/prod.js](../bin/prod.js) 
```
node bin/prod.js
```

####Список переменных 
* API_URL,
* NODE_ENV = production / development,
* WEB_PORT,
* PUBLIC_PATH,
* TEMPLATE_PATH,
* STATIC_PATH
