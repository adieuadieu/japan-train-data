import { Parser } from 'xml2js'

const xmlParser = new Parser({
  strict: false,
  normalize: true,
  normalizeTags: true,
  explicitArray: false,
})

export default function xmlParse (xml) {
  return new Promise((resolve, reject) =>
    xmlParser.parseString(
      xml,
      (error, result) => (error ? reject(error) : resolve(result))
    )
  )
}
