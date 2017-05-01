import Queue from 'p-queue'
import { QUEUE_CONFIG, TRANSLATE_TO } from '../constants'
import translate from './translate'

const queue = new Queue({ ...QUEUE_CONFIG, concurrency: 10 })

setInterval(() => {
  console.log(
    `Translations Queue: size ${queue.size}, pending ${queue.pending}`
  )
}, 10000)

export default function googleTranslations (
  string,
  to = TRANSLATE_TO,
  from = 'ja'
) {
  return Promise.all(
    to.map(language =>
      queue
        .add(() => translate(string, language, from))
        .then(translation => ({ [language]: translation }))
    )
  ).then(translations =>
    translations.reduce(
      (reduced, translation) => ({ ...reduced, ...translation }),
      { [from]: string }
    )
  )
}
