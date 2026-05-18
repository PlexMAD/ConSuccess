# ConSuccess

ConSuccess — full-stack платформа для отзывов, обсуждений и обмена знаниями между студентами. Пользователи могут регистрироваться, выбирать университеты и предметы, публиковать посты с вложениями, добавлять материалы в избранное и ставить лайки. Для модераторов и администраторов предусмотрены отдельные инструменты управления контентом и пользователями.

## Стек

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS v4, TanStack Query, React Hook Form, Sonner
- **Backend:** NestJS 11, TypeScript, Prisma 7, PostgreSQL, JWT, Multer
- **Инфраструктура:** Docker Compose, PostgreSQL 17, Node.js 22

## Возможности

- Регистрация и вход по JWT с хранением токена в HTTP-only cookie
- Каталог университетов и городов
- Страницы предметов внутри университетов
- Посты по предметам и отдельный раздел общих знаний
- Вложения к постам: изображения, MP4-видео и PDF
- Аватары пользователей и логотипы университетов
- Избранное, лайки, приватные посты
- Редактирование и удаление собственных постов
- Роли пользователей: `USER`, `TEACHER`, `MODERATOR`, `ADMIN`
- `TEACHER` имеет права обычного пользователя, без доступа к модерации и админке
- Пометка постов преподавателей бейджем "Материал от преподавателя"
- Модерация видимости постов и удаление контента без физического удаления из базы
- Администрирование ролей пользователей

## Быстрый запуск через Docker

Из корня проекта:

```bash
docker compose up --build
```

После запуска будут доступны:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- PostgreSQL: `localhost:5432`

Контейнер backend при старте применяет миграции Prisma, выполняет seed и запускает production-сборку.

Остановить окружение:

```bash
docker compose down
```

Остановить окружение и удалить данные PostgreSQL/uploads:

```bash
docker compose down -v
```

## Локальный запуск

### 1. Установить зависимости

```bash
cd Backend
npm install

cd ../Frontend
npm install
```

### 2. Подготовить PostgreSQL

Можно поднять только базу из Docker Compose:

```bash
docker compose up db
```

Либо использовать локальный PostgreSQL.

### 3. Создать переменные окружения

`Backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/consuccess?schema=public"
JWT_SECRET="change-this-secret"
PORT=5000
FRONTEND_ORIGIN="http://localhost:3000"
```

`Frontend/.env`:

```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
INTERNAL_API_URL="http://localhost:5000"
COOKIE_SECURE="false"
```

### 4. Подготовить Prisma

```bash
cd Backend
npx prisma generate
npx prisma migrate dev
npm run db:seed
```

### 5. Запустить приложения

Backend:

```bash
cd Backend
npm run start:dev
```

Frontend:

```bash
cd Frontend
npm run dev
```

## Команды разработки

### Backend

```bash
cd Backend
npm run start:dev      # dev-сервер на порту 5000
npm run build          # сборка TypeScript
npm run start:prod     # запуск production-сборки
npm run lint           # ESLint с автоисправлением
npm run test           # Jest
npm run test:cov       # Jest с coverage
npm run test:e2e       # e2e-тесты
npm run db:seed        # заполнение базы начальными данными
```

### Frontend

```bash
cd Frontend
npm run dev            # dev-сервер на порту 3000
npm run build          # production-сборка
npm run start          # запуск production-сборки
npm run lint           # ESLint
npm run test           # Vitest
npm run test:run       # Vitest без watch-режима
npm run test:ui        # Vitest UI
```

### Prisma

```bash
cd Backend
npx prisma migrate dev      # применить миграции в dev
npx prisma migrate deploy   # применить миграции в prod
npx prisma generate         # сгенерировать Prisma Client
npx prisma studio           # открыть Prisma Studio
```

## Структура проекта

```text
ConSuccess/
├── Backend/                 # NestJS API
│   ├── prisma/              # Prisma schema, migrations, seed.sql
│   ├── src/
│   │   ├── auth/            # login/register/me, JWT guard
│   │   ├── users/           # пользователи и роли
│   │   ├── universities/    # университеты
│   │   ├── subjects/        # предметы
│   │   ├── posts/           # посты по предметам и знаниям
│   │   ├── favorites/       # избранное
│   │   ├── likes/           # лайки
│   │   ├── admin/           # модерация и администрирование
│   │   └── main.ts          # bootstrap, CORS, uploads
│   └── uploads/             # загруженные файлы, не хранится в git
├── Frontend/                # Next.js App Router
│   ├── app/                 # страницы, layouts, route handlers
│   ├── assets/              # SVG и статические ассеты
│   ├── lib/                 # утилиты
│   └── shared/              # API-клиенты, типы, общие настройки
├── docs/                    # документация проекта
├── docker-compose.yml       # база, backend, frontend
└── AGENTS.md                # инструкции для AI-агентов
```

## Основные маршруты

- `/` — главная страница с последними постами
- `/login`, `/register` — авторизация и регистрация
- `/universities` — список университетов
- `/universities/add` — добавление университета
- `/universities/[id]` — предметы университета
- `/universities/[id]/subjects/[subjectId]` — публичные посты по предмету
- `/universities/[id]/subjects/[subjectId]/private` — приватные посты текущего пользователя по предмету
- `/universities/[id]/subjects/[subjectId]/add-post` — создание поста
- `/knowledge` — общие посты раздела знаний
- `/knowledge/add-post` — создание поста в разделе знаний
- `/admin` — панель администратора
- `/moderator/posts` — модерация постов
- `/admin/users` — управление пользователями

## API и загрузка файлов

Frontend использует route handlers в `Frontend/app/api/*` как прокси к backend. Авторизованные запросы берут JWT из cookie `access_token` и отправляют его в backend как `Authorization: Bearer <token>`.

Файлы загружаются на backend через Multer и сохраняются в `Backend/uploads/`. В базе хранится относительный путь вида `/uploads/file.ext`, а frontend отображает вложения через `NEXT_PUBLIC_API_URL`.

Для постов можно прикрепить до 5 файлов. Поддерживаются изображения, MP4-видео и PDF. В карточках постов превью выбирается из первого изображения, если оно есть, иначе используется первый прикрепленный файл. PDF открываются в новой вкладке, видео проигрывается в просмотрщике. Для аватаров пользователей и логотипов университетов принимаются только изображения.

## База данных

Основные модели Prisma:

- `User` — пользователь, роль (`USER`, `TEACHER`, `MODERATOR`, `ADMIN`), аватар, посты, избранное и лайки
- `City` — город
- `University` — университет, город, аватар, предметы
- `Subject` — предмет университета
- `Post` — публикация, приватность, видимость, автор, предмет
- `Attachment` — файлы, прикрепленные к постам
- `Favorite` — избранные посты
- `Like` — лайки постов

## Проверка перед изменениями

Перед отправкой изменений полезно выполнить:

```bash
cd Backend
npm run lint
npm run test

cd ../Frontend
npm run lint
npm run test:run
```
