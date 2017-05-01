import minimist from 'minimist'
import dotenv from 'dotenv'
import writeJson from './utils/json/write'
import generate from './generate'

dotenv.config()

const argv = minimist(process.argv.slice(2))
;(async () => {
  const data = await generate()
  writeJson('./lib/raw-data.json', data)
  process.exit()
})()

/*
const url =
  argv.url ||
  'https://www.google.com'(async () => {
    if (!fileExists('prefecture-lines')) {
      const prefectureData = await getPrefectureLines()

      saveJson('prefecture-lines', prefectureData)
    }

    if (fileExists('prefecture-lines') && !fileExists('lines')) {
      const prefectureLines = readJson('prefecture-lines')
      const lineIds = [
        ...new Set(
          prefectureLines.reduce(
            (lines, prefecture) => [
              ...lines,
              ...(prefecture.lines ? prefecture.lines.map(item => item.id) : []),
            ],
            []
          )
        ),
      ]

      const data = await getLines(lineIds)

      saveJson('lines', data)
    }

    if (fileExists('lines') && !fileExists('stations')) {
      const lines = readJson('lines')
      const stationIds = [
        ...new Set(
          lines.reduce(
            (stations, line) => [
              ...stations,
              ...(line.stations ? line.stations.map(item => item.gid) : []),
            ],
            []
          )
        ),
      ]

      const data = await getStations(stationIds)

      saveJson('stations', data)
    }
  })()

*/
