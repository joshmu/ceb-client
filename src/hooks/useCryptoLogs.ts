import { useEffect, useState } from 'react'
import { LogType } from '../types/d'

export const useCryptoLogs = ({ totalPages }: { totalPages: number }) => {
  const [logs, setLogs] = useState<LogType[]>(null!)
  const [isLoading, setIsLoading] = useState<Boolean>(true)
  const [errors, setErrors] = useState<Error[]>([])

  useEffect(() => {
    // fire request per page to reduce lambda download size
    Promise.all(
      Array(totalPages)
        .fill(undefined)
        .map(async (_, page: number) => {
          return fetch(`/api/page`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page: page + 1, limit: 10000 }),
          }).then(res => res.json())
        })
    )
      .then(responses => {
        setLogs(responses.flat())
      })
      .catch(err => setErrors(errors => [...errors, err]))
      .finally(() => setIsLoading(false))
  }, [])

  return { logs, isLoading, errors }
}
