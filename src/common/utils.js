export function formatDate(item) {
    for (let key in item) {
        if (key.indexOf('date') !== -1) {
            if (item[key] !== null) {
                item[key] = new Date(item[key]).toLocaleDateString()
            }
        }
    }
    return item
}

export function debounce(func, delay = 100) {
    let timer = null
    return function (...args) {
        if (timer)
            clearTimeout(timer)
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}