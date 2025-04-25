import { useState, createContext, useContext, useRef, useEffect } from 'react';
import styles from './Flyout.module.css';

const FlyoutContext = createContext();

function Flyout(props) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef();
    const toggleRef = useRef();

    return (
        <div className='fly-out'>
            <FlyoutContext.Provider value={{open, setOpen, menuRef, toggleRef}}>
                {props.children}
            </FlyoutContext.Provider>
        </div>
    );
};

function Toggle({ iconRender }) {
    const { open, setOpen, toggleRef } = useContext(FlyoutContext);

    return (
        <button 
            className={styles.toggle}
            onClick={() => setOpen(!open)}
            ref={toggleRef}
        >
            {iconRender()}
        </button>
    );
};

function Menu(props) {
    const { open, setOpen, menuRef, toggleRef } = useContext(FlyoutContext);

    useEffect(() => {
        const handleClickOutside = (e) => {
            setOpen((currentOpenState) => {
                if (currentOpenState &&
                    menuRef.current && !menuRef.current.contains(e.target) &&
                    toggleRef.current && !toggleRef.current.contains(e.target)
                ) {
                    return false;
                }

                return currentOpenState;
            });
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        open && (
            <ul 
                className={styles.menu}
                ref={menuRef}
            >
                {props.children}
            </ul>
        )
    );
};

function Item({ className='', children, onClick }) {
    const { setOpen } = useContext(FlyoutContext);

    const handleItemClick = (e) => {
        onClick(e);
        setOpen(false);
    };

    return (
        <li 
            className={`${styles.item} ${className}`}
            onClick={(e) => handleItemClick(e)}
        >
            {children}
        </li>
    );
};

Flyout.Toggle = Toggle;
Flyout.Menu = Menu;
Flyout.Item = Item;

export default Flyout;