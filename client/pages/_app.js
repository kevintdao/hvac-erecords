import NavBar from '../components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar role='Maintenance Company' />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
