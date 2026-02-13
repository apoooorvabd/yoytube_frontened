import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
    return (
        <div className="w-full min-h-screen bg-gray-950 text-white">
            <Header />
            <main className="pt-16 p-6 max-w-7xl mx-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
