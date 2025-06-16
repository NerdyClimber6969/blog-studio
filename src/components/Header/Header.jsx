import { Link } from 'react-router-dom';
import { useAuthen } from '../../context/AuthenProvider.jsx';
import ThemeFlyout from '../Flyout/ThemeFlyout.jsx';
import { SideBarIcon } from '../../icons/';
import styles from './Header.module.css';

function Header({ className, toggleSideBar }) {
    const { logout } = useAuthen();
    
    return (
        <header className={`${styles.header} ${className ? className : ''}`}>
            <div className={styles.leftContainer}>
                <button className={styles.toggle + ' svg-button'} onClick={toggleSideBar}>
                    <SideBarIcon/>
                </button>
                <h1 className='font-lg'>MyBlog Studio</h1>
            </div>         

            <div>
                <nav>
                    <ul className={styles.navBar}>
                        <li className='font-sm'><Link onClick = {() => logout()}>Logout</Link></li>
                        <ThemeFlyout/>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;