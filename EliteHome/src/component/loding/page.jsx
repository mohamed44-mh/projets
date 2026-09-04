import React from "react";
import Navbar from "./Navbar/Navbar.jsx";
import Hero from "./Hero/Hero.jsx";
import Services from "./services/services.jsx";
import Contact from './Contact/Contact.jsx';
import Footer from './Footer/Footer.jsx';
import Trust from './Trust/Trust.jsx';
import Expertise from './Expertise/Expertise.jsx';
import './page.css';

const Page = () => {
    return (
        <div className="landing-page-container">
            <Navbar />
            <Hero />
            <Trust />
            <Services />
            <Expertise />
            <Contact />
            <Footer />
        </div>
    );
};

export default Page;