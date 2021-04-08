import Cookies from 'js-cookie'

const getCookies = async (key) => {
  let data = []
  try {
    data = Cookies.get(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const setCookies = async (key, data, options = {}) => {
  try {
    Cookies.set(key, data, options)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const removeCookies = async (key) => {
  try {
    const removeProgress = Cookies.remove(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const getSessionTable = () => {
  const session = Cookies.get('session_table')

  return session || null
}

const getAccessToken = (guard) => {
  // let data = localStorage.getItem(`access_token_${guard}`)
  const data = Cookies.get(`access_token_${guard}`)
  const parsed = data || null
  return parsed
}

const getRefreshToken = (guard) => {
  // let data = localStorage.getItem(`access_token_${guard}`)
  const data = Cookies.get(`refresh_token_${guard}`)
  const parsed = data || null
  return parsed
}

const get = async (key) => {
  let data = []
  try {
    data = localStorage.getItem(key)
    return data
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const set = async (key, data) => {
  try {
    localStorage.setItem(key, data)
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}

const remove = async (key) => {
  try {
    const removeProgress = localStorage.removeItem(key)
    return removeProgress
  } catch (error) {
    console.log('Storage Failed:', error)
  }
}
export {
  getCookies,
  setCookies,
  removeCookies,
  getSessionTable,
  getAccessToken,
  getRefreshToken,
  get,
  set,
  remove
}
