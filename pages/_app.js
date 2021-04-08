import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { Provider } from 'react-redux'
import withRedux from 'next-redux-wrapper'
import NProgress from 'nprogress'
import Router from 'next/router'
import CustomHelmet from 'components/CustomHelmet'
import OfflineSupport from 'components/OfflineSupport'
import Toaster from 'components/Toast'
import getPageContext from 'utils/getPageContext'
import store from '../src/store'
// const theme = {
//   colors: {
//     primary: '#0070f3'
//   }
// }

Router.events.on('routeChangeStart', () => NProgress.start())

Router.events.on('routeChangeComplete', () => NProgress.done())

Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  constructor () {
    super()
    this.pageContext = getPageContext()
  }

  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  componentDidMount () {
    document.body.style.overflow = null
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles)
    }

    if (process.env.NODE_ENV === 'production') {
      window.OneSignal = window.OneSignal || []
      const { OneSignal } = window
      OneSignal.push(() => {
        OneSignal.init(
          {
            appId: '2c302888-7881-4de7-93ca-da25672b552c', // STEP 9
            notifyButton: {
              enable: true
            },
            subdomainName: 'foodcourt-mdn'
          }
          // /** Automatically subscribe to the new_app_version tag */
          // OneSignal.sendTag('new_app_version', 'new_app_version', (tagsSent) => {
          //   // Callback called when tag has finished sending
          //   console.log('new_app_version TAG SENT', tagsSent)
          // })
        )
      })
    }
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <>
        <OfflineSupport />
        <Provider store={store}>
          <div className="next-root">
            <Head>
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1.0, maximum-scale=5, width=device-width"
              />
            </Head>
            <CustomHelmet />
            <Component pageContext={this.pageContext} {...pageProps} />
            <Toaster />
          </div>
        </Provider>
      </>
    )
  }
}

const makeStore = () => {
  return store
}

export default withRedux(makeStore)(MyApp)
