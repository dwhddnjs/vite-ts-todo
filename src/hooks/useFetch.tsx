import { useEffect, useState } from "react"

const API_BASE_URL = "http://localhost:3300"

export const useFetch = <T,>(url: string, option: RequestInit = {}) => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetcher = async () => {
    setData(null)
    setLoading(true)
    setError(null)
    try {
      if (!url.startsWith("http")) {
        url = API_BASE_URL + url
      }
      const res = await fetch(url, option)

      if (!res.ok) {
        throw new Error(`2xx 이외의 응답: ${res.status}`)
      }

      const result = await res.json()
      setData(result)
    } catch (error) {
      if (error instanceof TypeError) {
        console.error(error.message)
      }
      if (error instanceof Error) {
        console.error(error.message)
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetcher()
  }, [])

  return {
    data,
    loading,
    error,
    refetch: fetcher,
  }
}
