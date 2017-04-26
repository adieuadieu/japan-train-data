const fs = require('fs')
const path = require('path')
// const get = require('got')
const axios = require('axios')
const jsonfile = require('jsonfile')
const XmlParser = require('xml2js').Parser
const pMapSeries = require('p-map-series')
const pMapSeries = require('p-map-series')
const a = require('awaiting')

require('dotenv').config()

jsonfile.spaces = 2

const xmlParser = new XmlParser({
  strict: false,
  normalize: true,
  normalizeTags: true,
  explicitArray: false,
})

const parser = xml =>
  new Promise((resolve, reject) =>
    xmlParser.parseString(xml, (error, result) => (error ? reject(error) : resolve(result)))
  )

const get = (url) => {
  console.log('Fetching', url)
  return new Promise(resolve =>
    setTimeout(
      () =>
        axios(url, {
          headers: {
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3039.0 Safari/537.36',
          },
        })
          .then(result => resolve(result.data))
          .catch(async (error) => {
            console.log('error fetching, trying again', error)
            const data = await get(url)
            resolve(data)
          }),
      0
    )
  )
}

const readJson = fileName =>
  jsonfile.readFileSync(path.join(__dirname, [fileName, '.json'].join('')))

const saveJson = (fileName, data) =>
  jsonfile.writeFileSync(path.join(__dirname, ['_', fileName, '.json'].join('')), data)

const fileExists = fileName => fs.existsSync(path.join(__dirname, [fileName, '.json'].join('')))

async function getPrefectureLines () {
  return pMapSeries([...Array(47).keys()], async (itemNumber) => {
    const prefectureId = itemNumber + 1
    const xml = await get(`https://www.ekidata.jp/api/p/${prefectureId}.xml`)
    const data = await parser(xml)

    const { pref: { code, name }, line } = data.ekidata

    return {
      id: Number(code),
      name: { ja: name },
      lines: Array.isArray(line)
        ? line.map(item => ({
          id: Number(item.line_cd),
          name: { ja: item.line_name },
        }))
        : {
          id: Number(line.line_cd),
          name: { ja: line.line_name },
        },
    }
  })
}

async function getLines (lines) {
  return pMapSeries(lines, async (lineId) => {
    const xml = await get(`https://www.ekidata.jp/api/l/${lineId}.xml`)
    const data = await parser(xml)

    const { line, station: stations } = data.ekidata

    return {
      id: Number(line.line_cd),
      name: { ja: line.line_name },
      lat: Number(line.line_lat),
      lng: Number(line.line_lon),
      zoom: Number(line.line_zoom),
      stations: Array.isArray(stations)
        ? stations.map(station => ({
          id: Number(station.station_cd),
          gid: Number(station.station_g_cd),
          name: { ja: station.station_name },
          lat: Number(station.lat),
          lng: Number(station.lon),
        }))
        : [
          {
            id: Number(stations.station_cd),
            gid: Number(stations.station_g_cd),
            name: { ja: stations.station_name },
            lat: Number(stations.lat),
            lng: Number(stations.lon),
          },
        ],
    }
  })
}

async function getStations (stations) {
  return pMapSeries(stations, async (stationId) => {
    const xml = await get(`https://www.ekidata.jp/api/g/${stationId}.xml`)
    const data = await parser(xml)

    if (!data || !data.ekidata) return { gid: stationId }

    const { station, station_g: lines } = data.ekidata

    return {
      id: Number(station.station_cd),
      gid: Number(station.station_g_cd),
      name: { ja: station.station_name },
      lat: Number(station.lat),
      lng: Number(station.lon),
      lines: Array.isArray(lines)
        ? lines.map(line => ({
          id: Number(line.line_cd),
          name: { ja: line.line_name },
        }))
        : [
          {
            id: Number(lines.line_cd),
            name: { ja: lines.line_name },
          },
        ],
    }
  })
}

(async () => {
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
