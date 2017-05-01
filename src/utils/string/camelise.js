export default function camelise (string = '') {
  return string
    .replace('_level_', '_')
    .split('_')
    .map(
      (item, index) =>
        (index === 0 ? item : item.charAt(0).toUpperCase() + item.slice(1))
    )
    .join('')
}
