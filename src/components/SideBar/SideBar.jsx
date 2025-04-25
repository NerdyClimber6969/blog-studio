import { Link } from 'react-router-dom';
import DashboardIcon from '../../icons/DashboardIcon.jsx';
import PostIcon from '../../icons/PostIcon.jsx';
import CommentIcon from '../../icons/CommentIcon.jsx';
import styles from './SideBar.module.css';

function SideBar({ className, hidden }) {
    return (
        <aside className={`${styles.sideBar} ${className ? className : ''}`}>
            <nav>
                <ul>
                    <li className={styles.item}>
                        <Link to='/' className={styles.link}>
                            <DashboardIcon className='svg-icon'/>
                            <div className={`font-xs ${hidden ? styles.hidden : styles.show}`}>
                                <span>Dashboard</span>
                            </div>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/posts' className={styles.link}>
                            <PostIcon className='svg-icon'/>
                            <div className={`font-xs ${hidden ? styles.hidden :styles.show}`}>
                                <span>Posts</span>
                            </div>
                        </Link>
                    </li>

                    <li className={styles.item}>
                        <Link to='/comments' className={styles.link}>    
                            <CommentIcon className='svg-icon'/>
                            <div className={`font-xs ${hidden ? styles.hidden: styles.show}`}>
                                <span>Comments</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;