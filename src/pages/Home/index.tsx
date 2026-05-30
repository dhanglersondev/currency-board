import style from './home.module.css'

export function Home() {

    return (
        <div className={style.container}>
            <h1 className={style.title}>
                Bem-vindo a <span>Home</span>
            </h1>
        </div>
    )
}