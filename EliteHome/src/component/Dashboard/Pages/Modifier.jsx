import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2 } from 'lucide-react';
import propertyService from '../../../services/propertyService';
import Notification from '../Shared/Notification';
import './Management.css'; // Reusing Management styles for consistency and the neuen textarea style

const Modifier = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await propertyService.getProperty(id);
                // API returns { data: {...} } — unwrap it
                const data = response?.data ?? response;
                const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

                setFormData({
                    title: data.title ?? '',
                    // Backend: status=vente/location → form type=Vente/Location
                    type: data.status
                        ? data.status.charAt(0).toUpperCase() + data.status.slice(1)
                        : 'Vente',
                    // Backend: type=appartement/maison → form category=Appartement/Maison
                    category: data.type
                        ? data.type.charAt(0).toUpperCase() + data.type.slice(1)
                        : 'Appartement',
                    description: data.description ?? '',
                    price: data.price != null ? String(data.price) : '',
                    location: data.location ?? '',
                    address: (data.address && data.address.trim()) ? data.address : (data.location ?? ''),
                    // Build image objects with full display URL for preview
                    images: (data.images ?? []).map(url => ({
                        url: url.startsWith('http') ? url : `${BACKEND}${url}`,
                        serverPath: url,
                        file: null,
                        isExisting: true
                    }))
                });
            } catch (error) {
                console.error('Erreur lors du chargement du bien:', error);
                alert('Bien introuvable.');
                navigate('/dashboard/management');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map(file => ({
            url: URL.createObjectURL(file),
            file: file,
            isExisting: false
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
        if (formData.images.length === 0) {
            setNotification({ show: true, message: "Veuillez ajouter au moins une image.", type: 'error' });
            return;
        }

        setIsSubmitting(true);
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('status', formData.type.toLowerCase());    // Vente → vente
            data.append('type', formData.category.toLowerCase());  // Appartement → appartement
            data.append('description', formData.description);
            data.append('price', formData.price);
            data.append('location', formData.location);
            data.append('address', formData.address ?? '');

            // Send existing image server paths so backend keeps them
            formData.images.forEach((img) => {
                if (img.isExisting && img.serverPath) {
                    data.append('existingImages', img.serverPath);
                } else if (img.file) {
                    data.append('images', img.file);  // new uploads
                }
            });

            await propertyService.updateProperty(id, data);
            setNotification({ show: true, message: "Bien mis à jour avec succès !", type: 'success' });
            setTimeout(() => {
                navigate('/dashboard/management');
            }, 1500);
        } catch (error) {
            console.error('Erreur lors de la modification:', error);
            const msg = error?.response?.data?.message || "Une erreur est survenue lors de la modification.";
            setNotification({ show: true, message: msg, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading || !formData) return <div className="loading">Chargement...</div>;

    return (
        <div className="ajouter-page-container">
            {notification.show && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, show: false })}
                />
            )}
            <header className="ajouter-header">
                <div className="header-titles">
                    <h1>Modifier le Bien</h1>
                    <p>Modifiez les informations de votre annonce</p>
                </div>
                <button className="btn-back" onClick={() => navigate('/dashboard/management')}>
                    <ArrowLeft size={20} />
                    Retour
                </button>
            </header>

            <div className="ajouter-content-body">
                <div className="form-card">
                    <h2>Modifier les détails</h2>
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
                                    placeholder="Ex: 1 200 000"
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
                            <label>Adresse exacte (optionnel)</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address ?? ''}
                                onChange={handleInputChange}
                                placeholder="Ex: 12 Boulevard Mohamed V, Maarif"
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
                                rows="6"
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
                                    Mise à jour...
                                </span>
                            ) : (
                                'Enregistrer les modifications'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modifier;
