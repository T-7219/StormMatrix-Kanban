# StormMatrix Kanban

<div align="center">
  <img src="https://via.placeholder.com/200x200?text=StormMatrix" alt="StormMatrix Логотип" width="200" height="200">
  <h3>Профессиональная система Kanban-досок</h3>
  <p>Современное, полнофункциональное Kanban-приложение, построенное на микросервисной архитектуре для обеспечения масштабируемости, отказоустойчивости и гибкости.</p>

  <a href="https://github.com/T-7219/StormMatrix-Kanban/releases/latest"><img src="https://img.shields.io/github/v/release/T-7219/StormMatrix-Kanban?include_prereleases&style=flat-square" alt="Последний релиз"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/blob/main/LICENSE"><img src="https://img.shields.io/github/license/T-7219/StormMatrix-Kanban?style=flat-square" alt="Лицензия"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/stargazers"><img src="https://img.shields.io/github/stars/T-7219/StormMatrix-Kanban?style=flat-square" alt="Звезды"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/issues"><img src="https://img.shields.io/github/issues/T-7219/StormMatrix-Kanban?style=flat-square" alt="Проблемы"></a>
  <a href="https://github.com/T-7219/StormMatrix-Kanban/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/T-7219/StormMatrix-Kanban/ci.yml?branch=main&label=тесты&style=flat-square" alt="Тесты"></a>

  [English](README.md) | [Русский](README.ru.md) | [Deutsch](README.de.md)
</div>

## ✨ Возможности

- **📋 Интуитивный интерфейс Kanban-доски**: Перетаскивание карточек, настраиваемые колонки и обновления в реальном времени
- **🌐 Многоязычная поддержка**: Доступно на английском, немецком и русском языках
- **🔒 Аутентификация пользователей**: Безопасный вход с опциональной двухфакторной аутентификацией
- **👥 Командное взаимодействие**: Совместное использование досок, назначение задач и комментирование карточек
- **🔄 Настраиваемые рабочие процессы**: Определение собственных колонок и этапов рабочего процесса
- **📎 Вложения файлов**: Загрузка и прикрепление файлов к карточкам
- **📊 Отслеживание активности**: Контроль за всеми изменениями и обновлениями
- **🔔 Уведомления**: Получение уведомлений о назначенных задачах и приближающихся сроках
- **🔍 Фильтрация и поиск**: Быстрый поиск задач с помощью мощных параметров фильтрации
- **👤 Личные и командные доски**: Разделение личных задач и командных проектов
- **📱 Адаптивный дизайн**: Работает на компьютерах, планшетах и мобильных устройствах
- **🌙 Темный режим**: Снижение нагрузки на глаза благодаря темной теме

## 🏗️ Архитектура

StormMatrix Kanban построен на микросервисной архитектуре со следующими компонентами:

- **Фронтенд**: React.js с TypeScript и Material-UI
- **API Gateway**: Nginx для маршрутизации и балансировки нагрузки
- **Микросервисы**:
  - **Auth Service**: Аутентификация и авторизация пользователей
  - **User Service**: Управление профилями пользователей
  - **Board Service**: Управление досками и карточками
  - **Notification Service**: Уведомления в приложении и по электронной почте
  - **File Service**: Загрузка и хранение файлов
- **Базы данных**:
  - PostgreSQL для постоянного хранения данных
  - Redis для кэширования и управления сессиями
- **Очередь сообщений**: RabbitMQ для асинхронной коммуникации между сервисами
- **Мониторинг**: Prometheus и Grafana для метрик и мониторинга
- **Логирование**: ELK Stack (Elasticsearch, Logstash, Kibana) для централизованного логирования

## 🚀 Начало работы

### Требования

- Docker и Docker Compose
- Node.js 18+ (для локальной разработки)
- Git

### Установка

1. Клонируйте репозиторий:
```bash
git clone https://github.com/T-7219/StormMatrix-Kanban.git
cd stormmatrix-kanban
```

2. Настройте переменные окружения:
```bash
cp .env.example .env
```
Отредактируйте файл `.env` для настройки вашей конфигурации.

3. Запустите приложение используя Docker Compose:
```bash
docker-compose up -d
```

4. Доступ к приложению:
- Фронтенд: http://localhost:3000
- API: http://localhost:80/api
- Документация API: http://localhost:80/api/docs

### Первоначальная настройка

При первом запуске приложения автоматически создается учетная запись администратора с учетными данными, указанными в вашем файле `.env`. По умолчанию используются следующие данные:

- Email: admin@example.com
- Пароль: admin

Обязательно измените эти учетные данные сразу после первого входа в систему.

## 💻 Разработка

### Запуск сервисов по отдельности

Для разработки вы можете запускать сервисы по отдельности:

```bash
# Фронтенд
cd frontend
npm install
npm start

# Auth Service
cd backend/auth-service
npm install
npm run start:dev

# Board Service
cd backend/board-service
npm install
npm run start:dev

# И так далее для других сервисов...
```

### Запуск тестов

```bash
# Запуск тестов для всех сервисов
npm test

# Запуск тестов для конкретного сервиса
cd backend/auth-service
npm test
```

## 📚 Документация

Подробная документация доступна в папке `docs`:

- [Руководство пользователя](docs/user-guide.md): Инструкции для конечных пользователей
- [Руководство администратора](docs/admin-guide.md): Инструкции для администраторов
- [Документация по API](docs/api.md): Справочник по API
- [Руководство разработчика](docs/development.md): Руководство для разработчиков
- [Архитектура](docs/architecture.md): Подробная архитектура системы

## 🤝 Вклад в проект

Мы приветствуем вклад в StormMatrix Kanban! Пожалуйста, ознакомьтесь с нашим [Руководством по участию](CONTRIBUTING.md) для получения подробной информации.

## 📦 Развертывание

Для производственного развертывания мы рекомендуем использовать Kubernetes. Конфигурационные файлы для развертывания в Kubernetes доступны в директории `k8s`.

## 📄 Лицензия

Этот проект лицензирован под лицензией MIT - подробности см. в файле [LICENSE](LICENSE).

## 👏 Благодарности

- Благодарим всех участников, которые помогли создать этот проект
- Особая благодарность сообществу открытого исходного кода за создание удивительных инструментов, которые сделали это возможным

## 📞 Контакты и поддержка

- Создайте [issue](https://github.com/T-7219/StormMatrix-Kanban/issues) для отчетов об ошибках или запросов функций
- Свяжитесь с командой по адресу support@stormmatrix.com

---

<div align="center">
  Сделано с ❤️ командой StormMatrix
</div>