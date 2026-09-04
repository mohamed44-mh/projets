import React, { useState, useEffect } from "react";
import Buttom from "./Buttom.jsx";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { User as UserIcon, Menu, X } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <span className="logo-full">
            <span className="elite">Elite</span>
            <span className="home">Home</span>
          </span>
          <span className="logo-short">
            <span className="elite">E</span>
            <span className="home">H</span>
          </span>
        </div>
        <div className={`header-actions ${isMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#" className="header-link" onClick={() => setIsMenuOpen(false)}>Contact</a>
          {user ? (
            <div className="navbar-user-profile" onClick={() => { navigate("/dashboard/compte"); setIsMenuOpen(false); }}>
              <div className="navbar-avatar-wrapper">
                {user.profile_photo_url ? (
                  <img src={user.profile_photo_url} alt={user.name} className="navbar-avatar-img" />
                ) : (
                  <UserIcon size={20} />
                )}
              </div>
              <span className="navbar-user-name">{user.name}</span>
            </div>
          ) : (
            <Buttom name="Login" onClick={() => { navigate("/auth"); setIsMenuOpen(false); }} />
          )}
        </div>

        <button 
          className="mobile-menu-btn" 
          onClick={() => navigate(user ? "/dashboard/compte" : "/auth")}
        >
          <div className="mobile-profile-icon">
            {user?.profile_photo_url ? (
              <img src={user.profile_photo_url} alt="Profile" className="mobile-avatar-img" />
            ) : (
              <UserIcon size={18} />
            )}
          </div>
        </button>
      </div>
      
      {isMenuOpen && <div className="navbar-backdrop" onClick={() => setIsMenuOpen(false)}></div>}
    </div>

  );
};

export default Navbar;
