import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Lock, Edit2, Check, X, Camera } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Notification from '../Shared/Notification';
import './Compte.css';

const Compte = () => {
    const { user, updateProfile } = useAuth();
    const location = useLocation();
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ 
        name: user?.name || '', 
        email: user?.email || '', 
        phone_number: user?.phone_number || user?.phone || '',
        password: '',
        password_confirmation: ''
    });

    useEffect(() => {
        if (user) {
            setEditData({
                name: user.name || '',
                email: user.email || '',
                phone_number: user.phone_number || user.phone || '',
                password: '',
                password_confirmation: ''
            });
        }
    }, [user]);

    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);

    useEffect(() => {
        if (location.state?.phoneRequired) {
            setNotification({
                show: true,
                message: "Veuillez d'abord ajouter votre numéro de téléphone dans votre compte.",
                type: 'error'
            });
            setIsEditing(true);
        }
    }, [location.state]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData(prev => ({ ...prev, [name]: value }));
    };

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [removePhoto, setRemovePhoto] = useState(false);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setRemovePhoto(false);
        }
    };

    const handleRemovePhoto = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setRemovePhoto(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        
        if (showPasswordFields && editData.password && editData.password !== editData.password_confirmation) {
            setNotification({ show: true, message: "Les mots de passe ne correspondent pas.", type: 'error' });
            return;
        }

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('name', editData.name);
            formData.append('email', editData.email);
            formData.append('phone_number', editData.phone_number);
            
            if (showPasswordFields && editData.password) {
                formData.append('password', editData.password);
                formData.append('password_confirmation', editData.password_confirmation);
            }

            if (selectedFile) {
                formData.append('profile_photo', selectedFile);
            } else if (removePhoto) {
                formData.append('remove_photo', 1);
            }

            await updateProfile(formData);
            setNotification({ show: true, message: "Profil mis à jour avec succès !", type: 'success' });
            setIsEditing(false);
            setShowPasswordFields(false);
            setSelectedFile(null);
            setPreviewUrl(null);
            setRemovePhoto(false);
            // Reset password fields
            setEditData(prev => ({ ...prev, password: '', password_confirmation: '' }));
        } catch (error) {
            console.error('Erreur mise à jour profil:', error);
            const errorMsg = error.response?.data?.message || "Une erreur est survenue lors de la mise à jour.";
            setNotification({ show: true, message: errorMsg, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        setEditData({ 
            name: user.name, 
            email: user.email, 
            phone_number: user.phone_number || '',
            password: '',
            password_confirmation: ''
        });
        setIsEditing(false);
        setShowPasswordFields(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        setRemovePhoto(false);
        setNotification({ show: false, message: '', type: 'success' });
    };

    return (
        <div className="compte-container">
            {notification.show && (
                <Notification 
                    message={notification.message} 
                    type={notification.type} 
                    onClose={() => setNotification({ ...notification, show: false })} 
                />
            )}
            <header className="compte-header">
                <h1>Mon Profil</h1>
                <p>Gérez vos informations personnelles et vos identifiants</p>
            </header>

            <div className="compte-form-wrapper">
                <div className="compte-avatar-section">
                    <div className="compte-avatar-circle">
                        {(previewUrl || user.profile_photo_url) && !removePhoto ? (
                            <img src={previewUrl || user.profile_photo_url} alt="Avatar" className="avatar-img" />
                        ) : (
                            <User size={40} color="#3b82f6" />
                        )}
                        {isEditing && (
                            <label htmlFor="avatar-upload" className="avatar-upload-label" title={previewUrl || user.profile_photo_url ? "Changer la photo" : "Ajouter une photo"}>
                                <Camera size={14} />
                                <input
                                    type="file"
                                    id="avatar-upload"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    hidden
                                />
                            </label>
                        )}
                    </div>
                    <div className="compte-user-info-section">
                        <div className="compte-user-title">
                            <h2>{user.name}</h2>
                            <span>{user.role || 'Utilisateur'}</span>
                        </div>
                        {isEditing && (previewUrl || (user.profile_photo_url && !removePhoto)) && (
                            <button 
                                type="button" 
                                className="btn-remove-photo-text"
                                onClick={handleRemovePhoto}
                            >
                                <X size={14} /> Supprimer la photo
                            </button>
                        )}
                    </div>
                </div>

                <form className="compte-form" onSubmit={handleSave}>
                    <div className="compte-form-grid">
                        <div className="form-item">
                            <label><User size={14} /> Nom d'utilisateur</label>
                            <input
                                type="text"
                                name="name"
                                value={isEditing ? editData.name : user.name}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className={!isEditing ? 'input-disabled' : ''}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label><Mail size={14} /> Email</label>
                            <input
                                type="email"
                                name="email"
                                value={isEditing ? editData.email : user.email}
                                onChange={handleInputChange}
                                readOnly={!isEditing}
                                className={!isEditing ? 'input-disabled' : ''}
                                required
                            />
                        </div>

                        <div className="form-item">
                            <label><Phone size={14} /> Numéro de téléphone</label>
                            <div className="input-with-badge">
                                <input
                                    type="tel"
                                    name="phone_number"
                                    value={isEditing ? editData.phone_number : (user?.phone_number || user?.phone || '')}
                                    onChange={handleInputChange}
                                    readOnly={!isEditing}
                                    className={!isEditing ? 'input-disabled' : ''}
                                    placeholder="Non spécifié"
                                />
                                {!(isEditing ? editData.phone_number : (user?.phone_number || user?.phone))?.trim() && (
                                    <span className="phone-required-badge">
                                        * Obligatoire
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-item">
                            <label><Lock size={14} /> Mot de passe</label>
                            <div className="password-input-wrapper">
                                <input
                                    type="password"
                                    name="dummy-password"
                                    value="********"
                                    readOnly
                                    className="input-disabled"
                                />
                                {isEditing && !showPasswordFields && (
                                    <button 
                                        type="button" 
                                        className="btn-password-edit"
                                        onClick={() => setShowPasswordFields(true)}
                                        title="Changer le mot de passe"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {isEditing && showPasswordFields && (
                            <>
                                <div className="form-item">
                                    <label><Lock size={14} /> Nouveau mot de passe</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={editData.password}
                                        onChange={handleInputChange}
                                        placeholder="Entrez le nouveau mot de passe"
                                        required={showPasswordFields}
                                        autoFocus
                                    />
                                </div>
                                <div className="form-item">
                                    <label><Lock size={14} /> Confirmer le mot de passe</label>
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        value={editData.password_confirmation}
                                        onChange={handleInputChange}
                                        placeholder="Confirmez le nouveau mot de passe"
                                        required={showPasswordFields}
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    <div className="compte-form-actions">
                        {!isEditing ? (
                            <button type="button" className="btn-edit" onClick={() => setIsEditing(true)}>
                                <Edit2 size={16} />
                                Modifier les informations
                            </button>
                        ) : (
                            <div className="button-group">
                                <button type="button" className="btn-cancel" onClick={handleCancel} disabled={isSubmitting}>
                                    Annuler
                                </button>
                                <button type="submit" className="btn-save" disabled={isSubmitting}>
                                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Compte;
