import styles from './Skeleton.module.css';

function SkeletonBox({ className='', height, width, cycle }) {
    const style = { 
        height: height ? `${height}px` : '100%',
        width: width ? `${width}px` : '100%',
        borderRadius: cycle ? '50%' : null,
    };

    return (
        <div 
            className={`${styles.skeleton} ${className}`} style={style}
        />
    );
};

export default SkeletonBox;