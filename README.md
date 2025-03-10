# Разработка пользовательского интерфейса страницу панели управления, на которой отображается список созданных A/B-тестов.

## Технические требования

* Для выполнения этой задачи вам следует использовать create-react-app шаблон приложения (docs).
* Вам не разрешается использовать какие-либо внешние библиотеки, кроме node-sass, axios, classnames, react-router-dom,
  prop-types;
* Вы можете использовать prop-types библиотеку, если вы ею не пользуетесь TypeScript.
* Продемонстрируйте использование React hooks.
* Вы можете использовать css или scss по вашему выбору.

## Требования к функциональности

Приложение представляет собой страницу панели управления, на которой отображается список созданных A/B-тестов.

* Таблица заполняется данными, которые запрашиваются из файла JSON с помощью API в указанном репозитории. Вам нужно
  клонировать проект на свой локальный компьютер и запустить его.
* Когда пользователь наводит курсор на строку таблицы, она должна выделяться, как показано на макете.
* Сайты в соответствующем столбце должны отображаться без протоколов http или https и префикса www.
* Пользователь должен иметь возможность фильтровать по названию товара. Если товар существует, мы скрываем другие записи
  и показываем только те товары, которые были найдены в списке. Если записи не найдены, должно отображаться сообщение с
  соответствующим текстом и кнопкой сброса.
* Пользователь должен иметь возможность сортировать (ASC, DESC), нажимая на заголовки столбцов:
  * name, type и site должны быть отсортированы в алфавитном порядке
  * status должны быть отсортированы в:
    * ASC: Онлайн, Приостановлено, Остановленный, Черновик
    * DESC: Черновик, Остановлен, Приостановлено, Онлайн

## Дополнительные задачи

* Используя библиотеку react-router-dom, реализуйте маршрутизацию между тремя страницами: dashboard, results и finalize.
  И не забудьте загрузить необходимые данные для каждой страницы.
* Когда пользователь нажимает на кнопку Results или Finalize на странице панели управления, вы должны перенаправить его
  на URL-адреса /results/[testId] и /finalize/[testId] соответственно без перезагрузки окна браузера.

### Инструменты

frontend:

- React 18/TypeScript
- REST API/Axios
- NodeJS v20
- SCSS

### Установка и запуск

* Фронтенд:

1. Запустить сервер: `npm start`.
2. Приложение доступно по адрессу: `http://localhost:3100`.

* Фронтенд:

1. Для установки необходимо клонировать репозиторий на свой компьютер.
2. Запустить установку необходимых пакетов командой `npm i`.
3. Запустить приложение командой `npm run start`.
4. Приложение доступно по адрессу: `http://localhost:3000` либо https://pr001lab.github.io/km-dashboard.
