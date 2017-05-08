export const CONCURRENCY = 5

// Japan has 47 prefectures (but we don't want index 0, hence 48)
export const JAPAN_PREFECTURE_IDS = [...Array(48).keys()].slice(1)

export const QUEUE_CONFIG = { concurrency: CONCURRENCY }

export const TRANSLATE_TO = ['en']

export const KNOWN_ADDRESS_COMPONENTS = [
  'countryCode',
  'postalCode',
  'administrativeArea1',
  'ward',
  'locality1',
  'sublocality1',
  'sublocality2',
  'sublocality3',
  'sublocality4',
]
