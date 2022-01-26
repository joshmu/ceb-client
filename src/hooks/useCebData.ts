import { useEffect, useState } from 'react'
import { LogType } from '../types/d'

const useCebData = () => {
  const [data, setData] = useState<LogType[]>(null!)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<any>(null!)

  useEffect(() => {
    // fetch('https://mu-ceb-api.herokuapp.com')
    fetch('/api/data')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false))
  }, [])

  return { isLoading, error, data }
}

export default useCebData
