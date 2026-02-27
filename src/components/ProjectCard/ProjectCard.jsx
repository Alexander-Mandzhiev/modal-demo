import styles from './ProjectCard.module.css';

const STATUS_LABELS = {
    active: 'Активен',
    paused: 'На паузе',
};

export default function ProjectCard({ name, timezone, status }) {
    return (
        <div className={styles.card}>
            <div className={styles.top}>
                <span className={styles.name}>{name}</span>
                <span
                    className={`${styles.badge} ${
                        status === 'active' ? styles.badgeActive : styles.badgePaused
                    }`}
                >
                    {STATUS_LABELS[status]}
                </span>
            </div>
            <span className={styles.tz}>{timezone}</span>
        </div>
    );
}
