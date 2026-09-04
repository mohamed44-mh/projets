import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Home, Tag, Info, Calendar, Phone, Star } from 'lucide-react';
import propertyService from '../../../services/propertyService';
import './Details.css';

const Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [isSubmittingRating, setIsSubmittingRating] = useState(false);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await propertyService.getProperty(id);
                // API returns { data: {...} } — unwrap it
                setProperty(response?.data ?? response);
            } catch (error) {
                console.error('Erreur lors du chargement des détails:', error);
                alert('Bien introuvable.');
                navigate('/dashboard/home');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, navigate]);

    const handleRate = async (score) => {
        if (!localStorage.getItem('token')) {
            alert('Veuillez vous connecter pour évaluer ce bien.');
            return;
        }

        try {
            setIsSubmittingRating(true);
            await propertyService.rateProperty(id, score);
            // Re-fetch to get the updated property details
            const response = await propertyService.getProperty(id);
            setProperty(response?.data ?? response);
        } catch (error) {
            console.error("Erreur lors de l'évaluation", error);
            alert("Erreur lors de l'évaluation du bien.");
        } finally {
            setIsSubmittingRating(false);
        }
    };

    if (loading || !property) return <div className="loading">Chargement...</div>;

    const BACKEND = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
    const rawImages = property.images && property.images.length > 0 ? property.images : [property.image].filter(Boolean);
    const images = rawImages.map(img => img && img.startsWith('http') ? img : `${BACKEND}${img}`);

    return (
        <div className="details-container">
            <header className="details-header">
                <div className="header-left">
                    <button className="btn-back-details" onClick={() => navigate(-1)}>
                        <ArrowLeft size={16} />
                        Retour
                    </button>
                    <h1>{property.title}</h1>
                </div>
                <div className="header-right">
                    <span className={`tag tag-${property.type?.toLowerCase()}`}>
                        {property.type}
                    </span>
                    <div
                        className={`property-rating-interactive ${isSubmittingRating ? 'submitting' : ''}`}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <div className="stars-row">
                            {[1, 2, 3, 4, 5].map((star) => {
                                // averageRating is a virtual from MongoDB model
                                const avgScore = property.averageRating || property.ratings_avg_score || 0;
                                const isFilled = hoverRating ? star <= hoverRating : star <= avgScore;
                                return (
                                    <Star
                                        key={star}
                                        className={`rating-star ${isFilled ? 'filled' : ''}`}
                                        size={16}
                                        fill={isFilled ? "currentColor" : "none"}
                                        strokeWidth={2}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onClick={() => !isSubmittingRating && handleRate(star)}
                                    />
                                );
                            })}
                        </div>
                        <span className="rating-score">
                            {(property.averageRating || property.ratings_avg_score) 
                                ? Number(property.averageRating || property.ratings_avg_score).toFixed(1) 
                                : '0.0'}
                        </span>
                    </div>
                </div>
            </header>

            <div className="details-grid">
                <div className="gallery-section">
                    <div className="main-image">
                        <img src={images[activeImageIndex]} alt={property.title} />
                    </div>
                    {images.length > 1 && (
                        <div className="thumbnail-grid">
                            {images.map((img, index) => (
                                <div
                                    key={index}
                                    className={`thumbnail ${index === activeImageIndex ? 'active' : ''}`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img src={img} alt={`${property.title} preview ${index}`} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Rating shown below photos on very narrow screens */}
                    <div
                        className={`property-rating-interactive rating-below-gallery ${isSubmittingRating ? 'submitting' : ''}`}
                        onMouseLeave={() => setHoverRating(0)}
                    >
                        <div className="stars-row">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const avgScore = property.averageRating || property.ratings_avg_score || 0;
                                const isFilled = hoverRating ? star <= hoverRating : star <= avgScore;
                                return (
                                    <Star
                                        key={star}
                                        className={`rating-star ${isFilled ? 'filled' : ''}`}
                                        size={16}
                                        fill={isFilled ? "currentColor" : "none"}
                                        strokeWidth={2}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onClick={() => !isSubmittingRating && handleRate(star)}
                                    />
                                );
                            })}
                        </div>
                        <span className="rating-score">
                            {(property.averageRating || property.ratings_avg_score) 
                                ? Number(property.averageRating || property.ratings_avg_score).toFixed(1) 
                                : '0.0'}
                        </span>
                    </div>

                    <div className="specs-wrapper">
                        <div className="specs-grid">
                            <div className="spec-item">
                                <span className="spec-label">Catégorie</span>
                                <div className="spec-value">
                                    <Home size={18} />
                                    {property.category || 'Non spécifié'}
                                </div>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Type</span>
                                <div className="spec-value">
                                    <Tag size={18} />
                                    {property.type}
                                </div>
                            </div>
                            <div className="spec-item highlight-contact">
                                <span className="spec-label">Num. téléphone</span>
                                <div className="spec-value">
                                    <Phone size={18} />
                                    {property.owner?.phone || property.user?.phone_number || 'Non spécifié'}
                                </div>
                            </div>
                            <div className="spec-item">
                                <span className="spec-label">Statut</span>
                                <div className="spec-value">Disponible</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="info-section">
                    <div className="info-cards-stack">

                        <div className="price-container">
                            <span className="price-label">Prix</span>
                            <div className="price-value">
                                {property.price} DH
                                {property.type === 'Location' && <span className="price-period"> /month</span>}
                            </div>
                            <div className="location-badge">
                                <MapPin size={16} />
                                <span>{property.location}</span>
                            </div>
                        </div>

                        {property.address && (
                            <div className="address-section-card standalone-card">
                                <span className="address-label">Adresse</span>
                                <div className="address-display card-address">
                                    <span className="address-icon">📍</span> {property.address}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="description-card">
                    <h2>Description du bien</h2>
                    <div className="description-body">
                        {property.description}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;
