import data from '../data/raw-data.json'

// basically the only time that i've ever used forEach instead of map
// turn 'data' into a circular structure
data.forEach((prefecture) => {
  prefecture.lines.forEach((line) => {
    line.prefecture = prefecture
    line.stations.forEach((station) => {
      station.prefecture = prefecture

      station.lines.forEach(({ id: lineId }) => {
        // link this stations lines to the lines by id
      })
    })
  })
})

export const prefectures = data

export const lines = data.reduce(
  (reducedPrefectures, prefecture) => [
    ...reducedPrefectures,
    ...prefecture.lines,
  ],
  []
)

export const stations = data.reduce(
  (reducedPrefectures, prefecture) => [
    ...reducedPrefectures,
    ...prefecture.lines.reduce(
      (reducedLines, line) => [...reducedLines, ...line.stations],
      []
    ),
  ],
  []
)
