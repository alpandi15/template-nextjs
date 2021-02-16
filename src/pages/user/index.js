import React from 'react'
import Head from 'next/head'
import Layout from '../../components/Layout'

const User = () => {
  return (
    <Layout>
      <Head>
        <title>Halaman User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        Ini Halaman User
      </div>
    </Layout>
  )
}

export default User
