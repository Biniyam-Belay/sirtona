import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Outlet will render the matched child route (e.g., HomePage) */}
      <main className="flex-grow pt-16"> {/* pt-16 to offset fixed navbar */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;