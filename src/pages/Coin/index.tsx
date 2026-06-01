import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAsset } from "../../services/api";

import style from "./coin.module.css";

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

export function Coin() {
  const { id } = useParams();

  const [coin, setCoin] = useState<CoinProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCoin() {
      if (!id) return;

      try {
        const data = await getAsset(id);
        setCoin(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    loadCoin();
  }, [id]);

  function formatCompactNumber(value: string | number) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(value));
  }

  if (loading) {
    return (
      <main className={style.container}>
        <h2 className={style.loading}>Carregando...</h2>
      </main>
    );
  }

  if (!coin) {
    return (
      <main className={style.container}>
        <h2 className={style.error}>Moeda não encontrada.</h2>
      </main>
    );
  }

  const isPositive = Number(coin.changePercent24Hr) >= 0;

  return (
    <main className={style.container}>

      {/* HEADER (clicável) */}
      <div className={style.hero}>
        <Link to="/" className={style.titleLink}>
          <h1>
            Currency<span>Board</span>
          </h1>
        </Link>

        <span className={style.badge}>
          🚀 Mercado Cripto em Tempo Real
        </span>
      </div>

      {/* CARD PRINCIPAL */}
      <section className={style.cardContainer}>

        {/* COIN HEADER */}
        <div className={style.coinHeader}>
          <img
            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
            alt={coin.name}
            className={style.icon}
          />

          <div>
            <h2>
              {coin.name}
              <span className={style.symbol}>
                {coin.symbol}
              </span>
            </h2>

            <p className={style.rank}>
              Rank #{coin.rank}
            </p>
          </div>
        </div>

        {/* PRICE */}
        <div className={style.priceBox}>
          <span>Preço atual</span>

          <h2>
            $
            {Number(coin.priceUsd).toLocaleString(
              "en-US",
              {
                minimumFractionDigits: 2,
                maximumFractionDigits: 6,
              }
            )}
          </h2>

          <p className={isPositive ? style.positive : style.negative}>
            {isPositive ? "+" : ""}
            {Number(coin.changePercent24Hr).toFixed(2)}%
            {" "}(24h)
          </p>
        </div>

        {/* GRID */}
        <section className={style.grid}>
          <div className={style.card}>
            <span>Market Cap</span>
            <p>${formatCompactNumber(coin.marketCapUsd)}</p>
          </div>

          <div className={style.card}>
            <span>Volume (24h)</span>
            <p>${formatCompactNumber(coin.volumeUsd24Hr)}</p>
          </div>

          <div className={style.card}>
            <span>Supply</span>
            <p>{formatCompactNumber(coin.supply)}</p>
          </div>

          <div className={style.card}>
            <span>Max Supply</span>
            <p>
              {coin.maxSupply
                ? formatCompactNumber(coin.maxSupply)
                : "∞"}
            </p>
          </div>
        </section>

      </section>
    </main>
  );
}