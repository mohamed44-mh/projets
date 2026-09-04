import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import Notification from '../Dashboard/Shared/Notification';

const Auth = ({ onBack }) => {
    const { login, register, user, loading: authLoading } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '', user_type: 'User' });
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // No logout message check needed anymore
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isLogin) {
                await login({ email: formData.email, password: formData.password });
            } else {
                await register(formData);
            }
            navigate("/dashboard/home");
        } catch (err) {
            console.error('Auth error:', err);
            if (err.code === 'ERR_NETWORK') {
                setError('Impossible de contacter le serveur. Assurez-vous que le backend est lancé.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else if (err.response?.data?.errors) {
                const firstError = Object.values(err.response.data.errors)[0][0];
                setError(firstError);
            } else {
                setError('Une erreur est survenue lors de la connexion au serveur.');
            }
        } finally {
            setLoading(false);
        }
    };

    // If already logged in, redirect to dashboard
    if (!authLoading && user) {
        return <Navigate to="/dashboard/home" replace />;
    }

    return (
        <div className="auth-container">
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}
            <button className="back-home" onClick={onBack || (() => navigate('/'))}>
                ← Retour au site
            </button>


            <div className="auth-card">
                <div className="auth-header">
                    <h2 className="auth-title">
                        {isLogin ? 'Connexion' : 'Inscription'}
                    </h2>
                    <p className="auth-subtitle">
                        {isLogin ? 'Accédez à votre espace personnel' : 'Créez votre compte pour commencer'}
                    </p>
                </div>

                {error && <div className="auth-error" style={{ color: '#ef4444', marginBottom: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{error}</div>}

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Nom complet</label>
                            <input type="text" name="name" className="form-input" placeholder="Nom Complet" value={formData.name} onChange={handleChange} required />
                        </div>
                    )}

                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" name="email" className="form-input" placeholder="exemple@email.com" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Mot de passe</label>
                        <input type="password" name="password" className="form-input" placeholder="••••••••" value={formData.password} onChange={handleChange} minLength="7" required />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label className="form-label">Confirmer le mot de passe</label>
                            <input type="password" name="password_confirmation" className="form-input" placeholder="••••••••" value={formData.password_confirmation} onChange={handleChange} minLength="7" required />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                        {loading ? 'Chargement...' : (isLogin ? 'Se connecter' : "S'inscrire")}
                    </button>
                </form>

                <div className="auth-footer">
                    {isLogin ? "Pas encore de compte ?" : "Déjà un compte ?"}
                    <span className="auth-link" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
                        {isLogin ? "Créer un compte" : "Se connecter"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Auth;
