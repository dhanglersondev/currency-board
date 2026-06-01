import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { getAssets } from "../../services/api";

import style from "./home.module.css";
import { BsSearch } from "react-icons/bs";

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

  function formatCompactNumber(
    value: string | number
  ) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(value));
  }

  useEffect(() => {
    loadCoins();
  }, []);

  async function loadCoins(
    currentOffset = 0
  ) {
    try {
      setLoading(true);

      const data = await getAssets(
        8 + currentOffset
      );

      setCoins(data);
    } catch (error) {
      console.log(error);
      alert("Erro ao carregar moedas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleLoadMore() {
    const newOffset = offset + 8;

    setOffset(newOffset);

    try {
      setLoading(true);

      const data = await getAssets(
        8 + newOffset
      );

      setCoins(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!input.trim()) {
      alert(
        "Por favor, informe o nome da moeda."
      );
      return;
    }

    const coin = coins.find(
      (item) =>
        item.name.toLowerCase() ===
          input.toLowerCase() ||
        item.symbol.toLowerCase() ===
          input.toLowerCase()
    );

    if (!coin) {
      alert("Moeda não encontrada.");
      return;
    }

    navigate(`/coin/${coin.id}`);
  }

  return (
    <main className={style.container}>
      <div className={style.hero}>
        <h1>
          Currency
          <span>Board</span>
        </h1>

        <span className={style.badge}>
          🚀 Mercado Cripto em Tempo Real
        </span>
      </div>

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
          <BsSearch />
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
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
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
                  $
                  {formatCompactNumber(
                    coin.marketCapUsd
                  )}
                </td>

                <td data-label="Preço">
                  $
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
                  $
                  {formatCompactNumber(
                    coin.volumeUsd24Hr
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