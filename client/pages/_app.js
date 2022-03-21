import NavBar from '../components/NavBar'
import '../styles/globals.css'
import { AppProvider } from '../context/state'

function MyApp({ Component, pageProps }) {
  return (
    <AppProvider>
      <NavBar role="Maintenance Company"/>
      <div className="max-w-5xl px-2 container mx-auto">
        <Component {...pageProps} />
      </div>
    </AppProvider>
  )
}

export default MyApp
