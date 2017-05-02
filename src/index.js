import minimist from 'minimist'
import dotenv from 'dotenv'
import writeJson from './utils/json/write'
import generate from './generate'

dotenv.config()

const argv = minimist(process.argv.slice(2))

const run = (async () => {
  const data = await generate()
  writeJson('./lib/raw-data.json', data)
  process.exit()
})()
