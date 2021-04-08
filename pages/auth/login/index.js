import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import Link from 'next/link'
import { logout, loggedChecked } from 'components/Security/auth'
import TextInput from 'components/Form/Input'
import { withRouter } from 'next/router'
import { loginUser, getUserData, logoutUser } from 'actions/auth/authAction'
import CustomHelmet from 'components/CustomHelmet'
import { toastify } from 'components/Toast/Toastify'
import { GUARD_USER } from 'constants'

class Login extends React.Component {
  static getInitialProps = () => {
    return {
      guard: 'user'
    }
  }

  onSubmit = async (values) => {
    console.log('VALUE ', values)
    const { router, getUserData, loginUser } = this.props
    const { path } = router.query

    const result = await loginUser({
      username: values.email,
      password: values.password
    }, GUARD_USER, router.query.path)

    console.log('RESPONSE USER ', result)
    if (result.success) {
      const resUser = await getUserData(GUARD_USER)
      console.log('GET USER ', resUser)
      if (resUser.success) {
        if (resUser.data && resUser.data.roleId === 1) {
          toastify({
            type: 'success',
            message: result.meta.message
          })
          if (path) {
            router.push(path)
          } else {
            router.push('/home')
          }
        } else {
          logout(GUARD_USER)
          logoutUser(GUARD_USER)
          toastify({
            type: 'error',
            message: 'Unauthenticated'
          })
        }
      } else {
        toastify({
          type: 'error',
          message: 'Login Error'
        })
      }
    } else {
      // alert(result.message)
      toastify({
        type: 'error',
        message: result.message
      })
    }
  }

  render () {
    const { handleSubmit, invalid, submitting } = this.props

    return (
      <>
        <CustomHelmet title="Masuk" />
        <div className="mobile-layout-content with-header height100 d-flex justify-content-center align-items-center">
          <div className="login">
            <div className="logo-login">
              <img src="/image/login.png" alt="login" />
            </div>
            <div className="login-form">
              <div className="text-login">
                <div>Login</div>
                <div>Masuk ke akun kamu</div>
              </div>
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <div>
                  <Field
                    id="email"
                    name="email"
                    label="Email atau Username"
                    type="text"
                    component={TextInput}
                  />
                  <Field
                    id="password"
                    name="password"
                    label="Kata Sandi"
                    type="password"
                    component={TextInput}
                  />
                </div>
                <div>
                  <button type="submit" disabled={invalid || submitting} className="waves-effect waves-light btn btn-app">Masuk</button>
                  <div className="forgot-password">
                    <Link href="/auth/forgot-password">
                      <a className="color-primary waves-effect">
                        Lupa Password
                      </a>
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    guard: 'user'
  }
}

const mapDispatchToProps = (dispatch) => ({
  loginUser: (data, guard, path) => dispatch(loginUser(data, guard, path)),
  getUserData: (guard) => dispatch(getUserData(guard)),
  logoutUser: (guard) => dispatch(logoutUser(guard))
})

export default loggedChecked(
  reduxForm({
    form: 'FormLogin'
    // validate
  })(connect(mapStateToProps, mapDispatchToProps)(withRouter(Login)))
)
