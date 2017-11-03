#Шаблонный проект для React
##Фитчи:
> Серверный рендеринг

> Возможность использовать миксины stylus без прямого подключения внутри проекта 
> (см [/theme/core](./src/theme/core) и [pages/sign-in/sign-in-form.styl](./src/pages/sign-in/sign-in-form.styl))

> 2 точки входа mobile-entry.js и desktop-entry.js

> Возможность сокращать пути до файлов.
> Напр. вместо ../../helpers/async-component будет helpers/async-component.
> Реализовано через babel-plugin-module-resolver. Т.е. все что лежит внутри папки src можно импортить так
> import <название папки>/<название файла>

> Split code [ссылка на доку](https://webpack.js.org/guides/code-splitting/).

##Рекомендации
> В Idea отметьте директорию src как Resource Root. Это нужно для того, чтобы у 
> вас правильно подсвечивался import в файлах.

> Используйте chrome extensions:
>
> Redux DevTools.
> [Для Хрома](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
>
> React Developer Tools.
> [Для Хрома](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

####[Инструкция по разворачиванию](./doc/deployment.md)
####[Описание stylus темы](./doc/theme.md)
####[Известные проблемы](./doc/troubles.md)
