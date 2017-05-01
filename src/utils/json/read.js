import path from 'path'
import jsonfile from 'jsonfile'

const ROOT = path.resolve(__dirname, '..', '..', '..')

export default function jsonRead (file) {
  return jsonfile.readFileSync(path.resolve(ROOT, file))
}
