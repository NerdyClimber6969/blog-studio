import AuthenProvider  from './AuthenProvider.jsx';
import NotificationProvider  from './NotificationProvider.jsx';
import ProfileProvider  from './ProfileProvider.jsx';

function AppProvider({ children }) {
    return (
        <NotificationProvider>
          <AuthenProvider>
            <ProfileProvider>
                {children}
            </ProfileProvider>
          </AuthenProvider>  
        </NotificationProvider>
      );
};

export default AppProvider;