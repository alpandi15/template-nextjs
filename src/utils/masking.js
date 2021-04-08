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

export {
  formatCurrency,
  normalizeAmount
}
