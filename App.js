import { StatusBar } from 'expo-status-bar';
import { AuthContextProvider } from './src/context/authContext';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthContextProvider>
      <StatusBar translucent backgroundColor="transparent" style='light' />
      <Routes/>
    </AuthContextProvider>
  );
}