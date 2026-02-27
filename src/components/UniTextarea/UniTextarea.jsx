import styles from './UniTextarea.module.css';

export default function UniTextarea({
    value,
    onChange,
    placeholder,
    error,
    className,
    autoFocus = false,
}) {
    const handleChange = (e) => {
        onChange?.(e.target.value);
    };

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                className={[
                    styles.input,
                    error ? styles.inputError : '',
                    className ?? '',
                ]
                    .filter(Boolean)
                    .join(' ')}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                autoFocus={autoFocus}
            />
            {error && <span className={styles.errorText}>{error}</span>}
        </div>
    );
}
