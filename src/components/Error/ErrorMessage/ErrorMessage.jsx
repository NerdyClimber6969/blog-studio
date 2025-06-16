import styles from './ErrorMessage.module.css';

function ErrorMessage({ message, variant = 'error', className = ''}) {
    return (
        <div
            aria-live="polite"
            className={`${styles.errorContainer} ${className}`}
        >
            <span className='font-lg'>
                {variant === 'error' && '❌'}
                {variant === 'warning' && '⚠️'}
                {variant === 'info' && 'ℹ️'}
            </span>
            <p className='font-md'>{message}</p>
        </div>
    );
};

export default ErrorMessage;