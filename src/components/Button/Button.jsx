import styles from './Button.module.css';

const VARIANTS = {
    primary: styles.primary,
    danger: styles.danger,
    ghost: styles.ghost,
};

export default function Button({
    children,
    onClick,
    variant = 'primary',
    type = 'button',
    disabled = false,
    className,
}) {
    return (
        <button
            type={type}
            className={[styles.btn, VARIANTS[variant], className]
                .filter(Boolean)
                .join(' ')}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
