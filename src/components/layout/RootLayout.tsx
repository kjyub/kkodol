import { Outlet } from 'react-router-dom';
import Header from './Header';

function RootLayout() {
  return (
    <div className="">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
