import { useEffect } from 'react';
import dialogStyles from'./Dialog.module.css';
import btnStyles from '../Button/Button.module.css';

function Dialog ({ 
    className='',
    isOpen, 
    title, 
    children, 
    confirmBtn,
    cancelBtn,
    confirmBtnDisabled=false,
    cancelBtnDisabled=false,
    onConfirm,
    onClose, 
    showCloseButton=true
}) {
    // Close on escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
    
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            // Prevent scrolling of background content
            document.body.style.overflow = 'hidden';
        };
    
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    return isOpen && (
        <div className={dialogStyles.overlay} onClick={onClose}>
            <div 
                className={`${dialogStyles.dialog} ${className}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div>
                    <h2 className='font-md'>{title}</h2>
                    {showCloseButton && (
                        <button 
                            className={btnStyles.transparent} 
                            style={{fontWeight: 'bold'}}
                            onClick={onClose}
                        >
                            X
                        </button>
                    )}
                </div>
            
                {children}

                {(confirmBtn || cancelBtn) && (
                    <div>
                        {cancelBtn && (
                            <button 
                                className='btn btn-secondary' 
                                onClick={onClose}
                                disabled={cancelBtnDisabled}
                            >
                                {cancelBtn}
                            </button>
                        )}
                        {confirmBtn && (
                            <button 
                                className='btn btn-primary' 
                                onClick={onConfirm}
                                disabled={confirmBtnDisabled}
                            >
                                {confirmBtn}
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dialog;