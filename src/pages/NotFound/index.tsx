import { Link } from "react-router-dom";
import style from "./notFound.module.css";

export function NotFound() {
  return (
    <main className={style.container}>
      <div className={style.card}>
        <h1>404</h1>
        <h2>Página não encontrada</h2>

        <p>
          A página que você está procurando não existe ou foi removida.
        </p>

        <Link to="/" className={style.button}>
          ← Voltar para Home
        </Link>
      </div>
    </main>
  );
}