import React from "react";
import './Hero.css';
const Hero = () => {
  return (
    <div>
        <section className="home-section py-5" >
          <div className="home-overlay"></div>
            <div className="container text-center text-light home-content">
                <h2 className="hero-title mb-3">
                    Trouvez votre maison <br className="hero-desktop-br" /> idéale
                </h2>
                <p className="lead mb-4 mx-auto">
                    Découvrez des milliers d'appartements à vendre et à louer dans votre région.
                    La maison de vos rêves n'est qu'à un clic.
                </p>
                <div className=" home-buttons">
                    <button className="btn btn-primary px-4 py-2 button">
                        Parcourir les annonces
                    </button>
                    <button className="btn btn-outline-light px-4 py-2 button">
                        Publier votre bien
                    </button>
                </div>
            </div>
        </section>
    </div>
  );
};

export default Hero;
