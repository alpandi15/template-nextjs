import React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
  componentDidUpdate (prevProps) {
    const { location } = this.props
    if (
      location.pathname !== prevProps.location.pathname
    ) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  render () {
    return null
  }
}

export default withRouter(ScrollToTop)
