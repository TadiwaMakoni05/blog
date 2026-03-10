import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <Navbar />
      {/* ml-60 only on lg+ where sidebar is visible; pt-14 on mobile for the top bar */}
      <div className="flex-1 lg:ml-60 flex flex-col min-h-screen pt-14 lg:pt-0">
        <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
