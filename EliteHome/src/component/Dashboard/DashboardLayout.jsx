import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { useAuth } from '../../context/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [properties, setProperties] = useState([]);

    const { user, loading } = useAuth();
    
    if (loading) {
        return <div className="loading">Chargement...</div>;
    }

    if (!user) {
        return <Navigate to="/auth" replace />;
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="dashboard-container">
            <header className="mobile-dashboard-header">
                <div className="mobile-logo">
                    <span className="logo-full">
                        <span className="elite">Elite</span>
                        <span className="home">Home</span>
                    </span>
                    <span className="logo-short">
                        <span className="elite">E</span>
                        <span className="home">H</span>
                    </span>
                </div>
                <button
                    className="mobile-menu-toggle"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </header>

            <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />

            <main className={`dashboard-content ${isMobileMenuOpen ? 'menu-open' : ''}`}>
                <div className="dashboard-page-body">
                    <Outlet context={{ closeMobileMenu }} />
                </div>
                <footer className="dashboard-footer">
                    <p>© 2026 EliteHome Immobilier .</p>
                </footer>
            </main>

            {/* Backdrop for mobile */}
            {isMobileMenuOpen && (
                <div className="mobile-backdrop" onClick={closeMobileMenu}></div>
            )}
        </div>
    );
};

export default DashboardLayout;
