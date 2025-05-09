import { useState } from 'react';
import AppProvider from '../context/AppProvider';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import { useAuthen } from '../context/AuthenProvider.jsx';
import Dialog from '../components/Dialog/Dialog.jsx';
import Header from '../components/Header/Header.jsx';
import SideBar from '../components/SideBar/SideBar.jsx';
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

function AppContent(props) {
    const [collasped, setCollasped] = useState(true);
    const { isAuthenticated } = useAuthen()

    if (!isAuthenticated) {
      return (
        <Dialog
          isOpen={true}
          title='notification'
          showCloseButton={false}
          confirmBtn='Go back to DevBlog'
          onConfirm={() => location.href='http://localhost:3002/login'}
        >   
          <p>You are not logged in.</p>
          <p>Please login before continue.</p>
        </Dialog>
      )
    };

    return (
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
            />
            <div className={styles.main}>
              <Outlet/>
            </div>        
          </div>
        </> 
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