import styles from './UnexpectedError.module.css';

function UnexpectedError({ mode='normal' }) {
    const errors = {
        normal: (
            <div className={`${styles.error} ${styles.normal}`}>
                <img src='/unexpected-error.png'></img>
                <h3 className='font-lg'>Whoops, something went wrong !</h3>
                <p className='font-sm'>You may also refresh the page or try anagin later</p>
            </div>            
        ),
        simple: (
            <div className={`${styles.error} ${styles.simple}`}>
                <img src='/unexpected-error.png'></img>
                <p className='font-sm'>Whoops, something went wrong !</p>
            </div>    
        )
    };

    return ( errors[mode] );
};

export default UnexpectedError;