# iwoca tech test

To run:

`yarn install`
`yarn start`

To test:

`yarn test`

If you don't have yarn in your machine, please run `npm install -g yarn` first.

## Features

Built using in `react` and `styled-components`. Tested with `jest` and `enzyme`.

Calls API for credit validity, invalid values will prevent interacting with the table and show constraints (horribly).

Responsive down to 500px screen width.

### Possible improvements:

* Make credit constraints look decent to a human
* Implement some more responsiveness for the tables so they can work down to 320px
* Nicer imports (no ../../...)
* Test Totals calculation in Calculator.tsx
* Add "renders without crashing" tests everywhere
* Mock test API calls
* Test rendering result snapshots maybe, it's not particularly a practice of mine
* Add pre-push test hook