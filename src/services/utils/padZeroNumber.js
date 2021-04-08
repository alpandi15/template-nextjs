function pad (num, size) {
  let s = `000000000${num}`
  if (String(num).length > size) {
    return num
  }
  return s.substr(s.length - size)
}

export {
  pad
}
