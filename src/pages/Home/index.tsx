import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAssets } from "../../services/api";

import style from "./home.module.css";

interface CoinProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string | null;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
}

export function Home() {
  const [coins, setCoins] = useState<CoinProps[]>([]);
  const [input, setInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadCoins();
  }, []);

  async function loadCoins(currentOffset = 0) {
    try {
      setLoading(true);

      const data = await getAssets(8 + currentOffset);

      setCoins(data);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar moedas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadMore() {
    const newOffset = offset + 10;

    setOffset(newOffset);

    try {
      setLoading(true);

      const data = await getAssets(8 + newOffset);

      setCoins(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (input.trim() === "") {
      alert("Por favor, informe o nome da moeda.");
      return;
    }

    navigate(`/coin/${input.toLowerCase()}`);
  }

  return (
    <main className={style.container}>
      <form
        className={style.form}
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Informe a moeda desejada... Ex Bitcoin"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
        />

        <button type="submit">
          Buscar
        </button>
      </form>

      <table className={style.table}>
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Moeda</th>
            <th scope="col">
              Valor de Mercado
            </th>
            <th scope="col">Preço</th>
            <th scope="col">
              Volume (24h)
            </th>
            <th scope="col">
              Mudança (24h)
            </th>
          </tr>
        </thead>

        <tbody>
          {coins.map((coin) => {
            const isPositive =
              Number(
                coin.changePercent24Hr
              ) >= 0;

            return (
              <tr
                key={coin.id}
                className={style.row}
              >
                <td data-label="Rank">
                  <span
                    className={style.rank}
                  >
                    {coin.rank}
                  </span>
                </td>

                <td data-label="Moeda">
                  <Link
                    to={`/coin/${coin.id}`}
                    className={
                      style.coinLink
                    }
                  >
                    <img
                      src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                      alt={coin.name}
                      className={
                        style.coinIcon
                      }
                    />

                    <div
                      className={
                        style.coinInfo
                      }
                    >
                      <span
                        className={
                          style.coinName
                        }
                      >
                        {coin.name}
                      </span>

                      <span
                        className={
                          style.symbol
                        }
                      >
                        {coin.symbol}
                      </span>
                    </div>
                  </Link>
                </td>

                <td data-label="Valor de Mercado">
                  ${" "}
                  {Number(
                    coin.marketCapUsd
                  ).toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </td>

                <td data-label="Preço">
                  ${" "}
                  {Number(
                    coin.priceUsd
                  ).toLocaleString(
                    "en-US",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    }
                  )}
                </td>

                <td data-label="Volume (24h)">
                  ${" "}
                  {Number(
                    coin.volumeUsd24Hr
                  ).toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 0,
                    }
                  )}
                </td>

                <td data-label="Mudança (24h)">
                  <span
                    className={
                      isPositive
                        ? style.positive
                        : style.negative
                    }
                  >
                    {isPositive
                      ? "+"
                      : ""}
                    {Number(
                      coin.changePercent24Hr
                    ).toFixed(2)}
                    %
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <button
        type="button"
        className={style.loadMore}
        onClick={handleLoadMore}
        disabled={loading}
      >
        {loading
          ? "Carregando..."
          : "Carregar mais"}
      </button>
    </main>
  );
}