import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ImportPage from './pages/ImportPage';
import NotFoundPage from './pages/NotFoundPage';
import RootLayout from './components/layout/RootLayout';
import { ThemeProvider } from './components/theme/ThemeProvider';
import './styles/globals.css';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/import',
        element: <ImportPage />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
