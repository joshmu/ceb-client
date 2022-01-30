import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppProvider } from '../src/context/globalContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider pageProps={pageProps}>
      <Component {...pageProps} />
    </AppProvider>
  )
}

export default MyApp
