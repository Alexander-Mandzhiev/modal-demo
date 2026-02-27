import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Button from '../Button/Button';
import styles from './GenericModal.module.css';

const FOCUSABLE = 'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])';

export default function GenericModal({ title, subtitle, children, onSubmit, onCancel }) {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);

    useEffect(() => {
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = prev; };
    }, []);

    useEffect(() => {
        modalRef.current?.focus();
    }, []);

    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onCancel?.();
            return;
        }

        if (e.key === 'Tab' && modalRef.current) {
            const focusable = [...modalRef.current.querySelectorAll(FOCUSABLE)];
            if (focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    }, [onCancel]);

    const handleOverlayClick = (e) => {
        if (e.target === overlayRef.current) onCancel?.();
    };

    return createPortal(
        <div
            ref={overlayRef}
            className={styles.overlay}
            onClick={handleOverlayClick}
            onKeyDown={handleKeyDown}
        >
            <div
                ref={modalRef}
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                tabIndex={-1}
            >
                {title && <h2 className={styles.title}>{title}</h2>}
                {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

                {children && <div className={styles.body}>{children}</div>}

                <div className={styles.actions}>
                    <Button
                        variant="primary"
                        className={styles.actionBtn}
                        onClick={onSubmit}
                    >
                        Подтвердить
                    </Button>
                    <Button
                        variant="danger"
                        className={styles.actionBtn}
                        onClick={onCancel}
                    >
                        Отменить
                    </Button>
                </div>
            </div>
        </div>,
        document.body,
    );
}
