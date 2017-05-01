import fs from 'fs'
import path from 'path'

export default function fileExists (file) {
  return fs.existsSync(path.join(__dirname, file))
}
