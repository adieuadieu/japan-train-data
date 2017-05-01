import path from 'path'
import jsonfile from 'jsonfile'

jsonfile.spaces = 2

const ROOT = path.resolve(__dirname, '..', '..', '..')

export default function jsonWrite (file, data) {
  return jsonfile.writeFileSync(path.join(ROOT, file), data)
}
