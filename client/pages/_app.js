import NavBar from '../components/NavBar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <NavBar />
      <div className="max-w-4xl px-2 container mx-auto">
        <Component {...pageProps} />
      </div>
    </div>
  )
}

export default MyApp
