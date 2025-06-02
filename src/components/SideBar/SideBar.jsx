import { Link } from 'react-router-dom';
import { DashboardIcon, PostIcon, CommentIcon, CloseIcon } from '../../icons';
import styles from './SideBar.module.css';

function SideBar({ className, collasped, onClose }) {
    return (
        <>       
            <div className={`${styles.overlay} ${collasped ? styles.collasped :styles.show}`}></div>
            <aside className={`${styles.sideBar} ${className ? className : ''} ${collasped ? styles.collasped :styles.show}`}>
                <nav>
                    <ul>
                        <li>
                            <div onClick={onClose}>
                                <CloseIcon/>
                            </div>
                        </li>

                        <li >
                            <Link to='/'>
                                <DashboardIcon/>
                                <div className={`font-xs ${styles.itemLabel}`}>
                                    <span>Dashboard</span>
                                </div>
                            </Link>
                        </li>

                        <li >
                            <Link to='/posts' >
                                <PostIcon/>
                                <div className={`font-xs ${styles.itemLabel}`}>
                                    <span>Posts</span>
                                </div>
                            </Link>
                        </li>

                        <li >
                            <Link to='/comments'>    
                                <CommentIcon/>
                                <div className={`font-xs ${styles.itemLabel}`}>
                                    <span>Comments</span>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default SideBar;