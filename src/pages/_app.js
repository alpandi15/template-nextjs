import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  return (
    <div className="next-root">
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
