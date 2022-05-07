import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { AppProvider } from '../context/state'
import { LoadingProvider } from '../context/loading'

function MyApp ({ Component, pageProps }) {

  return (
    <LoadingProvider>
      <AppProvider>
        <div className='min-h-screen'>
          <NavBar/>
          <div className='max-w-5xl px-2 container mx-auto pb-3 flex-grow'>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </AppProvider>
    </LoadingProvider>
  )
}

export default MyApp
