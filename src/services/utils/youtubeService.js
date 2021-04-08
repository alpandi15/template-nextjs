const getId = (url) => {
  let regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\\&v=)([^#\\&\\?]*).*/
  let match = url.match(regExp)

  if (match && match[2].length === 11) {
    return match[2]
  }
  return 'error'
}

const getThumbnail = (url) => {
  const ID = getId(url)
  const embed = `https://img.youtube.com/vi/${ID}/sddefault.jpg`

  return embed
}

const getEmbed = (url) => {
  const ID = getId(url)
  const embed = `https://www.youtube.com/embed/${ID}`

  return embed
}

export {
  getId,
  getThumbnail,
  getEmbed
}
