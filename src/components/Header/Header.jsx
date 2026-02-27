import styles from './Header.module.css';

export default function Header({ children }) {
    return (
        <header className={styles.header}>
            <h1 className={styles.logo}>Modal Demo</h1>
            {children}
        </header>
    );
}
