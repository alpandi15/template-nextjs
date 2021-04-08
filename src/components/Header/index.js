/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react'
import Router from 'next/router'
import color from '../../theme/color'

const styles = {
  contentHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  buttonBack: {
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: color.secondaryColor
  },
  title: {
    fontSize: '18px'
  },
  textColor: {
    color: color.white
  },
  titleStyle: {
    marginLeft: '10px',
    fontWeight: '600',
    fontSize: '15px'
  }
}

const Header = ({
  transparent,
  // backgroundColor = color.white,
  textStyle = styles.textColor,
  titleStyle = {},
  title,
  children
}) => {
  const goBack = () => {
    const standRoute = [
      'variant',
      'category',
      'payment',
      'voucher',
      'discount'
    ]
    const rSplit = Router.asPath.split('/')
    if (standRoute.includes(rSplit[rSplit.length - 1]) && rSplit[1] === 'stand') {
      if (rSplit[2] === 'order' && rSplit[3] === 'create') {
        return Router.back()
      }
      return Router.replace('/stand/home')
    } if (rSplit[1] === 'stand' && rSplit[2] === 'auth') {
      return Router.push('/')
    }

    // Routing customer
    // /home/stand/:id
    if (rSplit[1] === 'home' && rSplit[2] === 'stand' && rSplit.length === 4) {
      return Router.replace('/home')
    }

    return Router.back()
  }

  return (
    <div className="navbar-fixed">
      <nav className={transparent ? 'transparent' : 'scroll'}>
        <div className="nav-wrapper">
          <div className="mobile-layout-header" style={styles.contentHeader}>
            <div
              className="nav-prev-button waves-effect"
              style={textStyle}
              onClick={goBack}
            >
              <i className="material-icons">arrow_back</i>
            </div>
            <div className="title-header">
              {
                children || (!transparent && title ? (
                  <div style={{ ...styles.titleStyle, ...titleStyle }}>{title}</div>
                ) : null)
              }
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
