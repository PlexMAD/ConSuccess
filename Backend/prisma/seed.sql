DO $$
DECLARE
  admin_id INT;
  demo_id INT;
  teacher_id INT;
  moscow_id INT;
  spb_id INT;
  mospoly_id INT;
  hse_id INT;
  spbgu_id INT;
  programming_id INT;
  databases_id INT;
  calculus_id INT;
  web_id INT;
  ml_id INT;
BEGIN
  INSERT INTO users (username, password_hash, role)
  VALUES ('admin', '$2b$10$OA47QBwM4I8cnCItVVGWdufk95lRUX9l0QfCpJMg2dA8S6ID.rV/O', 'ADMIN')
  ON CONFLICT (username) DO UPDATE
  SET password_hash = EXCLUDED.password_hash,
      role = 'ADMIN'
  RETURNING id INTO admin_id;

  INSERT INTO users (username, password_hash, role)
  VALUES ('student', '$2b$10$OA47QBwM4I8cnCItVVGWdufk95lRUX9l0QfCpJMg2dA8S6ID.rV/O', 'USER')
  ON CONFLICT (username) DO UPDATE
  SET password_hash = EXCLUDED.password_hash
  RETURNING id INTO demo_id;

  INSERT INTO users (username, password_hash, role)
  VALUES ('teacher', '$2b$10$OA47QBwM4I8cnCItVVGWdufk95lRUX9l0QfCpJMg2dA8S6ID.rV/O', 'TEACHER')
  ON CONFLICT (username) DO UPDATE
  SET password_hash = EXCLUDED.password_hash,
      role = 'TEACHER'
  RETURNING id INTO teacher_id;

  INSERT INTO "City" (name)
  VALUES ('Москва'), ('Санкт-Петербург')
  ON CONFLICT (name) DO NOTHING;

  SELECT id INTO moscow_id FROM "City" WHERE name = 'Москва';
  SELECT id INTO spb_id FROM "City" WHERE name = 'Санкт-Петербург';

  INSERT INTO "University" (name, city_id)
  SELECT 'Московский Политех', moscow_id
  WHERE NOT EXISTS (SELECT 1 FROM "University" WHERE name = 'Московский Политех');

  INSERT INTO "University" (name, city_id)
  SELECT 'НИУ ВШЭ', moscow_id
  WHERE NOT EXISTS (SELECT 1 FROM "University" WHERE name = 'НИУ ВШЭ');

  INSERT INTO "University" (name, city_id)
  SELECT 'СПбГУ', spb_id
  WHERE NOT EXISTS (SELECT 1 FROM "University" WHERE name = 'СПбГУ');

  SELECT id INTO mospoly_id FROM "University" WHERE name = 'Московский Политех' LIMIT 1;
  SELECT id INTO hse_id FROM "University" WHERE name = 'НИУ ВШЭ' LIMIT 1;
  SELECT id INTO spbgu_id FROM "University" WHERE name = 'СПбГУ' LIMIT 1;

  INSERT INTO subjects (name, university_id)
  SELECT 'Программирование', mospoly_id
  WHERE NOT EXISTS (
    SELECT 1 FROM subjects WHERE name = 'Программирование' AND university_id = mospoly_id
  )
  RETURNING id INTO programming_id;
  IF programming_id IS NULL THEN
    SELECT id INTO programming_id FROM subjects WHERE name = 'Программирование' AND university_id = mospoly_id LIMIT 1;
  END IF;

  INSERT INTO subjects (name, university_id)
  SELECT 'Базы данных', mospoly_id
  WHERE NOT EXISTS (
    SELECT 1 FROM subjects WHERE name = 'Базы данных' AND university_id = mospoly_id
  )
  RETURNING id INTO databases_id;
  IF databases_id IS NULL THEN
    SELECT id INTO databases_id FROM subjects WHERE name = 'Базы данных' AND university_id = mospoly_id LIMIT 1;
  END IF;

  INSERT INTO subjects (name, university_id)
  SELECT 'Математический анализ', hse_id
  WHERE NOT EXISTS (
    SELECT 1 FROM subjects WHERE name = 'Математический анализ' AND university_id = hse_id
  )
  RETURNING id INTO calculus_id;
  IF calculus_id IS NULL THEN
    SELECT id INTO calculus_id FROM subjects WHERE name = 'Математический анализ' AND university_id = hse_id LIMIT 1;
  END IF;

  INSERT INTO subjects (name, university_id)
  SELECT 'Веб-разработка', spbgu_id
  WHERE NOT EXISTS (
    SELECT 1 FROM subjects WHERE name = 'Веб-разработка' AND university_id = spbgu_id
  )
  RETURNING id INTO web_id;
  IF web_id IS NULL THEN
    SELECT id INTO web_id FROM subjects WHERE name = 'Веб-разработка' AND university_id = spbgu_id LIMIT 1;
  END IF;

  INSERT INTO subjects (name, university_id)
  SELECT 'Машинное обучение', spbgu_id
  WHERE NOT EXISTS (
    SELECT 1 FROM subjects WHERE name = 'Машинное обучение' AND university_id = spbgu_id
  )
  RETURNING id INTO ml_id;
  IF ml_id IS NULL THEN
    SELECT id INTO ml_id FROM subjects WHERE name = 'Машинное обучение' AND university_id = spbgu_id LIMIT 1;
  END IF;

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT demo_id, programming_id, 'Как готовиться к лабораторным по программированию',
    'Лучше вести небольшой репозиторий с решениями, фиксировать типовые ошибки и заранее проверять ввод/вывод на крайних случаях. Перед защитой полезно уметь объяснить сложность алгоритма и почему выбранная структура данных подходит задаче.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Как готовиться к лабораторным по программированию');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT demo_id, programming_id, 'Шпаргалка по TypeScript для проекта',
    'Начните с интерфейсов для DTO, не используйте any без необходимости, выносите повторяющиеся типы в shared/types и проверяйте nullable-поля перед рендером. Это экономит много времени при работе с формами и API.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Шпаргалка по TypeScript для проекта');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT teacher_id, programming_id, 'Материал преподавателя: как оформлять лабораторные',
    'В отчете важно фиксировать цель работы, кратко описывать алгоритм, прикладывать ключевые фрагменты кода и отдельно показывать результаты тестирования. Чем прозрачнее ход решения, тем проще защита.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Материал преподавателя: как оформлять лабораторные');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT admin_id, databases_id, 'Нормализация базы данных простыми словами',
    'Первая нормальная форма убирает повторяющиеся группы, вторая отделяет зависимость от части составного ключа, третья убирает транзитивные зависимости. На практике важно не только нормализовать, но и понимать, где денормализация ускорит чтение.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Нормализация базы данных простыми словами');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT demo_id, calculus_id, 'Пределы: что спрашивают на зачете',
    'Часто просят раскрывать неопределенности, пользоваться эквивалентными бесконечно малыми и объяснять смысл предела через поведение функции около точки. Хорошая тренировка - решать примеры разными способами.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Пределы: что спрашивают на зачете');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT admin_id, web_id, 'REST API: минимальный набор правил',
    'Используйте понятные ресурсы, корректные HTTP-методы, статусы ошибок и единый формат ответа. Для защищенных действий проверяйте Bearer-токен на backend, а на frontend проксируйте запросы через route handlers.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'REST API: минимальный набор правил');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT demo_id, ml_id, 'Как не потеряться в машинном обучении',
    'Сначала разберитесь с train/test split, метриками и переобучением. Затем переходите к линейным моделям, деревьям решений и только после этого к нейросетям. Базовая статистика здесь важнее модных библиотек.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Как не потеряться в машинном обучении');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT admin_id, NULL, 'Добро пожаловать в раздел знаний',
    'Здесь можно публиковать материалы, которые не привязаны к конкретному предмету: подборки, советы по учебе, заметки по инструментам и общие инструкции для студентов.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Добро пожаловать в раздел знаний');

  INSERT INTO posts (user_id, subject_id, title, body, visible, is_private, updated_at)
  SELECT demo_id, NULL, 'Полезные привычки для учебного проекта',
    'Делайте маленькие коммиты, проверяйте сборку перед отправкой, храните переменные окружения отдельно и описывайте команды запуска в README. Эти привычки спасают команду перед дедлайном.',
    true, false, NOW()
  WHERE NOT EXISTS (SELECT 1 FROM posts WHERE title = 'Полезные привычки для учебного проекта');
END $$;
