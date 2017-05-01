import Queue from 'p-queue'
import { pick } from 'ramda'
import {
  QUEUE_CONFIG,
  TRANSLATE_TO,
  KNOWN_ADDRESS_COMPONENTS,
} from '../constants'
import camelise from '../utils/string/camelise'
import reverseGeocode from './reverseGeocode'

const queue = new Queue({ ...QUEUE_CONFIG, concurrency: 10 })

setInterval(() => {
  console.log(`Geocoding Queue: size ${queue.size}, pending ${queue.pending}`)
}, 10000)

function mapLongShort (type, long, short) {
  switch (type) {
    case 'country':
      return short
    default:
      return long
  }
}

function getComponents (address) {
  const components = address.reduce(
    (object, { types, long_name: long, short_name: short }) => ({
      ...object,
      ...types.reduce(
        (typesObject, type) => ({
          ...typesObject,
          [camelise(type)]: mapLongShort(type, long, short),
        }),
        {}
      ),
    }),
    {}
  )

  if (!components.countryCode && components.country) {
    components.countryCode = components.country
  }
  if (!components.locality1 && components.locality) {
    components.locality1 = components.locality
  }
  if (!components.locality1 && components.ward) {
    components.locality1 = components.ward
  }
  if (!components.sublocality1 && components.sublocality) {
    components.sublocality1 = components.sublocality
  }

  return pick(KNOWN_ADDRESS_COMPONENTS, components)
}

export default function googleGeocoding (
  lat,
  lng,
  languages = [...TRANSLATE_TO, 'ja']
) {
  return Promise.all(
    languages.map(language =>
      queue.add(() => reverseGeocode(lat, lng, language)).then(result => ({
        [language]: getComponents(result[0].address_components),
      }))
    )
  )
    .then(data => data.reduce((reduced, item) => ({ ...reduced, ...item }), {}))
    .then(data =>
      KNOWN_ADDRESS_COMPONENTS.reduce(
        (reduced, component) => ({
          ...reduced,
          [component]: languages.reduce(
            (reducedComponent, language) => ({
              ...reducedComponent,
              [language]: data[language][component],
            }),
            {}
          ),
        }),
        { lat, lng }
      )
    )
}
