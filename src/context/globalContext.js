import React, { createContext, useState, useEffect } from 'react'
import useCebData from '../hooks/useCebData'

const defaultState = {}
const globalContext = createContext(defaultState)

const GlobalProvider = ({ children }) => {
  const [logs, setLogs] = useState(null)
  const { fetchData, loading } = useCebData()

  // lets only get the api data once and store in state
  useEffect(() => {
    // console.log('global provider: useEffect')
    fetchData().then((data) => setLogs(data))
    // eslint-disable-next-line
  }, [])

  return (
    <globalContext.Provider value={{ logs, loading }}>
      {children}
    </globalContext.Provider>
  )
}

export { globalContext }
export default GlobalProvider
