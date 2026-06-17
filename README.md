# CS Book

Справочник по CS2: лайнапы гранат и прицелы. Одностраничное React-приложение без бэкенда — все данные собираются из файлов на этапе сборки. Интерфейс на русском языке.

## Возможности

- **Гранаты** (`/grenades`) — лайнапы смоков, молотовов и флешек с фильтрами по карте, типу гранаты и стороне (T/CT). Каждая раскидка показывает три кадра: позиция, прицел, результат — с увеличением по клику.
- **Прицелы** (`/crosshairs`) — коллекция прицелов с кодами `CSGO-…`. Каждый прицел отрисовывается процедурно (SVG) из своих параметров.

## Стек

React 18 · TypeScript · Vite · React Router · SCSS Modules

## Разработка

```bash
npm install
npm run dev      # дев-сервер (Vite)
npm run build    # tsc + vite build
npm run preview  # предпросмотр прод-сборки
```

## Структура данных

Данные не хранятся в БД — они подтягиваются на этапе сборки через `import.meta.glob`.

### Гранаты

Одна раскидка = одна папка `src/data/grenades/<id>/`:

```
src/data/grenades/anubis-smoke-t-mid/
  meta.json   # { description, side: "T"|"CT", type: "smoke"|"molotov"|"flash", map }
  1.png       # позиция (stand)
  2.png       # прицел (aim)
  3.png       # результат (result)
```

Чтобы добавить раскидку, достаточно создать новую папку — код менять не нужно. Поддерживаются `.jpg/.jpeg/.png/.webp`.

### Прицелы

Один прицел = один файл `src/data/crosshairs/*.json`:

```json
{
  "code": "CSGO-q9b4S-LaMNa-EEWPU-BPAcD-B6LsE",
  "params": { "size": 1, "gap": 0, "thickness": 3, "dot": true, "tStyle": false, "color": "#ffffff", "outline": true, "outlineThickness": 2, "alpha": 255 }
}
```

## Деплой

Автоматический деплой на GitHub Pages при пуше в `main` (`.github/workflows/deploy.yml`). Приложение доступно по подпути `/cs-book/`.
