/* eslint-disable no-undef */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Input = ({
  id,
  label,
  placeholder,
  name,
  type = 'text',
  meta: {
    touched,
    error
  },
  contentStyle,
  iconName,
  className = '',
  iconClassName,
  // active = false,
  input,
  ...others
}) => {
  const [value, setValue] = React.useState(null)
  const refDate = React.createRef()

  const handleDate = () => {
    // ref.current.value = value
    // input.onChange(value)
    console.log('Handle Chagne ', refDate.current)
    // console.log('TEST ', e)
  }

  React.useEffect(() => {
    let elemDate = document.querySelectorAll('.datepicker')
    M.Datepicker.init(elemDate, {
      format: 'dd/mm/yyyy',
      minDate: new Date(),
      i18n: {
        cancel: 'Batal',
        clear: 'Hapus',
        done: 'Ok'
      },
      onClose: handleDate
      // onSelect: e => setValue(e)
    })
  }, [])

  console.log('INPUT DATE ', input)
  return (
    <div
      style={contentStyle}
      className="input-field col"
    >
      {
        iconName ? <i className={`material-icons prefix ${iconClassName}`}>{iconName}</i> : null
      }
      <input
        // name={input.name}
        className="datepicker"
        ref={refDate}
        // id={id}
        // type={type}
        // placeholder={placeholder}
        // ref={ref}
        // name={input.name}
        // value={input.value}
        // onChange={e => input.onChange(e)}
        // onFocus={input.onFocus}
        // className={`datepicker ${touched ? (error ? `${className} invalid` : `${className} valid`) : className}`}
        {...input}
        // {...others}
      />
      <label htmlFor={id} className={`active ${touched ? (error ? 'invalid' : 'valid') : ''}`}>{label}</label>
      {touched && (error && <span className="helper-text" data-error={error} data-success="Valid" />)}
    </div>
  )
}

Input.propTypes = {
  lable: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool
}

export default Input
