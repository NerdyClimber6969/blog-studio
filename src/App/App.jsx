import { useState } from 'react';
import AppProvider from '../context/AppProvider';
import NotificationDisplayer from '../NotificationDisplayer.jsx';
import Header from '../components/Header/Header.jsx';
import SideBar from '../components/SideBar/SideBar.jsx';
import { Outlet } from 'react-router-dom';
import styles from './App.module.css';

function AppContent(props) {
    const [collasped, setCollasped] = useState(true);

    return (
      <>
        <NotificationDisplayer />
        <div className={styles.layout}>
          <Header 
            className={styles.header}
            toggleSideBar={() => setCollasped(!hidden)} 
          />
          <SideBar 
            className={styles.sideBar}
            hidden={hidden} 
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