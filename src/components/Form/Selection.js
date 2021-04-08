import React from 'react'
import PropTypes from 'prop-types'
import { Select } from 'react-materialize'

const Selection = ({
  label,
  className,
  options = [],
  multiple = false,
  onChange,
  // defaultValue,
  browserDefault,
  meta: {
    touched,
    error
  },
  input
}) => {
  return (
    <div style={{ position: 'relative', display: 'flex', width: '100%' }}>
      <Select
        id="Select-9"
        className={className}
        label={label}
        multiple={multiple}
        noLayout
        browserDefault={browserDefault}
        onChange={onChange}
        error={error}
        {...input}
        options={{
          classes: '',
          dropdownOptions: {
            alignment: 'left',
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250
          }
        }}
        value={String(input.value)}
      >
        {
          options && options.map((val, index) => (
            <option value={val.value} key={index}>
              {val.label}
            </option>
          ))
        }
      </Select>
      <div
        className="invalid"
        style={{
          color: '#F44336', position: 'absolute', right: '27px', top: '33px'
        }}
      >
        {error && <span className="helper-text">{error}</span>}
      </div>
    </div>
  )
}

Selection.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
  browserDefault: PropTypes.bool
}

export default Selection
