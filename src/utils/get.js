import axios from 'axios'
import delay from 'delay'

const DEFAULT_USER_AGENT = [
  'Mozilla/5.0',
  '(X11; Linux x86_64)',
  'AppleWebKit/537.36',
  '(KHTML, like Gecko)',
  'Chrome/59.0.3039.0',
  'Safari/537.36',
].join(' ')

export default function get (
  url,
  { wait = 0, userAgent = DEFAULT_USER_AGENT } = {}
) {
  console.log('Fetching', url)

  return new Promise(resolve =>
    delay(wait).then(() =>
      axios(url, {
        headers: {
          'user-agent': userAgent,
        },
      })
        .then(result => resolve(result.data))
        .catch(async (error) => {
          console.log('error fetching, trying again', url, error)
          const data = await get(url)

          resolve(data)
        })
    )
  )
}
