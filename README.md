# 🚉 japan-train-data

Choo choo.

A recursive object of train data for Japan including translations & station geocoding _and_ a tool to generate it. Access train data by prefecture, by lines, or by stations.

## Install

`yarn add japan-train-data`

## Usage

```js
import { prefectures, lines, stations } from 'japan-train-data'

console.log(...prefectures)
console.log(...lines)
console.log(...stations)
```

## Just gimme the data

Sure. [`data/raw-data.json`](https://github.com/adieuadieu/japan-train-data/blob/master/data/raw-data.json).

## Generating the data

First clone the project:

```bash
git clone https://github.com/adieuadieu/japan-train-data.git
```

Set up your environment with Google Cloud keys. To generate the data you need API access to Google's Translation and Geocoding APIs.

```bash
echo GCP_PROJECT=your-gcp-project-id-here >> .env
GCP_API_KEY=your-google-maps-api-key-here >> .env
GCP_KEYFILE=./gcp-keyfile.json >> .env
```

Then to start generating data:

```bash
yarn generate
```


### Known Issues

1. Some of the translations are clearly crap.
1. In many cases, transliteration would be better than translation, but there's no API? Suggestions?


### Todo

- [X] npm package
- [ ] unit tests
- [ ] ci integrations
