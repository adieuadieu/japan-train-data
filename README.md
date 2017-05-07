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


```js
console.log(prefectures.find(({ id }) => id === 13))

{
  id: 13,
  name: { ja: '東京都', en: 'Tokyo', 'zh-CN': '东京', ko: '도쿄도' },
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
    {
      id: 11302,
      name: [Object],
      lat: 35.69302730762992,
      lng: 139.73522275686264,
      zoom: 12,
      stations: [Object],
      prefecture: [Circular],
    },
    {
      id: 11303,
      name: [Object],
      lat: 35.62126801796464,
      lng: 139.5621831285025,
      zoom: 11,
      stations: [Object],
      prefecture: [Circular],
    },
  ],
}

console.log(lines.find(({ id }) => id === 11302))

{
  id: 11302,
  name: {
    ja: 'JR山手線',
    en: 'JR Yamanote Line',
    'zh-CN': 'JR山手线',
    ko: 'JR 야마노 테선',
  },
  lat: 35.69302730762992,
  lng: 139.73522275686264,
  zoom: 12,
  stations: [
    {
      id: 1130201,
      gid: 1130201,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
    {
      id: 1130202,
      gid: 1130202,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
    {
      id: 1130203,
      gid: 1130203,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
    {
      id: 1130204,
      gid: 1130204,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
    {
      id: 1130205,
      gid: 1130205,
      name: [Object],
      location: [Object],
      lines: [Object],
      prefecture: [Object],
    },
  ],
  prefecture: {
    id: 13,
    name: { ja: '東京都', en: 'Tokyo', 'zh-CN': '东京', ko: '도쿄도' },
    lines: [[Object], [Circular], [Object]],
  },
}

console.log(stations.find(({ prefecture: { id } }) => id === 13))

{
  id: 1130101,
  gid: 1130101,
  name: { ja: '東京', en: 'Tokyo', 'zh-CN': '东京', ko: '도쿄' },
  location: {
    lat: 35.681391,
    lng: 139.766103,
    countryCode: { en: 'JP', 'zh-CN': 'JP', ko: 'JP', ja: 'JP' },
    postalCode: {
      en: '100-0005',
      'zh-CN': '100-0005',
      ko: '100-0005',
      ja: '100-0005',
    },
    administrativeArea1: {
      en: 'Tōkyō-to',
      'zh-CN': 'Tōkyō-to',
      ko: 'Tōkyō-to',
      ja: '東京都',
    },
    ward: {},
    locality1: {
      en: 'Chiyoda-ku',
      'zh-CN': 'Chiyoda-ku',
      ko: 'Chiyoda-ku',
      ja: '千代田区',
    },
    sublocality1: {
      en: 'Marunouchi',
      'zh-CN': 'Marunouchi',
      ko: 'Marunouchi',
      ja: '丸の内',
    },
    sublocality2: {
      en: '1 Chome',
      'zh-CN': '1 Chome',
      ko: '1 Chome',
      ja: '１丁目',
    },
    sublocality3: { en: '9', 'zh-CN': '9', ko: '9', ja: '９' },
    sublocality4: { en: '1', 'zh-CN': '1', ko: '1', ja: '１' },
  },
  lines: [
    { id: 11301, name: [Object] },
    { id: 11302, name: [Object] },
    { id: 11308, name: [Object] },
    { id: 11311, name: [Object] },
    { id: 11312, name: [Object] },
    { id: 11314, name: [Object] },
    { id: 11326, name: [Object] },
    { id: 11328, name: [Object] },
    { id: 11332, name: [Object] },
    { id: 11343, name: [Object] },
    { id: 28002, name: [Object] },
  ],
  prefecture: {
    id: 13,
    name: { ja: '東京都', en: 'Tokyo', 'zh-CN': '东京', ko: '도쿄도' },
    lines: [[Object], [Object], [Object]],
  },
}
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
