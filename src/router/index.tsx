import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/components/layout/RootLayout';
import TalkLayout from '@/components/layout/TalkLayout';
import NotFoundPage from '@/pages/NotFoundPage';
import ImportPage from '@/pages/ImportPage';
import CountPage from '@/pages/talks/CountPage';
import ChatsPage from '@/pages/talks/ChatsPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <TalkLayout />,
        children: [
          {
            index: true,
            element: <CountPage />,
          },
          {
            path: 'count',
            element: <CountPage />,
          },
          {
            path: 'chats',
            element: <ChatsPage />,
          },
        ],
      },
      {
        path: '/import',
        element: <ImportPage />,
      },
    ],
  },
]);
