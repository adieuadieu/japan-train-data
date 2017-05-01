import path from 'path'
import delay from 'delay'
import maps from '@google/maps'
import dotenv from 'dotenv'
import jsonRead from '../utils/json/read'

dotenv.config()

const ROOT = path.resolve(__dirname, '..', '..')

const gcp = jsonRead(path.resolve(ROOT, process.env.GCP_KEYFILE))

const client = maps.createClient({
  key: process.env.GCP_API_KEY,
  // clientId: gcp.client_id,
  // clientSecret: gcp.private_key,
})

export default async function googleReverseGeocode (
  lat = 0,
  lng = 0,
  language = 'ja',
  wait = 0
) {
  console.log('Reverse geocoding', lat, lng, language)

  return new Promise(resolve =>
    delay(wait).then(() =>
      client.reverseGeocode(
        {
          latlng: { lat, lng },
          language,
        },
        async (error, response) => {
          if (error) {
            console.log(
              'error in geocoding, trying again',
              lat,
              lng,
              language,
              error
            )
            const data = await googleReverseGeocode(lat, lng, language, wait)

            return resolve(data)
          }

          return resolve(response.json.results)
        }
      )
    )
  )
}
