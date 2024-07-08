const API_BASE_URL = "http://localhost:3300"

export const useMutation = (url: string, options: RequestInit = {}) => {
  const trigger = async (method: string, data = {}) => {
    if (!url.startsWith("http")) {
      url = API_BASE_URL + url
    }

    const request = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
      body: JSON.stringify({
        ...data,
      }),
      method: method,
    }

    try {
      const res = await fetch(url, request)

      if (!res.ok) {
        throw new Error(`2xx 이외의 응답: ${res.status}`)
      }
      const result = await res.json()

      return result
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { trigger }
}
