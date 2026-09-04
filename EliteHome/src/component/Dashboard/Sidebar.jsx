import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    Home,
    PlusSquare,
    LayoutDashboard,
    MessageSquare,
    User,
    LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ConfirmModal from './Shared/ConfirmModal';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const executeLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            setIsLoggingOut(false);
            setShowLogoutConfirm(false);
            if (onClose) onClose();
            navigate('/auth');
        } catch (error) {
            console.error('Logout failed:', error);
            setIsLoggingOut(false);
            setShowLogoutConfirm(false);
            if (onClose) onClose();
            navigate('/auth');
        }
    };

    const handleNavClick = () => {
        if (onClose) onClose();
    };

    const navItems = [
        { icon: <Home size={20} />, label: 'Accueil', path: 'home' },
        { 
            icon: <LayoutDashboard size={20} />, 
            label: user?.email === 'admin@gmail.com' ? 'Tous les biens' : 'Mes biens', 
            path: 'management' 
        },
        { icon: <MessageSquare size={20} />, label: 'Contact', path: 'contact' },
        { icon: <User size={20} />, label: 'Compte', path: 'compte' },
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
                <div className="sidebar-user-showcase">
                    <div className="sidebar-avatar-wrapper">
                        {user?.profile_photo_url ? (
                            <img src={user.profile_photo_url} alt={user.name} className="sidebar-avatar-img" />
                        ) : (
                            <User size={24} />
                        )}
                    </div>
                    <div className="sidebar-user-meta">
                        <span className="sidebar-username">{user?.name || 'Utilisateur'}</span>
                        <span className="sidebar-user-status">En ligne</span>
                    </div>
                </div>
                <div className="logo-container sidebar-logo-desktop">
                    <img src="https://img.icons8.com/fluency/100/home.png" width="40px" />
                    <span className="logo-full-h">
                        <span className="elite-h">Elite</span>
                        <span className="home-h">Home</span>
                    </span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={handleNavClick}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''}`
                        }
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <ConfirmModal 
                show={showLogoutConfirm}
                title="Se déconnecter ?"
                message="Êtes-vous sûr de vouloir vous déconnecter de votre session ?"
                confirmText="Se déconnecter"
                type="logout"
                isLoading={isLoggingOut}
                loadingText="Déconnexion en cours..."
                onConfirm={executeLogout}
                onCancel={() => setShowLogoutConfirm(false)}
            />

            <div className="sidebar-footer">
                <button className="logout-button" onClick={handleLogoutClick}>
                    <LogOut size={20} />
                    <span>Se déconnecter</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
