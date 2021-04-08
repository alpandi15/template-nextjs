import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { DESCRIPTION, APPNAME } from 'constants'
// import color from '../../theme/color'

const CustomHelmet = ({
  title,
  meta = [],
  children,
  ...props
}) => {
  return (
    <Helmet
      htmlAttributes={{ lang: 'en' }}
      title={`${title} | ${DESCRIPTION}`}
      meta={([
        { name: 'theme-color', content: '#000' },
        { name: 'description', content: DESCRIPTION },
        { name: 'viewport', content: 'minimum-scale=1, initial-scale=1.0, maximum-scale=1.0, width=device-width' },
        { property: 'og:title', content: `${title} | ${DESCRIPTION}` }
      ]).concat(meta)}
      {...props}
    >
      {children}
    </Helmet>
  )
}

CustomHelmet.propTypes = {
  meta: PropTypes.array,
  title: PropTypes.string
}

CustomHelmet.defaultProps = {
  meta: [],
  title: APPNAME
}

export default CustomHelmet
