import  styles from './SpinningLoader.module.css';

function SpinningLoader({ className, size='large'}) {
    const sizeClass = {
        small: styles.small,
        medium: styles.medium,
        large: styles.large
    }

    return (
        <div className={`${className} ${styles.loader} ${sizeClass[size]}`}></div>
    );
};

export default SpinningLoader;