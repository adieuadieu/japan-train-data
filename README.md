# 🚉 japan-train-data

Choo choo.

A recursive object of train data for Japan including translations & station geocoding _and_ a tool to generate it.

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


### Known Issues

1. Some of the translations are clearly crap.
1. In many cases, transliteration would be better than translation, but there's no API? Suggestions?


### Todo

- [X] npm package
- [ ] unit tests
- [ ] ci integrations
