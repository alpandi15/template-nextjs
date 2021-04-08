import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

const Input = ({
  id,
  label,
  placeholder,
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
  input
}) => {
  const inputClassName = cn({
    invalid: touched && error,
    valid: touched && !error
  })

  const labelClassName = cn({
    active: !!input.value,
    invalid: touched && error,
    valid: touched && !error
  })

  return (
    <div
      style={contentStyle}
      className="input-field col"
    >
      {
        iconName ? <i className={`material-icons prefix ${iconClassName}`}>{iconName}</i> : null
      }
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={inputClassName || className}
        {...input}
      />
      <label htmlFor={id} className={labelClassName}>{label}</label>
      {touched && (error && <span className="helper-text" data-error={error} data-success="Valid" />)}
    </div>
  )
}

Input.propTypes = {
  lable: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired
}

export default Input
