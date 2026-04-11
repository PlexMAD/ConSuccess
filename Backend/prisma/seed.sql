DO $$
DECLARE
  moscow_id    INT;
  spb_id       INT;
  mgu_id       INT;
  spbgu_id     INT;
  s1 INT; s2 INT; s3 INT; s4 INT; s5 INT;
  s6 INT; s7 INT; s8 INT; s9 INT; s10 INT;
  uid INT;
BEGIN
  SELECT id INTO uid FROM users WHERE username = 'plex';

  DELETE FROM "University" WHERE name IN ('МГУ им. Ломоносова', 'СПбГУ');

  INSERT INTO "City" (name) VALUES ('Москва')           ON CONFLICT (name) DO NOTHING;
  INSERT INTO "City" (name) VALUES ('Санкт-Петербург')  ON CONFLICT (name) DO NOTHING;
  SELECT id INTO moscow_id FROM "City" WHERE name = 'Москва';
  SELECT id INTO spb_id    FROM "City" WHERE name = 'Санкт-Петербург';

  INSERT INTO "University" (name, city_id) VALUES ('МГУ им. Ломоносова', moscow_id) RETURNING id INTO mgu_id;
  INSERT INTO "University" (name, city_id) VALUES ('СПбГУ', spb_id)                 RETURNING id INTO spbgu_id;

  -- Subjects МГУ
  INSERT INTO subjects (name, university_id) VALUES ('Математический анализ',          mgu_id) RETURNING id INTO s1;
  INSERT INTO subjects (name, university_id) VALUES ('Программирование на Python',      mgu_id) RETURNING id INTO s2;
  INSERT INTO subjects (name, university_id) VALUES ('Дискретная математика',           mgu_id) RETURNING id INTO s3;
  INSERT INTO subjects (name, university_id) VALUES ('Базы данных',                     mgu_id) RETURNING id INTO s4;
  INSERT INTO subjects (name, university_id) VALUES ('Алгоритмы и структуры данных',   mgu_id) RETURNING id INTO s5;

  -- Subjects СПбГУ
  INSERT INTO subjects (name, university_id) VALUES ('Линейная алгебра',      spbgu_id) RETURNING id INTO s6;
  INSERT INTO subjects (name, university_id) VALUES ('Теория вероятностей',   spbgu_id) RETURNING id INTO s7;
  INSERT INTO subjects (name, university_id) VALUES ('Веб-разработка',        spbgu_id) RETURNING id INTO s8;
  INSERT INTO subjects (name, university_id) VALUES ('Машинное обучение',     spbgu_id) RETURNING id INTO s9;
  INSERT INTO subjects (name, university_id) VALUES ('Операционные системы',  spbgu_id) RETURNING id INTO s10;

  -- Математический анализ (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s1, 'Введение в пределы',
     'Предел функции — одно из фундаментальных понятий анализа. lim(x→a) f(x) = L означает, что значения f(x) можно сделать сколь угодно близкими к L при x, достаточно близком к a. Применяется при вычислении производных и интегралов.',
     true, NOW()),
    (uid, s1, 'Производная и её геометрический смысл',
     'Производная f''(x₀) — предел отношения приращения функции к приращению аргумента. Геометрически — угловой коэффициент касательной к графику. Правила дифференцирования: сумма, произведение, частное, сложная функция.',
     true, NOW()),
    (uid, s1, 'Неопределённый интеграл',
     'Неопределённый интеграл — семейство всех первообразных: ∫f(x)dx = F(x) + C. Основные формулы: ∫xⁿdx = xⁿ⁺¹/(n+1)+C, ∫eˣdx = eˣ+C, ∫sin x dx = -cos x + C. Метод подстановки и интегрирование по частям.',
     true, NOW()),
    (uid, s1, 'Ряды Тейлора',
     'Ряд Тейлора раскладывает функцию в степенной ряд: f(x) = Σ f⁽ⁿ⁾(a)/n! · (x-a)ⁿ. При a=0 — ряд Маклорена. Примеры: eˣ = 1+x+x²/2!+…, sin x = x-x³/3!+x⁵/5!-…',
     true, NOW()),
    (uid, s1, 'Метод множителей Лагранжа',
     'Метод находит условный экстремум f(x,y) при ограничении g(x,y)=0. Вводим L(x,y,λ) = f(x,y) - λg(x,y) и приравниваем все частные производные нулю. Решение системы даёт кандидатов в экстремум.',
     true, NOW());

  -- Python (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s2, 'Основы синтаксиса Python',
     'Python — интерпретируемый язык с динамической типизацией. Отступы — часть синтаксиса. Базовые типы: int, float, str, bool, NoneType. Ввод: input(), вывод: print(). Условие: if/elif/else. Циклы: for, while.',
     true, NOW()),
    (uid, s2, 'Списки, кортежи, множества',
     'list — изменяемая упорядоченная коллекция. tuple — неизменяемая. set — неупорядоченная, без дубликатов. Операции над списком: append, extend, pop, sort, reverse. Срезы: lst[start:stop:step].',
     true, NOW()),
    (uid, s2, 'Словари и генераторы',
     'dict — коллекция пар ключ-значение. Создание: {k: v}. Генераторы списков: [x**2 for x in range(10)]. Генераторы словарей: {k: v for k, v in items}. Функции filter(), map(), zip().',
     true, NOW()),
    (uid, s2, 'Функции, декораторы, замыкания',
     'def f(a, b=0, *args, **kwargs). Lambda: f = lambda x: x*2. Замыкание — функция, захватывающая переменные из внешнего скоупа. Декоратор — обёртка над функцией через синтаксис @decorator.',
     true, NOW()),
    (uid, s2, 'ООП в Python',
     'Класс определяется через class. __init__ — конструктор. self — ссылка на экземпляр. Наследование: class Child(Parent). Магические методы: __str__, __repr__, __len__, __eq__. Множественное наследование через MRO.',
     true, NOW());

  -- Дискретная математика (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s3, 'Теория множеств',
     'Множество — неупорядоченная коллекция различных объектов. Операции: ∪ (объединение), ∩ (пересечение), \ (разность), ∁ (дополнение). Диаграммы Венна наглядно показывают операции над множествами.',
     true, NOW()),
    (uid, s3, 'Логические связки и таблицы истинности',
     'AND (∧), OR (∨), NOT (¬), импликация (→), эквивалентность (↔). Формула тавтологии истинна при любых значениях переменных. Нормальные формы: КНФ и ДНФ. Метод резолюций.',
     true, NOW()),
    (uid, s3, 'Теория графов',
     'Граф G = (V, E). Степень вершины deg(v). Маршрут, путь, цикл. Связный граф: между любыми двумя вершинами есть путь. Эйлеров путь — проходит по каждому ребру ровно раз. Гамильтонов — по каждой вершине.',
     true, NOW()),
    (uid, s3, 'Комбинаторика',
     'Правило суммы и произведения. Размещения A(n,k) = n!/(n-k)!. Сочетания C(n,k) = n!/(k!(n-k)!). Формула бинома Ньютона. Принцип включений-исключений. Числа Каталана.',
     true, NOW()),
    (uid, s3, 'Булева алгебра и логические схемы',
     'Булева алгебра: {0,1} с операциями AND, OR, NOT. Законы: двойного отрицания, де Моргана, дистрибутивности. Логические вентили: AND, OR, NOT, NAND, NOR, XOR. Синтез комбинационных схем.',
     true, NOW());

  -- Базы данных (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s4, 'Реляционная модель данных',
     'Таблица (отношение) состоит из строк (кортежей) и столбцов (атрибутов). Первичный ключ (PK) уникально идентифицирует строку. Внешний ключ (FK) создаёт связи между таблицами. Типы связей: 1:1, 1:N, M:N.',
     true, NOW()),
    (uid, s4, 'Основы SQL',
     'DDL: CREATE, ALTER, DROP. DML: SELECT, INSERT, UPDATE, DELETE. SELECT col FROM tbl WHERE cond GROUP BY col HAVING cond ORDER BY col LIMIT n. Агрегатные функции: COUNT, SUM, AVG, MAX, MIN.',
     true, NOW()),
    (uid, s4, 'JOIN-операции',
     'INNER JOIN — строки с совпадением в обеих таблицах. LEFT JOIN — все строки левой + совпадения справа (NULL если нет). CROSS JOIN — декартово произведение. SELF JOIN — таблица с собой. Оптимизация через индексы.',
     true, NOW()),
    (uid, s4, 'Нормализация БД',
     '1НФ: атомарные значения, нет повторяющихся групп. 2НФ: 1НФ + все неключевые атрибуты полно зависят от PK. 3НФ: 2НФ + нет транзитивных зависимостей. BCNF: каждая нетривиальная ФЗ содержит суперключ слева.',
     true, NOW()),
    (uid, s4, 'Транзакции и ACID',
     'Транзакция — набор операций, выполняемых атомарно. ACID: Atomicity (всё или ничего), Consistency (целостность), Isolation (изолированность), Durability (постоянство). Уровни изоляции: Read Uncommitted, Read Committed, Repeatable Read, Serializable.',
     true, NOW());

  -- Алгоритмы (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s5, 'Нотация Big O',
     'Big O описывает верхнюю границу роста сложности. O(1) — константа, O(log n) — двоичный поиск, O(n) — линейный проход, O(n log n) — быстрая сортировка, O(n²) — вложенные циклы, O(2ⁿ) — перебор подмножеств.',
     true, NOW()),
    (uid, s5, 'Алгоритмы сортировки',
     'Bubble sort O(n²): попарный обмен. Selection sort O(n²): минимум в остатке. Insertion sort O(n²): вставка в нужное место. Merge sort O(n log n): разделяй и властвуй. Quick sort O(n log n) avg: опорный элемент.',
     true, NOW()),
    (uid, s5, 'Двоичный поиск',
     'Работает на отсортированном массиве за O(log n). Идея: сравниваем с серединой, выбираем нужную половину. Итерационная версия: lo=0, hi=n-1, mid=(lo+hi)//2. Применения: поиск по ответу, нижняя и верхняя граница.',
     true, NOW()),
    (uid, s5, 'Динамическое программирование',
     'ДП: решение задач через запоминание результатов подзадач. Мемоизация (top-down) или таблица (bottom-up). Классика: числа Фибоначчи O(n), задача о рюкзаке O(nW), НОП O(n²), кратчайший путь Беллмана-Форда.',
     true, NOW()),
    (uid, s5, 'Графовые алгоритмы',
     'BFS — обход в ширину за O(V+E), кратчайший путь в невзвешенном графе. DFS — обход в глубину, топологическая сортировка, компоненты связности. Дейкстра O((V+E) log V) — кратчайший путь в графе с неотрицательными весами.',
     true, NOW());

  -- Линейная алгебра (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s6, 'Матрицы и операции',
     'Матрица — таблица m×n чисел. Сложение: поэлементно для одинаковых размеров. Умножение (A·B): строка A умножается на столбец B, требует n(A)=m(B). Транспонирование: Aᵀ[i][j] = A[j][i].',
     true, NOW()),
    (uid, s6, 'Определитель матрицы',
     'det(A) для 2×2: ad-bc. Для n×n: разложение Лапласа по строке/столбцу. Свойства: det(AB)=det(A)det(B), det(Aᵀ)=det(A). Матрица обратима ⟺ det ≠ 0. Геометрический смысл: объём параллелепипеда.',
     true, NOW()),
    (uid, s6, 'Собственные значения и векторы',
     'Av = λv, где v ≠ 0 — собственный вектор, λ — собственное значение. Нахождение: det(A-λI)=0 — характеристический полином. Применения: диагонализация, PCA, анализ динамических систем.',
     true, NOW()),
    (uid, s6, 'Метод Гаусса',
     'Прямой ход: элементарными преобразованиями строк приводим к ступенчатому виду. Обратный ход: подстановкой находим значения переменных. Метод Гаусса-Жордана приводит к единичной матрице (обращение матриц).',
     true, NOW()),
    (uid, s6, 'Векторные пространства',
     'Векторное пространство V: замкнуто относительно сложения и умножения на скаляр. Линейная независимость: Σαᵢvᵢ=0 ⟹ все αᵢ=0. Базис — максимальная линейно независимая система. Размерность — число элементов базиса.',
     true, NOW());

  -- Теория вероятностей (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s7, 'Основные понятия теории вероятностей',
     'Пространство элементарных событий Ω. Событие A ⊆ Ω. Вероятность P: σ-алгебра → [0,1]. Аксиомы Колмогорова: P(Ω)=1, P(A)≥0, для несовместных P(A∪B)=P(A)+P(B). Классическое определение: P(A) = |A|/|Ω|.',
     true, NOW()),
    (uid, s7, 'Условная вероятность и формула Байеса',
     'P(A|B) = P(A∩B)/P(B). Независимые события: P(A∩B)=P(A)P(B). Формула полной вероятности: P(B)=ΣP(B|Aᵢ)P(Aᵢ). Теорема Байеса: P(Aᵢ|B) = P(B|Aᵢ)P(Aᵢ)/P(B). Применяется в классификаторах.',
     true, NOW()),
    (uid, s7, 'Случайные величины и распределения',
     'Дискретная СВ задаётся таблицей распределения. Непрерывная — плотностью f(x), P(a≤X≤b)=∫f(x)dx. Нормальное N(μ,σ²), равномерное U(a,b), экспоненциальное Exp(λ), Пуассона P(λ), Бернулли, биномиальное.',
     true, NOW()),
    (uid, s7, 'Математическое ожидание и дисперсия',
     'E[X] = Σxᵢpᵢ (дискретная) или ∫xf(x)dx (непрерывная). Линейность: E[aX+b]=aE[X]+b. D[X]=E[(X-E[X])²]=E[X²]-(E[X])². Ковариация Cov(X,Y)=E[XY]-E[X]E[Y]. Корреляция ρ=Cov/σₓσᵧ.',
     true, NOW()),
    (uid, s7, 'ЦПТ и закон больших чисел',
     'Закон больших чисел: выборочное среднее Xₙ → μ при n→∞. ЦПТ: сумма независимых одинаково распределённых СВ стремится к нормальному распределению. Основа для статистических тестов и доверительных интервалов.',
     true, NOW());

  -- Веб-разработка (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s8, 'HTML: семантика и структура',
     'Семантические теги: header, nav, main, article, section, aside, footer. Формы: form, input, textarea, select, button. Атрибуты: id, class, href, src, alt. Мета-теги для SEO.',
     true, NOW()),
    (uid, s8, 'CSS: Box model и Flexbox',
     'Box model: content → padding → border → margin. display: block/inline/flex/grid. Flexbox: justify-content, align-items, flex-direction, flex-wrap, gap. Grid: grid-template-columns/rows, grid-area, auto-fill.',
     true, NOW()),
    (uid, s8, 'JavaScript: async/await и промисы',
     'Promise — объект для асинхронных операций: resolve/reject. .then().catch().finally(). async функция всегда возвращает Promise. await приостанавливает выполнение до разрешения промиса. Параллельно: Promise.all().',
     true, NOW()),
    (uid, s8, 'HTTP и REST API',
     'HTTP методы: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS. Заголовки: Content-Type, Authorization, Cache-Control. Коды: 2xx успех, 3xx редирект, 4xx ошибка клиента, 5xx ошибка сервера. REST: stateless, uniform interface.',
     true, NOW()),
    (uid, s8, 'React: хуки и управление состоянием',
     'useState — локальное состояние. useEffect — побочные эффекты (запросы, подписки). useCallback/useMemo — мемоизация. useRef — ссылка на DOM. Context API — глобальное состояние. Сторонние: TanStack Query, Redux.',
     true, NOW());

  -- Машинное обучение (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s9, 'Типы задач машинного обучения',
     'Supervised: классификация (метки классов), регрессия (числовой ответ). Unsupervised: кластеризация (K-means, DBSCAN), снижение размерности (PCA, t-SNE). Reinforcement: агент в среде максимизирует награду.',
     true, NOW()),
    (uid, s9, 'Линейная регрессия',
     'Модель: y = Xw + b. Функция потерь MSE = (1/n)Σ(yᵢ-ŷᵢ)². Аналитическое решение: w = (XᵀX)⁻¹Xᵀy. Градиентный спуск: w := w - α∇L. Регуляризация: L2 (Ridge), L1 (Lasso) против переобучения.',
     true, NOW()),
    (uid, s9, 'Деревья решений и Random Forest',
     'Дерево разбивает пространство признаков по условиям. Критерии: Gini impurity, Information Gain, MSE. Глубина и min_samples_leaf — гиперпараметры. Random Forest: ансамбль деревьев на Bootstrap-выборках, голосование.',
     true, NOW()),
    (uid, s9, 'Нейронные сети',
     'Слои: Dense (полносвязный), Conv2D, RNN, LSTM. Активации: ReLU, sigmoid, tanh, softmax. Loss: cross-entropy (классификация), MSE (регрессия). Backprop + Adam optimizer. Dropout и BatchNorm против переобучения.',
     true, NOW()),
    (uid, s9, 'Оценка моделей',
     'Train/Val/Test split или K-Fold CV. Метрики классификации: Accuracy, Precision, Recall, F1, ROC-AUC. Матрица ошибок: TP, FP, TN, FN. Регрессия: MAE, RMSE, R². Bias-Variance tradeoff, кривые обучения.',
     true, NOW());

  -- Операционные системы (5 постов)
  INSERT INTO posts (user_id, subject_id, title, body, visible, updated_at) VALUES
    (uid, s10, 'Процессы и потоки',
     'Процесс — изолированная программа с PCB (Process Control Block). Состояния: new, ready, running, waiting, terminated. Поток (thread) разделяет память процесса. Контекстное переключение: сохранение регистров CPU.',
     true, NOW()),
    (uid, s10, 'Виртуальная память',
     'Виртуальная память даёт каждому процессу иллюзию собственного адресного пространства. Страничная организация: страницы фиксированного размера (4KB). TLB кэширует трансляции. Page fault → подгрузка страницы с диска.',
     true, NOW()),
    (uid, s10, 'Файловые системы',
     'ФС управляет хранением файлов. Структуры: суперблок, inode (метаданные), блоки данных, каталоги. Ext4: журналирование для отказоустойчивости. FAT32: совместимость. NTFS: ACL, сжатие. APFS: снапшоты, copy-on-write.',
     true, NOW()),
    (uid, s10, 'Синхронизация потоков',
     'Race condition при конкурентном доступе к общей памяти. Mutex: взаимное исключение, lock/unlock. Семафор: счётчик, P(wait) и V(signal). Мониторы — высокоуровневая абстракция. Проблемы: deadlock, livelock, starvation.',
     true, NOW()),
    (uid, s10, 'Алгоритмы планирования',
     'FCFS — First Come First Served, convoy effect. SJF — минимальное среднее время ожидания, но требует знания длительности. Round Robin — квант времени, справедливый. Priority Scheduling — приоритеты, риск голодания. Multilevel Queue.',
     true, NOW());

END $$;