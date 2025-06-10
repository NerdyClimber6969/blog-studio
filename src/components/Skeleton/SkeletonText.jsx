import styles from './Skeleton.module.css';

function SkeletonText({ className='', lines, height, width, gap }) {
    const style = { 
        height: height ? `${height}px` : '100%',
        width: width ? `${width}px` : '100%',
        marginBottom: gap
    };

    return (
        <div className={`${className}`}>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className={`${styles.skeleton}` }
                    style={style}
                />
            ))}
        </div>
    );
};

export default SkeletonText;