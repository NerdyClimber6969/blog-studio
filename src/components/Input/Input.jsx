import './Input.css';

function Input({
    label, 
    id, 
    name, 
    type, 
    placeholder, 
    required=true, 
    pattern, 
    error, 
    value, 
    onChange,
}) {
    return (
        <div className='container input-container'> 
            <div className='font-sm'>
                <input 
                    className='font-sm' 
                    type={type} 
                    id={id} 
                    name={name} 
                    pattern={pattern || null} 
                    placeholder={placeholder} 
                    required={required}
                    value={value} 
                    onChange={onChange}
                />
                <label 
                    className='font-sm' 
                    htmlFor={id}
                >
                    {label}
                </label>
            </div>

            {error && (
                <div><p>{error}</p></div>   
            )}               
        </div>   
    );
};

export default Input;