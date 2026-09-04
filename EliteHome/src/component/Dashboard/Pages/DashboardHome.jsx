import React, { useState, useEffect } from 'react';
import { User, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import propertyService from '../../../services/propertyService';
import './DashboardHome.css';

const DashboardPropertyCard = ({ property }) => {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        let interval;
        if (isHovered && property?.images?.length > 1) {
            interval = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
            }, 1500);
        } else {
            setCurrentImageIndex(0);
        }

        return () => clearInterval(interval);
    }, [isHovered, property?.images?.length]);

    return (
        <div
            className="property-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => navigate(`/dashboard/details/${property._id || property.id}`)}
            style={{ cursor: 'pointer' }}
        >
            <div className="card-image">
                {property?.images && property.images.length > 0 ? (
                    property.images.map((img, index) => (
                        <img
                            key={index}
                            src={img.startsWith('http') ? img : `${import.meta.env.VITE_BACKEND_URL}${img}`}
                            alt={`${property.title} - ${index + 1}`}
                            className={index === currentImageIndex ? 'active' : ''}
                        />
                    ))
                ) : (
                    <img
                        src={property?.image || '/api/placeholder/400/300'}
                        alt={property?.title}
                        className="active"
                    />
                )}
                <div className="image-overlay">
                    <span className={`tag tag-${property?.type?.toLowerCase() || ''}`}>
                        {property?.type}
                    </span>
                </div>
            </div>
            <div className="card-content">
                <div className="card-category">{property.tag}</div>
                <h3 className="card-title">{property.title}</h3>
                <p className="card-location">📍 {property.location}</p>
                <div className="card-footer">
                    <span className="card-price">{property.price} DH</span>
                    <button className="btn-details">Détails</button>
                </div>
            </div>
        </div>
    );
};

const PropertySkeleton = () => (
    <div className="skeleton-card">
        <div className="skeleton-img skeleton" />
        <div className="skeleton-content">
            <div className="skeleton-text skeleton-title skeleton" />
            <div className="skeleton-text skeleton-location skeleton" />
            <div className="skeleton-footer">
                <div className="skeleton-text skeleton-price skeleton" />
                <div className="skeleton-btn skeleton" />
            </div>
        </div>
    </div>
);

const DashboardHome = () => {
    const { user } = useAuth();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('Tous');
    const [searchCity, setSearchCity] = useState('');

    useEffect(() => {
        const fetchAllProperties = async () => {
            try {
                const response = await propertyService.getAllProperties();
                // API returns { data: [...] } — unwrap it
                const list = response?.data ?? response ?? [];
                setProperties(Array.isArray(list) ? list : []);
            } catch (error) {
                console.error('Erreur lors du chargement des biens:', error);
                setProperties([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAllProperties();
    }, []);

    const filteredProperties = properties.filter(p => {
        const targetFilter = filter.toLowerCase();
        const matchesType = !filter || filter === 'Tous' || 
            (p.status && p.status.toLowerCase() === targetFilter) ||
            (p.type && p.type.toLowerCase() === targetFilter) ||
            (p.category && p.category.toLowerCase() === targetFilter);

        const searchLower = searchCity.trim().toLowerCase();
        const matchesCity = !searchLower || 
            (p.location && p.location.toLowerCase().includes(searchLower)) ||
            (p.address && p.address.toLowerCase().includes(searchLower)) ||
            (p.title && p.title.toLowerCase().includes(searchLower)) ||
            (p.city && p.city.toLowerCase().includes(searchLower));
        return matchesType && matchesCity;
    });

    const filterOptions = ['Tous', 'Location', 'Vente'];

    return (
        <div className="dashboard-home">
            <header className="page-header">
                <div className="page-title-section">
                    <h1>Accueil</h1>
                    <p>Bienvenue dans votre gestionnaire immobilier.</p>
                </div>
                <div className="header-user">
                    <div className="user-avatar">
                        {user?.profile_photo_url ? (
                            <img src={user.profile_photo_url} alt={user.name} className="header-avatar-img" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                        ) : (
                            <User size={20} />
                        )}
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.name || 'Utilisateur'}</span>
                    </div>
                </div>
            </header>

            <div className="dash-filter-section">
                <div className="dash-search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Rechercher par ville..." 
                        value={searchCity}
                        onChange={(e) => setSearchCity(e.target.value)}
                        className="dash-city-search"
                    />
                </div>

                <div className="dash-filter-bar">
                    {filterOptions.map(option => (
                        <button
                            key={option}
                            className={`dash-filter-tab ${filter === option ? 'active' : ''}`}
                            onClick={() => setFilter(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            <div className="property-grid">
                {loading ? (
                    // Show 6 skeleton cards while loading
                    Array(6).fill(0).map((_, i) => <PropertySkeleton key={i} />)
                ) : filteredProperties.length > 0 ? (
                    filteredProperties.map((property) => (
                        <DashboardPropertyCard key={property._id || property.id} property={property} />
                    ))
                ) : (
                    <div className="no-results">Aucun bien trouvé.</div>
                )}
            </div>
        </div>
    );
};

export default DashboardHome;
