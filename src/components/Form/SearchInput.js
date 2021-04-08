import React from 'react'

const SearchInput = ({
  id,
  placeholder,
  autoComplete,
  onClick,
  disabled,
  onChange,
  autoFocus,
  input
}) => {
  const inputRef = React.useRef(null)

  React.useEffect(() => {
    if (autoFocus) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <div className="d-flex align-items-center contain-search-input"
      onClick={onClick}
    >
      <div className="icon-search">
        <img src="/Icon/Search.svg" className="icon-gray" alt="" />
      </div>
      <input
        id={id}
        type="text"
        placeholder={placeholder}
        className="search-input"
        autoComplete={autoComplete}
        disabled={disabled}
        onChange={onChange}
        ref={inputRef}
        {...input}
      />
    </div>
  )
}

export default SearchInput
