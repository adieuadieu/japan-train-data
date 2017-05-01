import path from 'path'
import delay from 'delay'
import translate from '@google-cloud/translate'
import dotenv from 'dotenv'

dotenv.config()

const ROOT = path.resolve(__dirname, '..', '..')

const client = translate({
  projectId: process.env.GCP_PROJECT,
  keyFilename: path.resolve(ROOT, process.env.GCP_KEYFILE),
})

// @TODO: translate() accepts an array of strings that get translated in one go.
// would be more effcient to do that.
// @TODO: cache the translations and use cache if string already previously translated
export default async function googleTranslate (
  string,
  to = 'en',
  from = 'ja',
  format = 'text',
  wait = 0
) {
  console.log(`Translating ${from} string ${string} to ${to}`)

  return new Promise(resolve =>
    delay(wait).then(() =>
      client
        .translate(string, { format, to, from })
        .then(([translation]) => resolve(translation))
        .catch(async (error) => {
          console.log('error in translation, trying again', string, to, error)
          const data = await googleTranslate(string, to, from, format, wait)

          resolve(data)
        })
    )
  )
}
