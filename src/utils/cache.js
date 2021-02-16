import LRUCache from 'lru-cache'

const dev = process.env.NODE_ENV !== 'production'

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

export default async function renderAndCache (app, req, res, pagePath, queryParams) {
  const key = getCacheKey(req)
  // If we have a page in the cache, let's serve it
  if (!dev && ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(
      req, res, pagePath,
      queryParams ? req[queryParams] : { ...req.query, ...req.params }
    )
    console.log('INI RENDERING ', html)
    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }
    // Let's cache this page
    if (!dev) {
      ssrCache.set(key, html)
    }

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams ? req[queryParams] : { ...req.query, ...req.params })
  }
}
