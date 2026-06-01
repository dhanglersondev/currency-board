const API_URL = "https://rest.coincap.io/v3"

export async function getAssets(limit = 8) {
  const response = await fetch(
    `${API_URL}/assets?limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  )

  const data = await response.json()

  return data.data
}