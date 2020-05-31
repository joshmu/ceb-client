import { useEffect, useState } from 'react'

export const useCebData = () => {
  const [logs, setLogs] = useState(null)
  useEffect(() => {
    // get the data
    console.log('fetching db data...')
    fetch('https://mu-ceb-api.herokuapp.com')
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err))
  }, [])

  return logs
}

export default useCebData
