import styles from './header.module.css'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <header className={styles.container}>
            <Link to="/" className={styles.link}>
                <h1 className={styles.logo}>
                    Currency<span>Board</span>
                </h1>
            </Link>
        </header>
    )
}