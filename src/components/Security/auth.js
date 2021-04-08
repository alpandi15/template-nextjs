import { Component } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

export const loggedSessionTable = async ({
  session_token
}) => {
  cookie.set('session_table', session_token, { expires: 1 })
}

export const removeSessionTable = async () => {
  cookie.remove('session_table')
}

export const loggedin = async ({
  access_token, guard
}) => {
  cookie.set(`access_token_${guard}`, access_token, { expires: 7 })
  // if (path) {
  //   Router.push(path)
  // } else {
  //   Router.push('/')
  // }
}

export const logout = (guard) => {
  // to support logging out from all windows
  cookie.remove(`access_token_${guard}`)
  cookie.remove('session_table')
  window.localStorage.setItem(`logout_${guard}`, Date.now())
  if (guard === 'user') {
    Router.push('/main')
  }
  if (guard === 'stand') {
    Router.push('/stand/auth/login')
  }
  if (guard === 'owner') {
    Router.push('/owner/auth/login')
  }
}

const getDisplayName = Component => Component.displayName || Component.name || 'Component'

export const auth = (ctx, guard) => {
  const tokenData = nextCookie(ctx)
  const token = tokenData[`access_token_${guard}`]
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */

  if (ctx.req && !token) {
    let redirect
    if (guard === 'user') {
      redirect = ctx
      && ctx.pathname
      && ctx.pathname !== '/auth/login'
        ? '/auth/login?path=/home'
        : '/auth/login'
    }
    if (guard === 'owner') {
      redirect = ctx
      && ctx.pathname
      && ctx.pathname !== '/owner/auth/login'
        ? '/owner/auth/login?path=/owner/home/selection'
        : '/owner/auth/login'
    }
    if (guard === 'stand') {
      redirect = ctx
      && ctx.pathname
      && ctx.pathname !== '/stand/auth/login'
        ? '/stand/auth/login?path=/stand/home'
        : '/stand/auth/login'
    }

    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (!token) {
    if (guard === 'user') {
      if (ctx && ctx.pathname && ctx.pathname !== '/auth/login') {
        // Router.push(`/auth/login?path=${ctx.req.url}`)
        Router.push('/auth/login?path=/home')
      } else {
        Router.push('/auth/login')
      }
    }
    if (guard === 'owner') {
      if (ctx && ctx.pathname && ctx.pathname !== '/owner/auth/login') {
        Router.push('/owner/auth/login?path=/home')
      } else {
        Router.push('/owner/auth/login')
      }
    }
    if (guard === 'stand') {
      if (ctx && ctx.pathname && ctx.pathname !== '/stand/auth/login') {
        Router.push('/stand/auth/login?path=/home')
      } else {
        Router.push('/stand/auth/login')
      }
    }
  }

  return token
}

export const withAuthSync = WrappedComponent => class extends Component {
  static displayName = `withAuthSync(${getDisplayName(WrappedComponent)})`

  static async getInitialProps (ctx) {
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx))

    const token = await auth(ctx, componentProps.guard)
    return { ...componentProps, token }
  }

  constructor (props) {
    super(props)

    this.syncLogout = this.syncLogout.bind(this)
  }

  componentDidMount () {
    window.addEventListener('storage', this.syncLogout)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.syncLogout)
    window.localStorage.removeItem('logout')
  }

  syncLogout = (event) => {
    if (event.key === 'logout') {
      Router.push('/auth/login')
    }
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}

export const isLogged = (ctx, guard) => {
  const tokenData = nextCookie(ctx)
  const token = tokenData[`access_token_${guard}`]
  /*
   * This happens on server only, ctx.req is available means it's being
   * rendered on server. If we are on server and token is not available,
   * means user is not logged in.
   */
  if (ctx.req && token) {
    let redirect
    if (guard === 'user') {
      redirect = '/main'
    }
    if (guard === 'owner') {
      redirect = '/owner/home'
    }
    if (guard === 'stand') {
      redirect = '/stand'
    }

    ctx.res.writeHead(302, {
      Location: redirect
    })
    ctx.res.end()
    return
  }

  // We already checked for server. This should only happen on client.
  if (token) {
    let redirect
    if (guard === 'user') {
      redirect = '/main'
    }
    if (guard === 'owner') {
      redirect = '/owner/home'
    }
    if (guard === 'stand') {
      redirect = '/stand'
    }
    Router.push(redirect)
  }

  return token
}

export const loggedChecked = WrappedComponent => class extends Component {
  static displayName = `loggedChecked(${getDisplayName(WrappedComponent)})`

  static async getInitialProps (ctx) {
    const componentProps = WrappedComponent.getInitialProps
    && (await WrappedComponent.getInitialProps(ctx))

    const token = isLogged(ctx, componentProps.guard)
    return { ...componentProps, token }
  }

  constructor (props) {
    super(props)

    this.syncLogout = this.syncLogout.bind(this)
  }

  componentDidMount () {
    window.addEventListener('storage', this.syncLogout)
  }

  componentWillUnmount () {
    window.removeEventListener('storage', this.syncLogout)
    window.localStorage.removeItem('logout')
  }

  syncLogout = (event) => {
    if (event.key === 'logout') {
      Router.push('/auth/login')
    }
  }

  render () {
    return <WrappedComponent {...this.props} />
  }
}
