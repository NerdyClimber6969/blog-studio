import styles from './Input.module.css';

function Input(props) {
    const {
        id,
        name,
        label, 
        errorMessage, 
        onChange,
        ...inputProps
    } = props;

    return (
        <div className={styles.formInput}> 
            <div>
                <input
                    {...inputProps} 
                    id={id}
                    name={name}
                    className='font-sm' 
                    onChange={onChange}
                />
                <label 
                    htmlFor={id}
                    className='font-sm' 
                >
                    {label}
                </label>
            </div>            
            <span className='font-xxs'>{errorMessage}</span>                            
        </div>   
    );
};

export default Input;