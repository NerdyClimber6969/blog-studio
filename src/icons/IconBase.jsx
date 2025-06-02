import styles from './Icon.module.css';

function IconBase({ 
    size = 35, 
    className = '', 
    children, 
    variant = 'strokeOnly', // 'strokeOnly' | 'fillOnly' | 'strokeAndFill'
    viewBox = '0 0 24 24' 
}) {
    const styleVariants = {
        strokeOnly: styles.strokeOnly,
        fillOnly: styles.fillOnly,
        strokeAndFill: styles.strokeAndFill
    };

    return (
        <svg 
            width={size}
            height="100%"
            viewBox={viewBox}
            className={`${styles.icon} ${styleVariants[variant]} ${className}`}
            xmlns="http://www.w3.org/2000/svg"
        >
            {children}
        </svg>
    );
}

export default IconBase;