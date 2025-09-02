import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainPage from './pages/MainPage';
import ImportPage from './pages/ImportPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/import',
    element: <ImportPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
