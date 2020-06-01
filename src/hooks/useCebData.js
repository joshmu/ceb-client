import { useState } from 'react'

const useCebData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState([])
  const [error, setError] = useState([])

  const init = () => {
    setData(null)
    setLoading(true)
    setError(false)
  }

  const fetch = async () => {
    init()
    setLoading(true)
    try {
      // const res = await fetch('https://mu-ceb-api.herokuapp.com')
      // const data = await res.json()
      // console.log(data)
      // setData(data)
      // this does not exist on production server
      const db = require('../temp/database.json')
      console.log('using mock data...')
      setData(db)
    } catch (e) {
      setError(true)
    }
    setLoading(false)
  }

  return { data, loading, error, fetch }
}

export default useCebData
