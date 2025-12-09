import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/Navbar/Navbar';

const RootLayouts = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100">
      {/* Full-width sticky navbar */}
      <Navbar />

      {/* Main content area – center + max-width */}
      <main className="flex-1 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <Outlet />
        </div>
      </main>

      {/* Full-width footer */}
      <Footer />
    </div>
  );
};

export default RootLayouts;
