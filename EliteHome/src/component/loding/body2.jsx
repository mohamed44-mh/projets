import React from "react";
import "./services.css";

const Body2 = () => {
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
    <div>

  
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
    <section className="why-section py-5">
      <div className="container">
        <h3 className="text-center fw-bold mb-5">
          Pourquoi Choisir EliteHome ?
        </h3>

        <div className="row g-4">
          <div className="col-md-4">
            <div className="card why-card text-center h-100 p-4">
              <div className="icon-box mx-auto mb-3">
                <span><i className="bi bi-house-door-fill"></i></span>
              </div>
              <h4 className="fw-semibold mb-2">Large Sélection</h4>
              <p className="text-muted">
                Accédez à des milliers d'annonces vérifiées dans plusieurs villes.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card why-card text-center h-100 p-4">
              <div className="icon-box mx-auto mb-3">
                <span><i className="bi bi-check-circle-fill"></i></span>
              </div>
              <h4 className="fw-semibold mb-2">Biens Vérifiés</h4>
              <p className="text-muted">
                Toutes nos annonces sont vérifiées pour votre tranquillité d'esprit.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card why-card text-center h-100 p-4">
              <div className="icon-box mx-auto mb-3">
                <span><i className="bi bi-chat-dots-fill"></i></span>
              </div>
              <h4 className="fw-semibold mb-2">Support Expert</h4>
              <p className="text-muted">
                Notre équipe est là pour vous accompagner à chaque étape.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
    </div>
    
  );
};

export default Body2;
