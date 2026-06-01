import { Link } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import style from "./home.module.css"

interface CoinProps {
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

const coin: CoinProps = {
  id: "bitcoin",
  rank: "1",
  symbol: "BTC",
  name: "Bitcoin",
  supply: "19600000",
  maxSupply: "21000000",
  marketCapUsd: "1000000000000",
  volumeUsd24Hr: "50000000000",
  priceUsd: "50000",
  changePercent24Hr: "-2.5",
}

export function Home() {
  const isPositive = Number(coin.changePercent24Hr) >= 0

  const [input, setInput] = useState("")
  const navigate = useNavigate()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (input.trim() === "") {
      alert("Por favor, informe o nome da moeda.")
      return
    }

    navigate(`/coin/${input.toLowerCase()}`)
  }

  return (
    <main className={style.container}>
      <form className={style.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Informe a moeda desejada... Ex Bitcoin"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <table className={style.table}>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Moeda</th>
            <th scope="col">Valor de Mercado</th>
            <th scope="col">Preço</th>
            <th scope="col">Volume (24h)</th>
            <th scope="col">Mudança (24h)</th>
          </tr>
        </thead>

        <tbody>
          <tr className={style.row}>
            <td data-label="Rank">
              <span className={style.rank}>{coin.rank}</span>
            </td>

            <td data-label="Moeda">
              <Link
                to={`/coin/${coin.id}`}
                className={style.coinLink}
              >
                <img
                  src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  alt={coin.name}
                  className={style.coinIcon}
                />

                <div className={style.coinInfo}>
                  <span className={style.coinName}>{coin.name}</span>
                  <span className={style.symbol}>
                    {coin.symbol}
                  </span>
                </div>
              </Link>
            </td>

            <td data-label="Valor de Mercado">
              <span className={style.marketCap}>
                R$ 1 Trillion
              </span>
            </td>

            <td data-label="Preço">
              <span className={style.price}>
                R$ {Number(coin.priceUsd).toLocaleString("pt-BR")}
              </span>
            </td>

            <td data-label="Volume (24h)">
              <span className={style.volume}>
                R$ 50 Billion
              </span>
            </td>

            <td data-label="Mudança (24h)">
              <span
                className={
                  isPositive
                    ? style.positive
                    : style.negative
                }
              >
                {isPositive ? "+" : ""}
                {Number(
                  coin.changePercent24Hr
                ).toFixed(2)}
                %
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <button type="button" className={style.loadMore}>
        Carregar mais
      </button>
    </main>
  )
}