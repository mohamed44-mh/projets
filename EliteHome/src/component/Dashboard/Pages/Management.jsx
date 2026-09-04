import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, MapPin, Plus, ArrowLeft, Home, Eye, Phone, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import propertyService from '../../../services/propertyService';
import Notification from '../Shared/Notification';
import ConfirmModal from '../Shared/ConfirmModal';
import { useAuth } from '../../../context/AuthContext';
import './Management.css';

const Management = () => {
    const { user } = useAuth();
    const isAdmin = user?.email === 'admin@gmail.com';
    const userHasPhone = !!(user?.phone || user?.phone_number);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
    const [deleteConfirm, setDeleteConfirm] = useState({ show: false, propertyId: null });
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Vente',
        category: 'Appartement',
        description: '',
        price: '',
        location: '',
        address: '',
        images: []
    });

    useEffect(() => {
        fetchUserProperties();
    }, []);

    const fetchUserProperties = async () => {
        try {
            setLoading(true);
            const response = await propertyService.getUserProperties();
            // API returns { data: [...] } — unwrap it
            const list = response?.data ?? response ?? [];
            setProperties(Array.isArray(list) ? list : []);
        } catch (error) {
            console.error('Erreur lors du chargement de vos biens:', error);
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file
        }));

        setFormData(prev => ({
            ...prev,
            images: [...prev.images, ...newImages]
        }));
    };

    const removeImage = (index) => {
        setFormData(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userHasPhone) {
            setNotification({ show: true, message: "Veuillez d'abord ajouter votre numéro de téléphone dans votre compte.", type: 'error' });
            setTimeout(() => navigate('/dashboard/compte', { state: { phoneRequired: true } }), 1000);
            return;
        }

        if (formData.images.length === 0) {
            setNotification({ show: true, message: "Veuillez ajouter au moins une image.", type: 'error' });
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            // Backend: 'status' = vente/location, 'type' = appartement/maison/...
            data.append('status', formData.type.toLowerCase());
            data.append('type', formData.category.toLowerCase());
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('location', formData.location);
            data.append('address', formData.address || '');

            formData.images.forEach((img) => {
                if (img.file) {
                    data.append('images', img.file);
                }
            });

            await propertyService.createProperty(data);

            setNotification({ show: true, message: "Bien ajouté avec succès !", type: 'success' });
            setShowForm(false);
            setFormData({
                title: '',
                type: 'Vente',
                category: 'Appartement',
                description: '',
                price: '',
                location: '',
                address: '',
                images: []
            });
            fetchUserProperties();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du bien:', error);
            setNotification({ show: true, message: "Une erreur est survenue lors de l\'ajout.", type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = (id) => {
        setDeleteConfirm({ show: true, propertyId: id });
    };

    const executeDelete = async () => {
        const id = deleteConfirm.propertyId;
        setIsDeleting(true);

        try {
            await propertyService.deleteProperty(id);
            setNotification({ show: true, message: "Bien supprimé avec succès !", type: 'success' });
            setIsDeleting(false);
            setDeleteConfirm({ show: false, propertyId: null });
            fetchUserProperties();
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            setNotification({ show: true, message: "Erreur lors de la suppression.", type: 'error' });
            setIsDeleting(false);
            setDeleteConfirm({ show: false, propertyId: null });
        }
    };

    return (
        <div className="management-container">
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}

            <ConfirmModal
                show={deleteConfirm.show}
                title="Supprimer le bien ?"
                message="Êtes-vous sûr de vouloir supprimer ce bien ? Cette action est irréversible."
                confirmText="Supprimer"
                type="danger"
                isLoading={isDeleting}
                loadingText="Suppression en cours..."
                onConfirm={executeDelete}
                onCancel={() => setDeleteConfirm({ show: false, propertyId: null })}
            />

            <header className="management-header">
                <div>
                    <h1>{isAdmin ? "Tous les Biens (Admin)" : "Management des Biens"}</h1>
                    <p className="subtitle">
                        {showForm
                            ? "Ajoutez un nouveau bien à votre catalogue"
                            : isAdmin
                                ? "Gérez l'ensemble des propriétés du projet en tant qu'Administrateur."
                                : "Gérez vos propriétés, modifiez les détails ou supprimez des annonces."}
                    </p>
                </div>
                <button
                    className={`btn-toggle-form ${showForm ? 'btn-back' : 'btn-add-main'}`}
                    onClick={() => {
                        if (!showForm && !userHasPhone) {
                            setNotification({
                                show: true,
                                message: 'Veuillez d\'abord ajouter votre numéro de téléphone dans votre compte.',
                                type: 'error'
                            });
                            setTimeout(() => navigate('/dashboard/compte', { state: { phoneRequired: true } }), 1000);
                            return;
                        }
                        setShowForm(!showForm);
                    }}
                >
                    {showForm ? (
                        <>
                            <ArrowLeft size={18} />
                            Retour
                        </>
                    ) : (
                        <>
                            <Plus size={18} />
                            Ajouter un bien
                        </>
                    )}
                </button>
            </header>

            <div className="management-content">
                {showForm ? (
                    <div className="form-card">
                        <h2>Nouveau Bien Immobilier</h2>
                        <form className="property-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Titre du bien</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Ex: Villa de luxe à Harhoura ou Bel appartement à Casablanca"
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Type de transaction</label>
                                    <select name="type" value={formData.type} onChange={handleInputChange}>
                                        <option value="Vente">Vente</option>
                                        <option value="Location">Location</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Catégorie</label>
                                    <select name="category" value={formData.category} onChange={handleInputChange}>
                                        <option value="Appartement">Appartement</option>
                                        <option value="Maison">Maison</option>
                                        <option value="Villa">Villa</option>
                                        <option value="Studio">Studio</option>
                                        <option value="Manoir">Manoir</option>
                                        <option value="Duplex">Duplex</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Prix</label>
                                    <input
                                        type="text"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleInputChange}
                                        placeholder="Ex: 2 500 000 DH ou 6 000 DH / mois"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Localisation (Ville)</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="Ex: Casablanca, Maroc"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Adresse exacte</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Ex: 12 Boulevard Mohamed V, Maarif"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Description détaillée</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Décrivez votre bien en détail (équipements, environnement, points forts...)"
                                    required
                                    rows="4"
                                    className="form-textarea"
                                ></textarea>
                            </div>

                            <div className="form-group">
                                <label>Photos du bien</label>
                                <div className="upload-zone">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        multiple
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        hidden
                                    />
                                    <label htmlFor="file-upload" className="upload-label">
                                        <Plus size={32} />
                                        <span>Cliquez pour ajouter des photos</span>
                                    </label>
                                </div>

                                {formData.images.length > 0 && (
                                    <div className="preview-gallery">
                                        {formData.images.map((img, index) => (
                                            <div key={index} className="preview-item">
                                                <img src={img.url} alt={`Preview ${index}`} />
                                                <button
                                                    type="button"
                                                    className="btn-remove-preview"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button
                                type="submit"
                                className={`btn-submit ${isSubmitting ? 'submitting' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="btn-loader-container">
                                        <span className="btn-spinner"></span>
                                        Ajout en cours...
                                    </span>
                                ) : (
                                    'Ajouter le bien'
                                )}
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="table-container">
                        {loading ? (
                            <div className="text-center p-4">Chargement...</div>
                        ) : properties.length > 0 ? (
                            <>
                                {/* Table for Desktop and Tablet */}
                                <table className="data-table desktop-table-only">
                                    <thead>
                                        <tr>
                                            <th>Bien</th>
                                            {isAdmin && <th className="hide-md">Propriétaire</th>}
                                            <th className="hide-sm">Type</th>
                                            <th className="hide-sm">Prix</th>
                                            <th className="hide-md">Localisation</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {properties.map((property) => {
                                            const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
                                            const thumb = property.images && property.images.length > 0
                                                ? (property.images[0].startsWith('http') ? property.images[0] : `${BACKEND}${property.images[0]}`)
                                                : '/api/placeholder/48/48';
                                            const pid = property._id || property.id;
                                            return (
                                            <tr key={pid}>
                                                <td>
                                                    <div className="property-cell">
                                                        <img
                                                            src={thumb}
                                                            alt={property.title}
                                                            className="property-thumb"
                                                        />
                                                        <div className="property-info">
                                                            <h3>{property.title}</h3>
                                                            <span className="hide-desktop">{property.price} DH</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                {isAdmin && (
                                                    <td className="hide-md">
                                                        <div className="owner-cell">
                                                            <span className="owner-name" title={property.owner?.name || 'N/A'}>{property.owner?.name || 'N/A'}</span>
                                                            <span className="owner-email" title={property.owner?.email || ''}>{property.owner?.email || ''}</span>
                                                        </div>
                                                    </td>
                                                )}
                                                <td className="hide-sm">
                                                    <span className={`status-badge ${property.type === 'Vente' ? 'status-vente' : 'status-location'}`}>
                                                        {property.type}
                                                    </span>
                                                </td>
                                                <td className="hide-sm font-medium">{property.price} DH</td>
                                                <td className="hide-md">
                                                    <div className="flex items-center gap-2 text-slate-500">
                                                        <MapPin size={14} />
                                                        {property.location}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="action-buttons">
                                                        <button
                                                            className="btn-action btn-voir"
                                                            title="Voir"
                                                            onClick={() => navigate(`/dashboard/details/${pid}`)}
                                                        >
                                                            <Eye size={20} color="white" strokeWidth={2.5} />
                                                        </button>
                                                        <button
                                                            className="btn-action btn-modifier"
                                                            title="Modifier"
                                                            onClick={() => navigate(`/dashboard/modifier/${pid}`)}
                                                        >
                                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                            </svg>
                                                        </button>
                                                        <button
                                                            className="btn-action btn-delete"
                                                            title="Supprimer"
                                                            onClick={() => handleDelete(pid)}
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                {/* Dedicated Mobile Layout */}
                                <div className="mobile-properties-list">
                                    <div className="mobile-list-header">
                                        <span>BIEN</span>
                                    </div>
                                    {properties.map((property) => {
                                        const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
                                        const thumb = property.images && property.images.length > 0
                                            ? (property.images[0].startsWith('http') ? property.images[0] : `${BACKEND}${property.images[0]}`)
                                            : '/api/placeholder/48/48';
                                        const pid = property._id || property.id;
                                        return (
                                            <div key={pid} className="mobile-property-item">
                                                {/* Ligne 1 : Image + Titre & Informations */}
                                                <div className="mobile-property-row-top">
                                                    <img
                                                        src={thumb}
                                                        alt={property.title}
                                                        className="mobile-property-thumb"
                                                    />
                                                    <div className="mobile-property-info">
                                                        <div className="mobile-property-header-line">
                                                            <h3 className="mobile-property-title">{property.title}</h3>
                                                            <span className={`status-badge ${property.type === 'Vente' ? 'status-vente' : 'status-location'}`}>
                                                                {property.type}
                                                            </span>
                                                        </div>
                                                        <div className="mobile-property-meta-line">
                                                            <span className="mobile-property-price">{property.price} DH</span>
                                                            {property.location && (
                                                                <span className="mobile-property-location">
                                                                    <MapPin size={13} />
                                                                    {property.location}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {isAdmin && property.owner && (
                                                            <div className="mobile-property-owner-line">
                                                                <span>Propriétaire : <strong>{property.owner?.name || 'N/A'}</strong></span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Ligne 2 : Boutons d'actions en dessous */}
                                                <div className="mobile-property-row-actions">
                                                    <button
                                                        className="mobile-btn-action mobile-btn-voir"
                                                        onClick={() => navigate(`/dashboard/details/${pid}`)}
                                                    >
                                                        <Eye size={13} color="white" strokeWidth={2.5} />
                                                        <span>Voir</span>
                                                    </button>
                                                    <button
                                                        className="mobile-btn-action mobile-btn-modifier"
                                                        onClick={() => navigate(`/dashboard/modifier/${pid}`)}
                                                    >
                                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                                                        </svg>
                                                        <span>Modifier</span>
                                                    </button>
                                                    <button
                                                        className="mobile-btn-action mobile-btn-delete"
                                                        onClick={() => handleDelete(pid)}
                                                    >
                                                        <Trash2 size={13} />
                                                        <span>Supprimer</span>
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <div className="empty-state-mgmt">
                                <div className="empty-state-icon">
                                    <Home size={64} />
                                </div>
                                <h3>Aucun bien trouvé</h3>
                                <p>Cliquez sur "Ajouter un bien" pour commencer.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Management;

