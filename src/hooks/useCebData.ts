import { useEffect, useState } from 'react'
import { LogType } from '../types/d'

const useCebData = ({ pageLimit = 10000 } = {}) => {
  const [data, setData] = useState<LogType[]>(null!)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [error, setError] = useState<any>(null!)

  useEffect(() => {
    ;(async () => {
      try {
        setIsLoading(true)

        // get num of pages required
        const infoRes = await fetch('/api/info')
        const { pages, count } = await infoRes.json()
        console.log('total records:', count)

        // fire request per page to reduce lambda download size
        const responses = await Promise.all(
          Array(pages)
            .fill(undefined)
            .map(async (_, page: number) => {
              return fetch(`/api/page`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ page: page + 1, limit: pageLimit }),
              }).then(res => res.json())
            })
        )

        // consolidate data
        const data = responses.flat()
        setData(data)
      } catch (err) {
        console.error(err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [])

  return { isLoading, error, data }
}

export default useCebData
