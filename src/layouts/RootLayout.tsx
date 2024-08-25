import { Outlet } from 'react-router-dom';

import Navbar from '@/layouts/layout/Navbar';

const RootLayout = () => (
  <div>
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

export default RootLayout;
