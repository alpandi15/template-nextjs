function convertToRupiah (angka) {
  let rupiah = ''
  let angkarev = angka.toString().split('').reverse().join('')
  for (let i = 0; i < angkarev.length; i += 1) if (i % 3 === 0) rupiah += `${angkarev.substr(i, 3)}.`
  return `Rp ${rupiah.split('', rupiah.length - 1).reverse().join('')}`
}
/**
 * Usage example:
 * alert(convertToRupiah(10000000)); -> "Rp. 10.000.000"
 */

function convertToAngka (rupiah) {
  return parseInt(rupiah.replace(/,.*|[^0-9]/g, ''), 10)
}

export {
  convertToAngka,
  convertToRupiah
}
