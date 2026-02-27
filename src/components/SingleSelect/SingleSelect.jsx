import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './SingleSelect.module.css';

export default function SingleSelect({ options, value, onChange, placeholder }) {
    const [open, setOpen] = useState(false);
    const [focusedIdx, setFocusedIdx] = useState(-1);
    const containerRef = useRef(null);
    const listRef = useRef(null);

    const selectedOption = options.find((o) => o.value === value);

    const close = useCallback(() => {
        setOpen(false);
        setFocusedIdx(-1);
    }, []);

    useEffect(() => {
        if (!open) return;
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                close();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open, close]);

    useEffect(() => {
        if (!open || focusedIdx < 0 || !listRef.current) return;
        const item = listRef.current.children[focusedIdx];
        item?.scrollIntoView({ block: 'nearest' });
    }, [focusedIdx, open]);

    const handleSelect = (option) => {
        onChange(option.value);
        close();
    };

    const handleKeyDown = (e) => {
        if (!open) {
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setOpen(true);
                const currentIdx = options.findIndex((o) => o.value === value);
                setFocusedIdx(currentIdx >= 0 ? currentIdx : 0);
            }
            return;
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setFocusedIdx((prev) => (prev < options.length - 1 ? prev + 1 : 0));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setFocusedIdx((prev) => (prev > 0 ? prev - 1 : options.length - 1));
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (focusedIdx >= 0) handleSelect(options[focusedIdx]);
                break;
            case 'Escape':
                e.preventDefault();
                e.stopPropagation();
                close();
                break;
        }
    };

    const handleToggle = () => {
        if (open) {
            close();
        } else {
            setOpen(true);
            const currentIdx = options.findIndex((o) => o.value === value);
            setFocusedIdx(currentIdx >= 0 ? currentIdx : 0);
        }
    };

    return (
        <div ref={containerRef} className={styles.container} onKeyDown={handleKeyDown}>
            <button
                type="button"
                className={`${styles.trigger} ${open ? styles.triggerOpen : ''}`}
                onClick={handleToggle}
                aria-haspopup="listbox"
                aria-expanded={open}
            >
                <span className={selectedOption ? styles.valueText : styles.placeholder}>
                    {selectedOption?.label ?? placeholder ?? 'Выбрать...'}
                </span>
                <svg
                    className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                >
                    <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            {open && (
                <ul ref={listRef} className={styles.dropdown} role="listbox">
                    {options.map((option, idx) => (
                        <li
                            key={option.value}
                            role="option"
                            aria-selected={option.value === value}
                            className={[
                                styles.option,
                                option.value === value ? styles.optionSelected : '',
                                idx === focusedIdx ? styles.optionFocused : '',
                            ]
                                .filter(Boolean)
                                .join(' ')}
                            onClick={() => handleSelect(option)}
                            onMouseEnter={() => setFocusedIdx(idx)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
