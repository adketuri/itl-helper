# What is This?

Discover which songs you should be playing in [ITL 2023](https://itl2023.groovestats.com/). Songs are ranked by your score relative to similarly-ranked players.

More specifically, this tool does the following:

1. Finds a handful of players with similar points (both ranking points and total points, though the former is weighted a bit heavier).
2. Calculates the average scores for all songs they've played.
3. Compares those scores to your own to determine which have the most room for personal improvement.

# Getting Started

This is deployed to [itl.zexyu.com](https://itl.zexyu.com). Drop your username in the field and give it a few moments to do its thing.

You can filter by a minimum song rating and swipe left to delete suggestions.

# Running locally

This is a standard React/Next.js application. You'll need a node environment. Clone and install dependencies:

```bash
git clone git@github.com:adketuri/itl-helper.git
cd itl-helper
yarn
```

Then start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

A note, this uses Next.js [Rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites) as a proxy server to circumvent some CORS issues.🤫