import { useEffect, useState } from 'react'

export const useCebData = () => {
  const [logs, setLogs] = useState(null)
  useEffect(() => {
    // get the data
    console.log('fetching db data...')

    if (process.env.NETLIFY) {
      fetch('https://mu-ceb-api.herokuapp.com')
        .then((res) => res.json())
        .then((data) => setLogs(data))
        .catch((err) => console.error(err))
    } else {
      // this does not exist on production server
      // const db = require('../temp/database.json')
      const db = []
      console.log('using mock data...')
      setLogs(db)
    }
  }, [])

  return logs
}

export default useCebData
