# Modal Demo

Демо-проект с кастомными UI-компонентами на React 19 без сторонних UI-библиотек.

## Запуск

```bash
npm install
npm run dev
```

## Структура

```
src/
├── components/         # Переиспользуемые UI-компоненты
│   ├── GenericModal/   # Модалка (портал, оверлей, Escape, клик вне)
│   ├── SingleSelect/   # Select с единичным выбором
│   ├── UniTextarea/    # Текстовое поле с поддержкой ошибок
│   ├── Button/         # Кнопка (primary / danger / ghost)
│   ├── Header/         # Шапка приложения
│   └── ProjectCard/    # Карточка проекта
├── pages/              # Страницы (бизнес-логика + композиция компонентов)
│   └── ProjectsPage/
├── constants/          # Справочные данные
│   └── timezones.js
├── App.jsx             # Layout-шелл
├── App.module.css
├── main.jsx            # Entry point
└── index.css           # Глобальные стили / reset
```

## Архитектурные решения

### Почему нет MultiSelect

Объединять `SingleSelect` и `MultiSelect` в один компонент нецелесообразно —
они сильно отличаются и по поведению, и по рендеру. Компонент с флагом `isMulti`
стал бы сложноподдерживаемым и всё равно сводился бы к рендеру двух разных
компонентов внутри.

### GenericModal — портал поверх всего

Модалка рендерится через `createPortal` в `document.body` с `z-index: 9999`,
чтобы отображаться поверх типичных оверлеев (popover, dialog и т.п.).
