import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getAsset } from "../../services/api";

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

  const [coin, setCoin] =
    useState<CoinProps | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadCoin() {
      if (!id) return

      try {
        const data = await getAsset(id)

        setCoin(data)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    loadCoin()
  }, [id]);

  function formatCompactNumber(
    value: string | number
  ) {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(Number(value));
  }

  if (loading) {
    return (
      <main>
        <h2>Carregando...</h2>
      </main>
    );
  }

  if (!coin) {
    return (
      <main>
        <h2>Moeda não encontrada.</h2>
      </main>
    );
  }

  const isPositive =
    Number(coin.changePercent24Hr) >= 0;

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      <Link to="/">
        ← Voltar
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "24px",
          marginBottom: "32px",
        }}
      >
        <img
          src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
          alt={coin.name}
          width={64}
          height={64}
        />

        <div>
          <h1>{coin.name}</h1>
          <span>{coin.symbol}</span>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <strong>Rank</strong>
          <p>#{coin.rank}</p>
        </div>

        <div>
          <strong>Preço</strong>
          <p>
            $
            {Number(
              coin.priceUsd
            ).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 6,
            })}
          </p>
        </div>

        <div>
          <strong>
            Valor de Mercado
          </strong>
          <p>
            $
            {formatCompactNumber(
              coin.marketCapUsd
            )}
          </p>
        </div>

        <div>
          <strong>
            Volume 24h
          </strong>
          <p>
            $
            {formatCompactNumber(
              coin.volumeUsd24Hr
            )}
          </p>
        </div>

        <div>
          <strong>Supply</strong>
          <p>
            {formatCompactNumber(
              coin.supply
            )}
          </p>
        </div>

        <div>
          <strong>
            Supply Máximo
          </strong>
          <p>
            {coin.maxSupply
              ? formatCompactNumber(
                  coin.maxSupply
                )
              : "∞"}
          </p>
        </div>

        <div>
          <strong>
            Mudança 24h
          </strong>
          <p
            style={{
              color: isPositive
                ? "#00c853"
                : "#ff5252",
              fontWeight: "bold",
            }}
          >
            {isPositive ? "+" : ""}
            {Number(
              coin.changePercent24Hr
            ).toFixed(2)}
            %
          </p>
        </div>
      </div>
    </main>
  );
}