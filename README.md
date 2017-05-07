# 🚉 japan-train-data

Choo choo.

A recursive object of train data for Japan including translations & station geocoding _and_ a tool to generate it. Access train data by prefecture, by lines, or by stations.

## Install

`yarn add japan-train-data`

## Usage

```js
import { prefectures, lines, stations } from 'japan-train-data'

console.log(prefectures.find(({ id }) => id === 13))

/*
{
  id: 13,
  name: { ja: '東京都', en: 'Tokyo' },
  lines: [
    {
      id: 11301,
      name: [Object],
      lat: 35.39507962341528,
      lng: 139.4302441326313,
      zoom: 10,
      stations: [Object],
      prefecture: [Circular],
    },
    ...
  ],
}
*/

console.log(lines.find(({ id }) => id === 11302))

/*
{
  id: 11302,
  name: {
    ja: 'JR山手線',
    en: 'JR Yamanote Line',
  },
  lat: 35.69302730762992,
  lng: 139.73522275686264,
  zoom: 12,
  stations: [
    {
      id: 1130201,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
    {
      id: 1130202,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
    ...
  ],
  prefecture: {
    id: 13,
    name: { ja: '東京都', en: 'Tokyo' },
    lines: [[Object], [Circular], [Object]],
  },
}
*/

console.log(stations.find(({ prefecture: { id } }) => id === 13))

/*
{
  id: 1130101,
  name: { ja: '東京', en: 'Tokyo' },
  location: {
    lat: 35.681391,
    lng: 139.766103,
    countryCode: { en: 'JP', ja: 'JP' },
    postalCode: {
      en: '100-0005',
      ja: '100-0005',
    },
    administrativeArea1: {
      en: 'Tōkyō-to',
      ja: '東京都',
    },
    locality1: {
      en: 'Chiyoda-ku',
      ja: '千代田区',
    },
    sublocality1: {
      en: 'Marunouchi',
      ja: '丸の内',
    },
    sublocality2: {
      en: '1 Chome',
      ja: '１丁目',
    },
    sublocality3: { en: '9', ja: '９' },
    sublocality4: { en: '1', ja: '１' },
  },
  lines: [
    { id: 11301, name: [Object] },
    { id: 11302, name: [Object] },
    { id: 11308, name: [Object] },
    ...
  ],
  prefecture: {
    id: 13,
    name: { ja: '東京都', en: 'Tokyo' },
    lines: [[Object], [Object], [Object]],
  },
}
*/
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
