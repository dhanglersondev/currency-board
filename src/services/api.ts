const API_URL = "https://rest.coincap.io/v3"

export async function getAssets(limit = 10, offset = 0) {
  const response = await fetch(
    `${API_URL}/assets?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
      },
    }
  )

  const data = await response.json()

  return data.data
}

export async function getAsset(id: string) {
  const response = await fetch(`${API_URL}/assets/${id}`)

  if (!response.ok) {
    throw new Error(`Erro ao buscar ativo ${id}`)
  }

  const data = await response.json()

  return data.data
}