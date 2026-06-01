import { useEffect, useState } from 'react'

interface Asset {
  id: string
  rank: string
  symbol: string
  name: string
  supply: string
  maxSupply: string | null
  marketCapUsd: string
  volumeUsd24Hr: string
  priceUsd: string
  changePercent24Hr: string
}

export default function App() {
  const [data, setData] = useState<Asset[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        const apiKey = import.meta.env.VITE_API_KEY
        const res = await fetch('https://rest.coincap.io/v3/assets?limit=10', {
          headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : undefined
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json = await res.json()
        setData(json.data)
      } catch (err: any) {
        setError(err.message || String(err))
      }
    }

    load()
  }, [])

  return (
    <div style={{ padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <h1>API Response (CoinCap)</h1>
      {error && <pre style={{ color: 'crimson' }}>{error}</pre>}
      {!data && !error && <div>Carregando...</div>}
      {data && (
        <pre style={{ whiteSpace: 'pre-wrap', maxHeight: '70vh', overflow: 'auto', background: '#0b1220', color: '#e6eef8', padding: 12, borderRadius: 8 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  )
}
