import notifiactionStyles from './Notification.module.css';
import btnStyles from '../Button/Button.module.css';

function Notification({ id, message, onRemove, isClosing, type='success'}) {
    const closing = isClosing ? notifiactionStyles.closing : ''
    const notificationType = type === 'success' ? notifiactionStyles.success : notifiactionStyles.error;

    return (
        <li 
            className={`notification ${closing} ${notificationType} ${notifiactionStyles.item}`}
            id={id}
        >
            <div className={notifiactionStyles.container}>
                <button 
                    className={`font-lg ${btnStyles.transparent}`}
                    onClick={onRemove}
                >
                    &times;
                </button>
                <strong className='font-sm'>{message}</strong> 
            </div>
        </li>                
    );
};

export default Notification;