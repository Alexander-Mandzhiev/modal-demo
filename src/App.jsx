import Header from './components/Header/Header';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import styles from './App.module.css';

export default function App() {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.content}>
                <ProjectsPage />
            </main>
        </div>
    );
}
