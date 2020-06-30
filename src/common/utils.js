export function formatDate(item) {
  for (let key in item) {
    if (key.indexOf('date') !== -1) {
      item[key] = new Date(item[key]).toLocaleDateString()
    }
  }
  return item
}