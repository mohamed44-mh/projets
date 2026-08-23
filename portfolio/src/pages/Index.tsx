import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Mohamed Elharouchi | Full Stack Web Developer</title>
        <meta
          name="description"
          content="Portfolio de Mohamed Elharouchi, développeur web full stack passionné. Découvrez mes projets, compétences en React, Node.js, et plus encore."
        />
        <meta name="keywords" content="développeur web, full stack, React, Node.js, portfolio, Mohamed Elharouchi" />
        <meta property="og:title" content="Mohamed Elharouchi | Full Stack Web Developer" />
        <meta property="og:description" content="Portfolio de Mohamed Elharouchi, développeur web full stack passionné." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mohamedelharouchi.dev" />
      </Helmet>

      <div className="min-h-screen bg-background overflow-x-hidden">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
