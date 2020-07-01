export function formatDate(item) {
  for (let key in item) {
    if (key.indexOf('date') !== -1) {
      if(item[key]!==null){
        item[key] = new Date(item[key]).toLocaleDateString()
      }
    }
  }
  return item
}