# Assignment 1 – Star Wars Data Explorer

A multi-page website that fetches data from SWAPI (the Star Wars API) and displays it
dynamically. The front page lists four categories, and each category has its own page showing
six records with six properties and a picture each.

**Course:** FFU1200 – Production of Frontend Development
**Topic:** Asynchronous JavaScript and the Fetch API

## Links

- **GitHub repository:** _add the URL here after pushing the repository_
- **Live version (Netlify):** _add the URL here after deploying_

## Features

- Four categories – films, people, planets and vehicles – each on its own page.
- Six records per category, each with six properties and a picture.
- All data is fetched at runtime with `fetch` and `async/await`. Nothing is hardcoded in the HTML.
- Loading and error states are shown in the interface, not only in the console.
- If the primary API host is unavailable, the app automatically retries on the documented mirror.
- Mobile-first responsive layout built with CSS grid and flexbox, from 320px upwards.

## Running the project locally

The JavaScript is written as ES modules, which browsers refuse to load over the `file://`
protocol. The project therefore needs to be served over HTTP:

```bash
cd Assignment_1
npx serve .
```

Then open the address printed in the terminal, for example `http://localhost:3000`.

## Project structure

```
Assignment_1/
├── index.html          Front page with the four categories
├── films.html          Category page: films
├── people.html         Category page: people
├── planets.html        Category page: planets
├── vehicles.html       Category page: vehicles
├── css/
│   ├── main.css        Entry point that imports the partials in order
│   ├── base.css        Design tokens, reset and element defaults
│   ├── layout.css      Page shell, header, footer and grids
│   └── components.css  Cards, status messages and buttons
├── js/
│   ├── categoryPage.js Entry point for the four category pages
│   ├── config.js       Endpoint and property configuration per category
│   ├── api.js          Fetch layer with timeout, retry and error type
│   ├── recordCard.js   Builds the DOM for one record card
│   ├── statusMessage.js Loading and error messages
│   ├── formatters.js   Value formatting (numbers, dates, missing values)
│   └── artwork.js      Maps a record to its picture
└── assets/
    └── img/            24 pictures, six per category, plus a placeholder
```

The four category pages share a single script. Each page states which category it shows through
a `data-category` attribute on its `<main>` element, and `config.js` holds the endpoint and the
properties for that category. Adding a fifth category would mean adding one entry to the
configuration and one HTML page – no new JavaScript.

## Technical choices

**Why a mirror of the API.** The official host `swapi.dev` was unreachable while this
assignment was built, so the documented mirror `https://swapi.py4e.com/api` is used as the
primary host, with `swapi.dev` kept as an automatic fallback. Both serve identical data.

**Where the pictures come from.** SWAPI returns data only – it has no image field. The image
host normally paired with it, `starwars-visualguide.com`, no longer serves images at all: the
domain now redirects to an unrelated site. The pictures are therefore taken from Wookieepedia,
the Star Wars wiki, and stored locally in `assets/img/`. Serving them from the project rather
than hotlinking the wiki keeps the page working if that host blocks external requests, and means
the pictures still render without a network connection. Each file is scaled to 640px wide and
saved as WebP, which keeps all 24 pictures to roughly 2 MB in total.

**Why records are matched to pictures by name.** `artwork.js` maps each record to its picture
through a lookup keyed on the record name rather than its position in the response, so the right
picture is shown even if the API ever returns the records in a different order.

**Why the DOM API instead of `innerHTML`.** Cards are built with `document.createElement` and
`textContent`. Text that comes from the API is inserted as text and can never be interpreted as
markup.

## Responsive design

The stylesheet is written **mobile first**: every rule outside a media query describes the
smallest supported screen (320px), and the `min-width` breakpoints only add complexity for
wider screens.

| Breakpoint | Width | What changes |
| --- | --- | --- |
| Base | from 320px | Single column, header stacked, tighter gutters |
| `48rem` | 768px | Header becomes one row, wider gutters and gaps |
| `64rem` | 1024px | Full-width gutters |

- Both grids use `repeat(auto-fit, minmax(min(100%, …), 1fr))`, so the column count follows the
  space available rather than a fixed breakpoint. The `min(100%, …)` is what stops a track from
  demanding more width than the screen has, and the page has no horizontal overflow at 320px.
- The heading scales with `clamp()` between a floor and a ceiling, so it never overflows a narrow
  screen nor grows unreadably large.
- Below 25rem the property list drops from two columns to stacked labels, so values keep room.
- Each category sets its own picture aspect ratio – portrait for film posters, square for
  planets, landscape for vehicles – and `object-fit: contain` fits the picture inside that frame
  instead of cropping it.

## Universal design

- Semantic elements: `header`, `nav`, `main`, `footer`, `article`, and a description list for
  the properties of a record. Each record list carries an `aria-label` naming its contents.
- A skip link is the first tab stop on every page and jumps straight to the main content.
- Every picture has a descriptive alternative text that says what the picture actually shows,
  rather than repeating the record name.
- All interactive elements are reachable by keyboard. The focus ring pairs an accent outline with
  a dark inner ring, so it stays visible on both dark and accent-coloured backgrounds.
- Navigation links and buttons are at least 2.75rem high, which keeps them comfortable to tap.
- Colours are measured rather than assumed. Every text pair clears the WCAG AA minimum of 4.5:1 –
  the lowest in the palette is error text at 6.86:1, and body text reaches 16.8:1. Borders clear
  the 3:1 minimum that WCAG 1.4.11 sets for non-text elements.
- `prefers-reduced-motion` is respected: transitions collapse for users who ask for less motion,
  and hover states change colour as well as moving, so no state is signalled by motion alone.
- Loading and error messages sit in a `role="status"` region with `aria-live="polite"`, so they
  are announced to screen readers.

## Sources

- SWAPI documentation – https://swapi.py4e.com/documentation
- Pictures from Wookieepedia – https://starwars.fandom.com/
- `AbortSignal.timeout()` for cancelling slow requests – https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static
- BEM naming convention – https://getbem.com/naming/
- WCAG 2.2 contrast minimums – https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html

Star Wars and all related names are trademarks of Lucasfilm Ltd. This is a non-commercial
student project made for coursework.
