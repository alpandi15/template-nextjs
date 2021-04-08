import React from 'react'
import { withRouter } from 'next/router'
import { withAuthSync } from 'components/Security/auth'

class Home extends React.Component {
  static getInitialProps = () => {
    return {
      guard: 'user'
    }
  }

  render () {
    return (
      <>
        Halaman Home
      </>
    )
  }
}

export default withAuthSync(withRouter(Home))
