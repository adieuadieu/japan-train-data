import get from '../../utils/get'
import parse from '../../utils/xml/parse'

export default async function ekiDataGetStation (stationId) {
  const xml = await get(`https://www.ekidata.jp/api/g/${stationId}.xml`)
  const data = await parse(xml)

  if (!data || !data.ekidata) return { gid: stationId }

  const { station, station_g: lines } = data.ekidata

  return {
    id: Number(station.station_cd),
    gid: Number(station.station_g_cd),
    name: station.station_name,
    lat: Number(station.lat),
    lng: Number(station.lon),
    lines: Array.isArray(lines)
      ? lines.map(line => ({
        id: Number(line.line_cd),
        name: line.line_name,
      }))
      : [
        {
          id: Number(lines.line_cd),
          name: lines.line_name,
        },
      ],
  }
}
