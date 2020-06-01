import React, { createContext, useState, useEffect } from 'react'
import useCebData from '../hooks/useCebData'

const defaultState = {}
const globalContext = createContext(defaultState)

const GlobalProvider = ({ children }) => {
  const [logs, setLogs] = useState(null)
  const { data, fetch } = useCebData()

  // lets only get the api data once and store in state
  useEffect(() => {
    if (!data) {
      fetch()
    } else if (!logs && data) {
      setLogs(data)
    }
  }, [data, fetch, logs])

  return (
    <globalContext.Provider value={{ logs }}>{children}</globalContext.Provider>
  )
}

export { globalContext }
export default GlobalProvider
