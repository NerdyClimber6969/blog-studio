import { Link } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import ThemeFlyout from '../Flyout/ThemeFlyout.jsx';
import SideBarIcon from '../../icons/SideBarIcon.jsx';
import styles from './Header.module.css';

function Header({ className, toggleSideBar }) {
    const { user, handleLogout } = useAuthen();
    
    return (
        <header className={`${styles.header} ${className ? className : ''}`}>
            <div className={styles.leftContainer}>
                <button className={styles.toggle + ' svg-button'} onClick={toggleSideBar}>
                    <SideBarIcon className='svg-icon'/>
                </button>
                <h1 className='font-lg'>DevBlog Studio</h1>
            </div>         

            <div>
                <nav>
                    <ul className={styles.navBar}>
                        {user ? (
                            <>
                                <li className='font-sm'><Link to='/profile'>Profile</Link></li>
                                <li className='font-sm'><Link onClick = {() => handleLogout()}>Logout</Link></li>
                            </>
                        ) : (    
                            <>         
                                <li className='font-sm'><Link to='/login'>Login</Link></li>
                                <li className='font-sm'><Link to='/sign-up'>Sign Up</Link></li>
                            </>   
                        )}
                        <ThemeFlyout/>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;