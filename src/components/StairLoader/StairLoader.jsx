import styles from './StairLoader.module.css'

function StairLoader(props) {
    return (
        <div className={`${styles.stairLoader}`}>
            <div className={`${styles.stairWrapper}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={`${styles.ball}`}></div>
        </div>
    );
};

export default StairLoader;