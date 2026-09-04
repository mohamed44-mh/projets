import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import './Notification.css';

const Notification = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className={`notification-container ${type}`}>
            <div className="notification-content">
                {type === 'success' ? (
                    <CheckCircle className="notification-icon" size={20} />
                ) : (
                    <XCircle className="notification-icon" size={20} />
                )}
                <span className="notification-message">{message}</span>
            </div>
            <button className="notification-close" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Notification;
