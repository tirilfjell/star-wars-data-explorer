# Assignment 1 – Star Wars Data Explorer

A small multi-page website that fetches data from SWAPI (the Star Wars API) and displays it
dynamically. The front page lists four categories, and each category has its own page showing
six records with six properties and an illustration each.

**Course:** FFU1200 – Production of Frontend Development
**Topic:** Asynchronous JavaScript and the Fetch API

## Links

- **GitHub repository:** _add the URL here after pushing the repository_
- **Live version (Netlify):** _add the URL here after deploying_

## Features

- Four categories – films, people, planets and vehicles – each on its own page.
- Six records per category, each with six properties and an illustration.
- All data is fetched at runtime with `fetch` and `async/await`. Nothing is hardcoded in the HTML.
- Loading and error states are shown in the interface, not only in the console.
- If the primary API host is unavailable, the app automatically retries on the documented mirror.
- Responsive layout built with CSS grid and flexbox, from mobile to desktop.

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
│   └── artwork.js      Maps a record to its local illustration
└── assets/
    └── img/            24 SVG illustrations, six per category
```

The four category pages share a single script. Each page states which category it shows through
a `data-category` attribute on its `<main>` element, and `config.js` holds the endpoint and the
properties for that category. Adding a fifth category would mean adding one entry to the
configuration and one HTML page – no new JavaScript.

## Technical choices

**Why a mirror of the API.** The official host `swapi.dev` was unreachable while this
assignment was built, so the documented mirror `https://swapi.py4e.com/api` is used as the
primary host, with `swapi.dev` kept as an automatic fallback. Both serve identical data.

**Why local illustrations.** SWAPI returns data only – it has no image field. The image host
normally paired with it, `starwars-visualguide.com`, answers requests with HTTP 403 and can no
longer be used. Each category therefore ships with six hand-drawn SVG illustrations in
`assets/img/`, and a record is paired with one by its position in the result list. Every
illustration gets a descriptive `alt` text built from the record name.

**Why the DOM API instead of `innerHTML`.** Cards are built with `document.createElement` and
`textContent`. Text that comes from the API is inserted as text and can never be interpreted as
markup.

## Universal design

- Semantic elements: `header`, `nav`, `main`, `footer`, `article`, and a description list for
  the properties of a record.
- A skip link jumps straight to the main content.
- Every illustration has a descriptive alternative text.
- All interactive elements are reachable by keyboard and have a clearly visible focus ring.
- Text and interactive elements are checked against their background for a contrast ratio above
  the WCAG AA minimum of 4.5:1.
- Loading and error messages sit in a `role="status"` region with `aria-live="polite"`, so they
  are announced to screen readers.

## Sources

- SWAPI documentation – https://swapi.py4e.com/documentation
- `AbortSignal.timeout()` for cancelling slow requests – https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static
- BEM naming convention – https://getbem.com/naming/
