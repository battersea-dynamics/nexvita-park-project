# Nexvita park project

The Nexvita website: yoga and physio in the park. *Nature to heal the body and mind.*

All the words on the site live in simple text files (JSON) in `src/data/`. A small script turns them into the finished web page in `dist/`. There is no framework and nothing to install apart from Node.js 18 or newer.

> **This repository is PUBLIC.** Never commit passwords, API keys, tokens, account IDs you want to keep private, or a `.env` file. The `.gitignore` already blocks `.env`, `*.key` and `*.pem`, but please still check before committing.

## What each file does

| File / folder | What it is |
|---|---|
| `src/data/site.json` | Brand name, page title, tagline, hero headline, sub-text, button text and link, the About and Contact sections, footer text. |
| `src/data/activities.json` | A **list of activities** (now Physio and Yoga). Each one becomes its own section and its own menu item. |
| `src/data/locations.json` | The "Where and when" section: parks and session times (placeholders for Islington and Camden parks for now). |
| `src/data/faqs.json` | The FAQ questions and answers. |
| `src/templates/templates.mjs` | The HTML building blocks: header, hero, sections, footer. You normally don't need to touch this. |
| `src/styles/main.css` | All the look and feel (colours, fonts, layout, phone layout). |
| `src/assets/images/hero.jpg` | The big park photo at the top. |
| `build.mjs` | The build script: reads the JSON and writes `dist/`. |
| `scripts/make-worker.mjs` | Packs `dist/` into one `_worker.js` file for the live site (see Deployment). |
| `package.json` | The list of commands (`npm run build`, etc.). |

The menu at the top is created automatically, in this order: About, each activity, Where & when, FAQs, Contact.

## How to change text

1. Open the right file in `src/data/` (for example `activities.json` for the Physio text).
2. Change only the text between the quote marks `"..."`. Keep the commas and brackets as they are.
3. Rebuild (see below). Anything marked `[PLACEHOLDER...]` is waiting for real wording.

## How to add a new activity (e.g. Fitness or Mobility)

1. Open `src/data/activities.json` and copy one whole `{ ... }` block (for example Yoga), and paste it after the last one, with a comma in between.
2. Change `id` (short, lowercase, no spaces, e.g. `"fitness"`), `menu` (the menu label), `heading`, `text`, `type` (`"one-to-one"` or `"group"`), `capacity` and `bookingPlaceholder`.
3. Run `npm run build`. The new section and its menu link appear automatically.

Extra fields per activity:
- `details` (who it is for, what to expect, length, price) are shown as a list only when `showDetails` is `true`.
- `bookingEmbed`: leave empty to show the dashed "booking calendar will appear here" box. To switch on booking, put the Cal.com link there in the form `username/event-slug` (e.g. `"nexvita-physio/physio-1-to-1"`); the site then shows a "Book a session" button that opens the Cal.com booking popup (and works as a normal link if JavaScript is off). Optional: `bookingNote` (text above the button), `bookingButton` (button label), `bookingStartMonth` (`"YYYY-MM"`, the month the calendar opens on). Adding yoga booking later is just this data edit plus `npm run build`.
- Physio booking on Cal.com is currently open only for 1 May to 30 September 2027 (Mon to Fri 18:00 to 20:00, Sat 13:00 to 18:00, London time). When this is reviewed, extend the date range in Cal.com and update `bookingNote` / `bookingStartMonth`. Payment is not yet taken online.

In `locations.json`, set `showLocations` to `true` to show the list of parks as cards under the text.

## How to build

```
npm run build      # writes dist/index.html, dist/styles/main.css, dist/images/hero.jpg
npm run preview    # builds and serves dist/ locally to look at it in a browser
npm run worker     # builds and also writes dist-worker/_worker.js for deployment
```

`dist/` and `dist-worker/` are **not** committed: they are always re-created from `src/` by the build, so the source files are the single source of truth.

## How the site goes online (deployment)

The live site **nexvita.uk** is a Cloudflare Pages project called `nexvita` (direct upload). It is served by a single `_worker.js` file with the HTML, CSS and hero image embedded inside it.

Deployment is done by **the assistant (Grok Bot)**, not from this repo automatically: it runs `npm run worker` and uploads `dist-worker/_worker.js` to the `nexvita` Pages project. No Cloudflare credentials are stored in this repo, and none should ever be added. `npm run deploy` only prints this reminder.
