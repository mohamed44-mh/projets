import React from "react";
import "./services.css";


const Services = () => {
  const services = [
        {
            id: 1,
            title: "Acheter un bien",
            description: "Découvrez notre sélection exclusive d'appartements, maisons et villas de luxe adaptés à vos besoins.",
            icon: "https://img.icons8.com/fluency/100/home.png",
            cta: "Voir les annonces",
            link: "#acheter"
        },
        {
            id: 2,
            title: "Louer un bien",
            description: "Trouvez la location parfaite parmi nos milliers d'offres vérifiées et disponibles immédiatement.",
            icon: "https://img.icons8.com/fluency/100/key.png",
            cta: "Chercher une location",
            link: "#louer"
        },
        {
            id: 3,
            title: "Vendre votre bien",
            description: "Estimez votre bien en ligne et profitez de notre réseau pour vendre au meilleur prix.",
            icon: "https://img.icons8.com/fluency/100/price-tag.png",
            cta: "Publier une annonce",
            link: "#vendre"
        }
    ];
  return (
    <section id="services" className="services-section">
            <div className="container">
                <h2 className="section-title">Nos Services</h2>
                <p className="section-subtitle">
                    Nous vous accompagnons à chaque étape de votre projet immobilier avec une expertise dédiée.
                </p>

                <div className="services-grid">
                    {services.map((service) => (
                        <div key={service.id} className="service-card">
                            <a href={service.link} className="service-icon-link">
                                <div className="service-icon">
                                    <img src={service.icon} alt={service.title} className="service-icon-img" />
                                </div>
                            </a>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <a href={service.link} className="service-link">{service.cta} →</a>
                        </div>
                    ))}
                </div>
            </div>
    </section>
    
  );
};

export default Services;
