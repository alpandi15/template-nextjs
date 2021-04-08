import PropTypes from 'prop-types'
import { toast } from 'react-toastify'

const toastify = ({
  type,
  message,
  duration = 2000
}) => {
  if (type === 'success'
  || type === 'error'
  || type === 'warn'
  || type === 'info'
  || type === 'dark'
  ) {
    toast[`${type}`](message, {
      position: 'bottom-center',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  } else {
    toast.dark('Error Type, [success, error, warn]', {
      position: 'top-center',
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
  }
}

toastify.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export {
  toastify
}
