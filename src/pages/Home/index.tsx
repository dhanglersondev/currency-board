import styles from './home.module.css'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export function Home() {
   const coin = {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      marketCap: '$ 450.000.000.000',
      price: '$ 3.750,00',
      volume: '$ 25.000.000.000',
      change24h: -2.35
   }

   return (
      <main className={styles.container}>
         <form className={styles.form}>
            <input
               type="text"
               placeholder="Informe a moeda... Ex: Ethereum"
            />

            <button type="submit">
               <BsSearch size={30} color="#FFF" />
            </button>
         </form>

         <table>
            <thead>
               <tr>
                  <th>Moeda</th>
                  <th>Valor Mercado</th>
                  <th>Preço</th>
                  <th>Volume</th>
                  <th>Alteração 24h</th>
               </tr>
            </thead>

            <tbody>
               <tr className={styles.tr}>
                  <td
                     className={styles.tdLabel}
                     data-label="Moeda"
                  >
                     <div className={styles.name}>
                        <Link to={`/detail/${coin.id}`}>
                           <span>{coin.name}</span> | {coin.symbol}
                        </Link>
                     </div>
                  </td>

                  <td
                     className={`${styles.tdLabel} ${styles.marketCap}`}
                     data-label="Valor Mercado"
                  >
                     {coin.marketCap}
                  </td>

                  <td
                     className={`${styles.tdLabel} ${styles.price}`}
                     data-label="Preço"
                  >
                     {coin.price}
                  </td>

                  <td
                     className={`${styles.tdLabel} ${styles.volume}`}
                     data-label="Volume"
                  >
                     {coin.volume}
                  </td>

                  <td
                     className={`${styles.tdLabel} ${
                        coin.change24h >= 0
                           ? styles.positive
                           : styles.negative
                     }`}
                     data-label="Alteração 24h"
                  >
                     {coin.change24h.toFixed(2)}%
                  </td>
               </tr>
            </tbody>
         </table>
      </main>
   )
}