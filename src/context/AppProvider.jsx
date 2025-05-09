import AuthenProvider  from './AuthenProvider.jsx';
import NotificationProvider  from './NotificationProvider.jsx';
import ThemeProvider from './ThemeProvider.jsx';

function AppProvider({ children }) {
    return (
      <ThemeProvider>
        <NotificationProvider>
          <AuthenProvider>              
            {children}             
          </AuthenProvider>         
        </NotificationProvider>
      </ThemeProvider>
      );
};

export default AppProvider;