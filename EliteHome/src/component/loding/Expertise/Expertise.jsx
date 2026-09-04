import React, { useEffect, useState } from 'react';
import { LineChart, Camera, Map } from 'lucide-react';
import './Expertise.css';

const Expertise = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.15 }
        );

        const section = document.getElementById('expertise-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) observer.unobserve(section);
        };
    }, []);

    const expertises = [
        {
            title: "Évaluation sur mesure",
            description: "Une estimation précise et confidentielle de votre bien, basée sur une analyse approfondie du marché de EliHome et de ses tendances actuelles.",
            icon: <LineChart size={32} className="expertise-icon-svg" />
        },
        {
            title: "Marketing exclusif",
            description: "Une mise en valeur exceptionnelle grâce à des reportages photographiques professionnels, des visites virtuelles privées et une diffusion ciblée.",
            icon: <Camera size={32} className="expertise-icon-svg" />
        },
        {
            title: "Chasse immobilière",
            description: "Un service de recherche dédié et confidentiel pour dénicher la propriété rare qui correspond parfaitement à vos critères d'exigence.",
            icon: <Map size={32} className="expertise-icon-svg" />
        }
    ];

    return (
        <section id="expertise-section" className="expertise-section">
            <div className="container">
                <div className={`expertise-header ${isVisible ? 'visible' : ''}`}>
                    <h2 className="expertise-pretitle">Notre Savoir-Faire</h2>
                    <h3 className="expertise-title">
                        L'Excellence <span className="expertise-accent">Immobilière</span>
                    </h3>
                    <p className="expertise-subtitle">
                        ElitHome Merveilleux redéfinit l'expérience immobilière. Nous offrons une expertise 
                        pointue dans l'estimation, la valorisation et la commercialisation de biens haut de gamme.
                    </p>
                </div>

                <div className="expertise-grid">
                    {expertises.map((item, index) => (
                        <div 
                            key={index} 
                            className={`expertise-card ${isVisible ? 'visible' : ''}`}
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className="expertise-icon-container">
                                {item.icon}
                            </div>
                            <h4 className="expertise-card-title">{item.title}</h4>
                            <p className="expertise-card-description">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
