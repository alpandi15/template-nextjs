import React from 'react'
import PropTypes from 'prop-types'
import Document, {
  Html, Head, Main, NextScript
} from 'next/document'
import Helmet from 'react-helmet'
import CustomHelmet from 'components/CustomHelmet'
import { ServerStyleSheet } from 'styled-components'
// import theme from 'theme/color'

class MyDocument extends Document {
  static async getInitialProps (...args) {
    const documentProps = await super.getInitialProps(...args)
    // see https://github.com/nfl/react-helmet#server-usage for more information
    // 'head' was occupied by 'renderPage().head', we cannot use it
    return { ...documentProps, helmet: Helmet.renderStatic() }
  }

  static contextTypes () {
    return {
      helmet: PropTypes.object
    }
  }

  // should render on <html>
  get helmetHtmlAttrComponents () {
    return this.props.helmet.htmlAttributes.toComponent()
  }

  // should render on <body>
  get helmetBodyAttrComponents () {
    return this.props.helmet.bodyAttributes.toComponent()
  }

  // should render on <head>
  get helmetHeadComponents () {
    return Object.keys(this.props.helmet)
      .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
      .map((el) => this.props.helmet[el].toComponent())
  }

  static helmetJsx () {
    return (
      <CustomHelmet />
    )
  }

  render () {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />
          {/* <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1.0, maximum-scale=5, width=device-width"
          /> */}
          {this.helmetJsx}
          <meta name="application-name" content="Foodcourt Management" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="Foodcourt Management" />
          <meta name="description" content="Description" />
          <meta name="format-detection" content="telephone=no" />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />
          <meta name="theme-color" content="#000000" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="keywords" content="Keywords" />
          <link async rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.json" />
          <link async rel="stylesheet" type="text/css" href="/assets/css/materialize.min.css" />
          <link async rel="stylesheet" type="text/css" href="/css/app.css" />
          <link async rel="stylesheet" type="text/css" href="/assets/css/ReactToastify.min.css" />

          <link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap" />

          <script src="/assets/js/materialize.min.js" />
          <link rel="stylesheet" async type="text/css" href="/nprogress.css" />
          <meta name="theme-color" content="#FB770D" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheet()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () => originalRenderPage({
    enhanceApp: (App) => (props) => sheets.collectStyles(<App {...props} />)
  })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      <React.Fragment key="styles">
        {initialProps.styles}
      </React.Fragment>
    ]
  }
}

export default MyDocument
