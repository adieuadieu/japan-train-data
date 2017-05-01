import get from '../../utils/get'
import parse from '../../utils/xml/parse'

export default async function ekiDataGetLine (lineId) {
  const xml = await get(`https://www.ekidata.jp/api/l/${lineId}.xml`)
  const data = await parse(xml)

  const { line, station: stations } = data.ekidata

  return {
    id: Number(line.line_cd),
    name: line.line_name,
    lat: Number(line.line_lat),
    lng: Number(line.line_lon),
    zoom: Number(line.line_zoom),
    stations: Array.isArray(stations)
      ? stations.map(station => ({
        id: Number(station.station_cd),
        gid: Number(station.station_g_cd),
        name: station.station_name,
        lat: Number(station.lat),
        lng: Number(station.lon),
      }))
      : [
        {
          id: Number(stations.station_cd),
          gid: Number(stations.station_g_cd),
          name: stations.station_name,
          lat: Number(stations.lat),
          lng: Number(stations.lon),
        },
      ],
  }
}
