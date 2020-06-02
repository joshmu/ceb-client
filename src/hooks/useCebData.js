import { useState } from 'react'

const useCebData = () => {
  // will store data in context rather than hook
  const [loading, setLoading] = useState([])
  const [error, setError] = useState([])

  const init = () => {
    setLoading(true)
    setError(false)
  }

  const fetchData = async () => {
    init()
    const res = await fetch('https://mu-ceb-api.herokuapp.com').catch((e) =>
      setError(true)
    )
    const data = await res.json().catch((e) => setError(e))

    // this does not exist on production server
    // const data = require('../temp/database.json')
    // console.log('using mock data...')

    setLoading(false)
    return data
  }

  return { loading, error, fetchData }
}

export default useCebData
