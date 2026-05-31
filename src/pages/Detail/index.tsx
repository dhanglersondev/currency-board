import style from './detail.module.css'

export function Detail() {

	return (
		<div className={style.container}>
			<h1 className={style.title}>
				Bem-vindo a página de <span>detalhes</span>
			</h1>
		</div>
	)
}