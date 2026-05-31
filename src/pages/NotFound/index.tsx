import styles from './notfound.module.css'

export function NotFound() {
   return (
      <main className={styles.container}>
         <div className={styles.content}>
            <span className={styles.code}>404</span>

            <h1 className={styles.title}>
               Página <span>não encontrada</span>
            </h1>

            <p className={styles.description}>
               A página que você está tentando acessar não existe
               ou foi removida.
            </p>

            <a href="/" className={styles.button}>
               Voltar para Home
            </a>
         </div>
      </main>
   );
}