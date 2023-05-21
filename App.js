import { AuthContextProvider } from './src/context/authContext';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthContextProvider>
    <Routes/>
    </AuthContextProvider>
  );
}