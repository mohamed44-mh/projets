import React, { useState } from 'react';
import { Plus, Trash2, Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import propertyService from '../../../services/propertyService';
import './Ajouter.css';

const Ajouter = () => {
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Vente',
        category: 'Appartement',
        price: '',
        location: '',
        address: '',
        description: '',
        images: [] 
    });

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
        try {
            if (formData.images.length === 0) {
                alert("Veuillez ajouter au moins une image.");
                return;
            }

            const data = new FormData();
            data.append('title', formData.title);
            // Backend schema: 'status' = vente/location, 'type' = appartement/maison/...
            data.append('status', formData.type.toLowerCase());    // Vente → vente
            data.append('type', formData.category.toLowerCase());  // Appartement → appartement
            data.append('price', formData.price);
            data.append('location', formData.location);
            data.append('address', formData.address || '');
            data.append('description', formData.description || '');

            formData.images.forEach((img) => {
                if (img.file) {
                    data.append('images', img.file); // multer uses 'images' not 'images[]'
                }
            });

            await propertyService.createProperty(data);
            alert('Bien ajouté avec succès !');
            navigate('/dashboard/management');
        } catch (error) {
            console.error('Erreur lors de l\'ajout:', error);
            const msg = error?.response?.data?.message || 'Une erreur est survenue.';
            alert(msg);
        }
    };

    return (
        <div className="ajouter-page-container">
            <header className="ajouter-header">
                <div className="header-titles">
                    <h1>Gestion des Biens</h1>
                    <p>Ajoutez un nouveau bien à votre catalogue</p>
                </div>
                {showForm ? (
                    <button
                        className="btn-back"
                        onClick={() => setShowForm(false)}
                    >
                        <ArrowLeft size={20} />
                        Retour
                    </button>
                ) : (
                    <button
                        className="btn-add-main"
                        onClick={() => setShowForm(true)}
                    >
                        <Plus size={20} />
                        Ajouter un bien
                    </button>
                )}
            </header>

            <div className="ajouter-content-body">
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
                                    <label>Localisation</label>
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
                                <label>Adresse exacte <span style={{fontSize:'0.8em', color:'#888'}}>(optionnel)</span></label>
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
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
                                    placeholder="Décrivez votre bien en détail..."
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

                            <button type="submit" className="btn-submit">
                                Ajouter le bien
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="empty-state">
                        <div className="empty-state-icon">
                            <Home size={64} />
                        </div>
                        <p>Cliquez sur "Ajouter un bien" pour commencer.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Ajouter;
