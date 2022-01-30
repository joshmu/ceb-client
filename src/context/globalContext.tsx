import { createContext, ReactNode, useContext } from 'react'
import { useFetchCryptoLogs } from '../hooks/useFetchCryptoLogs'
import { useCryptoStats } from '../hooks/useCryptoStats'
import { LogType } from '../types/d'

interface AppContextInterface {
  totalRecords: number
  totalPages: number
  logs: LogType[]
  errors: Error[]
  isLoading: boolean
}

export const AppContext = createContext<AppContextInterface>(null!)

type AppProviderProps = {
  pageProps: { totalRecords: number; totalPages: number }
  children: ReactNode
}

export const AppProvider = ({
  pageProps,
  children,
}: AppProviderProps): JSX.Element => {
  const { totalRecords, totalPages } = pageProps

  const { logs, isLoading, errors } = useFetchCryptoLogs({ totalPages })
  const stats = useCryptoStats({ logs })

  const state = { totalRecords, totalPages, logs, ...stats, isLoading, errors }

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>
}

export const useAppContext = (): AppContextInterface => {
  return useContext(AppContext)
}
