import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';

function App() {
  return (
    <AuthProvider>
      <PopupProvider>
        <Outlet />
      </PopupProvider>
    </AuthProvider>
  );
}

export default App;
