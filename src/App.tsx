import { RouterProvider } from 'react-router-dom';
import { router } from '@/router';
import { ThemeProvider } from './components/theme/ThemeProvider';
import './styles/globals.css';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
