import { useState } from 'react';
import { useAuthen } from '../context/AuthenProvider.jsx';

import AppProvider from '../context/AppProvider';

import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Dialog from '../components/Dialog/Dialog.jsx';
import Header from '../components/Header/Header.jsx';
import SideBar from '../components/SideBar/SideBar.jsx';
import StairLoader from '../components/StairLoader/StairLoader.jsx';
import { Outlet } from 'react-router-dom';

import styles from './App.module.css';

function AppContent(props) {
    const [collasped, setCollasped] = useState(true);
    const { isAuthenticated, loading } = useAuthen()

    if (loading) {
      return (
        <div className={styles.loadingLayout}>
            <div>
                <StairLoader/>
                <p 
                    className='font-sm' 
                    style={{ marginTop: 'var(--spacing4)' }}
                >
                    Loading...
                </p>
            </div>
        </div>
      );
    };
    
    return (
      isAuthenticated ? (
        <>
          <NotificationDisplayer />
          <div className={styles.layout}>
            <Header 
              className={styles.header}
              toggleSideBar={() => setCollasped(!collasped)} 
            />
            <SideBar 
              className={styles.sideBar}
              collasped={collasped} 
              onClose={() => setCollasped(true)}
            />
            <div className={styles.main}>
              <Outlet/>
            </div>        
          </div>
        </> 
      ) : (
        <Dialog
          isOpen={true}
          title='Notification'
          showCloseButton={false}
          confirmBtn='Go back to MyBlog'
          onConfirm={() => location.href=import.meta.env.VITE_BLOG_APP_URL}
        >  
          <div className='font-sm' style={{margin: 'var(--spacing5) 0'}}>
            <p>You are not logged in.</p>
            <p>Please login before continue.</p>
          </div> 
        </Dialog>
      )
    );
};

function App(props) {
    return (
        <AppProvider>
            <AppContent />
        </AppProvider>
    );
};

export default App;