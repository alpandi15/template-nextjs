import React from 'react'
import PropTypes from 'prop-types'

const Switch = ({
  id,
  label,
  placeholder,
  meta: {
    touched,
    error
  },
  className = '',
  labelRight,
  labelLeft,
  input
}) => {
  return (
    <>
      <label>{label}</label>
      <div className="switch">
        <label>
          {labelLeft}
          <input
            type="checkbox"
            id={id}
            placeholder={placeholder}
            className={touched ? (error ? `${className} invalid` : `${className} valid`) : className}
            checked={input.value}
            {...input}
          />
          <span className="lever" />
          {labelRight}
        </label>
      </div>
    </>
  )
}

Switch.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool
}

export default Switch
