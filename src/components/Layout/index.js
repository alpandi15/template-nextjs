import React from 'react'
import Head from 'next/head'
import Link from 'next/link'

export const siteTitle = 'Next.js Sample Website'
const Layout = ({ children, home }) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
          {/* <meta httpEquiv="Content-Security-Policy" content="default-src *; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval' http://platform.linkedin.com " /> */}
          <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <link async rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
          <link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
          <link async rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;800&display=swap" />
          <meta name="theme-color" content="#FB770D" />
      </Head>
      <header>
        <h2>Header</h2>
      </header>
      <main>
        {children}
      </main>
      {!home && (
        <div>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Layout
