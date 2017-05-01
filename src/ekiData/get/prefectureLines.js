import get from '../../utils/get'
import parse from '../../utils/xml/parse'

export default async function ekiDataGetPrefectureLines (prefectureId) {
  const xml = await get(`https://www.ekidata.jp/api/p/${prefectureId}.xml`)
  const data = await parse(xml)

  const { pref: { code, name }, line } = data.ekidata

  return {
    id: Number(code),
    name,
    lines: Array.isArray(line)
      ? line.map(item => ({
        id: Number(item.line_cd),
        name: item.line_name,
      }))
      : [
        {
          id: Number(line.line_cd),
          name: line.line_name,
        },
      ],
  }
}
