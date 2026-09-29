# Precision Rifle Configurator

A build-sheet and pricing tool for custom precision rifles, from American Precision Rifleworks. Pick the components, add accessories, and the totals update as you go: MSRP, discount, 6.5% sales tax and estimated rifle weight. Print to PDF for the customer build sheet.

**Live:** https://rjbethune.github.io/precision-rifle-configurator/

It runs entirely in the browser. There is nothing to install, and work autosaves in the browser you use it in.

## Changing the options

The component lists and prices live in `assets/options.json`. After editing it, run:

```bash
node scripts/sync-embedded-options.mjs
```

That copies the options into `index.html`, which uses them when the page is opened straight from disk.

## About this public copy

- Dealer costs are set to 0, so the Internal cost total always reads $0.00.
- Save to Site posts to a WordPress endpoint (`/wp-json/apr-configurator/v1/options`) that does not exist here. Use Export JSON to keep a copy of edited options.
