import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Send } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-grid">
                {/* Column 1: Brand & Bio */}
                <div className="footer-section brand-column">
                    <h3 className="footer-logo">EliteHome</h3>
                    <p className="footer-bio">
                        EliteHome represents excellence in the real estate market. We provide bespoke services for buying, selling, and managing premium properties with unmatched professionalism.
                    </p>
                    <div className="social-links">
                        <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={20} /></a>
                        <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={20} /></a>
                        <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={20} /></a>
                        <a href="#" className="social-icon" aria-label="Linkedin"><Linkedin size={20} /></a>
                    </div>
                </div>

                {/* Column 2: Quick Navigation */}
                <div className="footer-section links-column">
                    <h4 className="footer-heading">Navigation</h4>
                    <ul className="footer-list">
                        <li><a href="#Hero">Accueil</a></li>
                        <li><a href="#properties">Propriétés</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </div>

                {/* Column 4: Contact & Newsletter */}
                <div className="footer-section contact-column">
                    <h4 className="footer-heading">Contact & News</h4>
                    <ul className="footer-contact-info">
                        <li>
                            <MapPin size={18} className="icon-blue" />
                            <span>Casablanca</span>
                        </li>
                        <li>
                            <Phone size={18} className="icon-blue" />
                            <a href="tel:+212772001108" style={{ color: 'inherit', textDecoration: 'none' }}>+212 772001108</a>
                        </li>
                    </ul>
                    
                </div>
            </div>

            <div className="footer-legal">
                <div className="container legal-content">
                    <p className="footer-copyright">&copy; 2026 EliteHome Immobilier. All rights reserved.</p>
                    <div className="legal-links">
                        <a href="#">Mentions Légales</a>
                        <a href="#">Confidentialité</a>
                        <a href="#">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
