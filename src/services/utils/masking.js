const formatCurrency = (input) => {
  if (!input) return

  return input
    .replace(/[^0-9.]/g, '')
    .replace(/,/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const normalizeAmount = (val) => {
  return val.replace(/,/g, '')
}

const formatTimes = (input) => {
  if (!input) return
  return input
    .replace(/[^\dh:]/, '')
    .replace(/^[^0-2]/, '')
    .replace(/^([2-9])[4-9]/, '$1')
    .replace(/^\d[:h]/, '')
    .replace(/^([01][0-9])[^:h]/, '$1')
    .replace(/^(2[0-3])[^:h]/, '$1')
    .replace(/^(\d{2}[:h])[^0-5]/, '$1')
    .replace(/^(\d{2}h)./, '$1')
    .replace(/^(\d{2}:[0-5])[^0-9]/, '$1')
    .replace(/^(\d{2}:\d[0-9])./, '$1')
}

export {
  formatCurrency,
  normalizeAmount,
  formatTimes
}
