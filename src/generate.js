import a from 'awaiting'
import Queue from 'p-queue'

import { QUEUE_CONFIG, JAPAN_PREFECTURE_IDS } from './constants'
import getPrefectureLines from './ekiData/get/prefectureLines'
import getLine from './ekiData/get/line'
import getStation from './ekiData/get/station'
import getTranslations from './google/translations'
import getGeocoding from './google/geocoding'

const ekiDataQueue = new Queue(QUEUE_CONFIG)

setInterval(() => {
  console.log(
    `Eki Data Queue: size ${ekiDataQueue.size}, pending ${ekiDataQueue.pending}`
  )
}, 10000)

export default function generate () {
  return Promise.all(
    JAPAN_PREFECTURE_IDS.map(async (prefectureId) => {
      const prefecture = await ekiDataQueue.add(() =>
        getPrefectureLines(prefectureId)
      )

      const prefectureName = getTranslations(prefecture.name)

      const lines = Promise.all(
        prefecture.lines.map(async ({ id: lineId }) => {
          const line = await ekiDataQueue.add(() => getLine(lineId))
          const lineName = getTranslations(line.name)

          console.log('Processing line:', lineId, line.name)

          const stations = await Promise.all(
            line.stations.map(async ({ id: stationId }) => {
              const station = await ekiDataQueue.add(() =>
                getStation(stationId)
              )

              const stationName = getTranslations(station.name)
              const location = getGeocoding(station.lat, station.lng)

              const stationLines = await Promise.all(
                station.lines.map(async stationLine => ({
                  ...stationLine,
                  name: await getTranslations(stationLine.name),
                }))
              )

              return {
                id: station.id,
                gid: station.gid,
                name: await stationName,
                location: await location,
                lines: stationLines,
              }
            })
          )
          return {
            ...line,
            name: await lineName,
            stations: await stations,
          }
        })
      )

      return {
        id: prefecture.id,
        name: await prefectureName,
        lines: await lines,
      }
    })
  )
}
