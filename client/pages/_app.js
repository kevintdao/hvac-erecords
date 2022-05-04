import NavBar from '../components/NavBar'
import '../styles/globals.css'
import { AppProvider } from '../context/state'
import { LoadingProvider } from '../context/loading'

function MyApp ({ Component, pageProps }) {

  return (
    <LoadingProvider>
      <AppProvider>
        <NavBar/>
        <div className='max-w-5xl px-2 container mx-auto pb-3'>
          <Component {...pageProps} />
        </div>
      </AppProvider>
    </LoadingProvider>
  )
}

export default MyApp
