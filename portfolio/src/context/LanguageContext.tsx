import React, { createContext, useContext, useState } from 'react';

export type Language = 'FR' | 'EN';

export const translations = {
  FR: {
    // Navbar
    nav: {
      home: 'Accueil',
      about: 'À propos',
      skills: 'Compétences',
      projects: 'Projets',
      contact: 'Contact',
      contactBtn: 'Contactez-moi',
    },
    // Hero
    hero: {
      statusBadge: 'Disponible pour de nouveaux projets & opportunités',
      greeting: 'Salut, je suis',
      name: 'Mohamed Elharouchi',
      title: 'Full Stack Web Developer (Bac+2)',
      description:
        'Développeur Web Full Stack diplômé Bac+2, passionné par le développement web et toujours motivé à apprendre et à relever de nouveaux défis.',
      btnProjects: 'Voir mes projets',
      btnContact: 'Me contacter',
    },
    // About & Education
    about: {
      tag: 'À propos de moi',
      title: 'Un développeur passionné par ',
      titleHighlight: "l'innovation",
      bio1: 'Je suis Mohamed Elharouchi, développeur web de 19 ans, diplômé d\'un Bac+2 en Développement Web Full Stack, passionné par la création d\'applications web modernes. J\'aime apprendre de nouvelles technologies et relever des défis pour concevoir des solutions performantes.',
      bio2: "Toujours à la recherche de nouveaux défis, j'explore activement les possibilités offertes par l'IA pour améliorer mes projets et ma productivité.",
      highlights: {
        born: 'Né le',
        bornVal: '10/02/2007',
        location: 'Localisation',
        locationVal: 'Casablanca, Maroc',
        degree: 'Diplôme',
        degreeVal: 'Bac+2 Développement Web',
        passion: 'Passion',
        passionVal: 'IA & Technologies',
      },
      education: {
        tag: 'My Education',
        subtitle: 'Mon parcours académique et formations spécialisées',
        items: [
          {
            period: '2024 - 2026',
            title: 'Full Stack Web Development',
            institution: 'OFPPT ISFO NTIC Sidi Maarouf, Casablanca',
            description:
              'Diplôme de Technicien Spécialisé en Développement Digital (option Web Full Stack). Conception d’applications web modernes front-end et back-end, gestion de bases de données et application des meilleures pratiques de développement.',
            statusBadge: 'Obtenu',
          },
          {
            period: '2023 - 2024',
            title: 'High School Diploma - Life & Earth Sciences (SVT)',
            institution: 'Lycée Ibno Arabi, Casablanca',
            description: 'Obtention du diplôme de baccalauréat en Sciences de la Vie et de la Terre (SVT).',
            statusBadge: 'Obtenu',
          },
        ],
      },
    },
    // Skills
    skills: {
      tag: 'Mes compétences',
      title: 'Technologies & ',
      titleHighlight: 'Outils',
      subtitle: 'Un ensemble de compétences variées acquises durant ma formation et mes projets personnels.',
      categories: {
        frontend: 'Front-End',
        backend: 'Back-End',
        database: 'Base de données',
        devops: 'DevOps & Outils',
        design: 'Design',
        office: 'Bureautique',
        ai: 'Intelligence Artificielle',
        ide: 'IDE',
        modeling: 'Modélisation',
      },
    },
    // Projects
    projects: {
      tag: 'Mes réalisations',
      title: 'Projets ',
      titleHighlight: 'récents',
      subtitle: 'Une sélection de projets qui démontrent mes compétences techniques et ma créativité.',
      viewProject: 'View project',
      items: [
        {
          title: 'Portfolio personnel',
          description:
            'Un portfolio personnel présentant mes projets de développement web FullStack. Découvrez mes compétences à travers des projets réels et fonctionnels.',
          technologies: ['React', 'TypeScript', 'Vite'],
          github: 'https://github.com/mohamed44-mh/projets/tree/main/portfolio',
          demo: 'https://github.com/mohamed44-mh/projets/tree/main/portfolio',
        },
        {
          title: 'Vente & Location d’Appartements',
          description:
            'Découvrez nos appartements à vendre et à louer, facilement et rapidement. Trouvez votre espace idéal en quelques clics !',
          technologies: ['Node.js', 'React', 'MySQL'],
          github: 'https://github.com/mohamed44-mh/projets/tree/main/portfolio',
          demo: 'https://github.com/mohamed44-mh/projets/tree/main/portfolio',
        },
      ],
      btnMore: 'Voir plus sur GitHub',
    },
    // Contact
    contact: {
      tag: 'Contactez-moi',
      title: 'Restons en ',
      titleHighlight: 'contact',
      subtitle: 'Je suis disponible et ouvert a toute opportunite. Ecrivez-moi !',
      infoTitle: 'Coordonnées',
      phoneLabel: 'Téléphone',
      emailLabel: 'Email',
      locationLabel: 'Localisation',
      formTitle: 'Envoyez-moi un message',
      namePlaceholder: 'Votre nom',
      emailPlaceholder: 'Votre email',
      subjectPlaceholder: 'Sujet du message',
      messagePlaceholder: 'Votre message...',
      sendBtn: 'Envoyer le message',
      sendingBtn: 'Envoi en cours...',
      successMsg: 'Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
    },
    // Footer
    footer: {
      rights: '© 2026 Mohamed Elharouchi - Développeur Web Full Stack.',
      madeWith: 'Fait avec',
      inCountry: 'au Maroc',
    },
  },
  EN: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
      contactBtn: 'Contact Me',
    },
    // Hero
    hero: {
      statusBadge: 'Available for new projects & opportunities',
      greeting: 'Hi, I am',
      name: 'Mohamed Elharouchi',
      title: 'Full Stack Web Developer (Associate Degree)',
      description:
        'Full Stack Web Developer with a 2-year degree, passionate about web development and always motivated to learn and tackle new challenges.',
      btnProjects: 'View My Projects',
      btnContact: 'Contact Me',
    },
    // About & Education
    about: {
      tag: 'About Me',
      title: 'A developer passionate about ',
      titleHighlight: 'innovation',
      bio1: 'I am Mohamed Elharouchi, a 19-year-old web developer with a 2-year degree in Full Stack Web Development, passionate about creating modern web applications. I enjoy learning new technologies and tackling challenges to build high-performance solutions.',
      bio2: 'Always seeking new challenges, I actively explore AI capabilities to enhance my projects and productivity.',
      highlights: {
        born: 'Born on',
        bornVal: '02/10/2007',
        location: 'Location',
        locationVal: 'Casablanca, Morocco',
        degree: 'Degree',
        degreeVal: 'Full Stack Web Dev Degree',
        passion: 'Passion',
        passionVal: 'AI & Technology',
      },
      education: {
        tag: 'My Education',
        subtitle: 'My academic background and specialized training',
        items: [
          {
            period: '2024 - 2026',
            title: 'Full Stack Web Development',
            institution: 'OFPPT ISFO NTIC Sidi Maarouf, Casablanca',
            description:
              'Specialized Technician Diploma in Digital Development (Web Full Stack option). Design and development of modern front-end and back-end web applications, database management, and best development practices.',
            statusBadge: 'Graduated',
          },
          {
            period: '2023 - 2024',
            title: 'High School Diploma - Life & Earth Sciences (SVT)',
            institution: 'Lycée Ibno Arabi, Casablanca',
            description: 'High school diploma obtained in Life & Earth Sciences (SVT).',
            statusBadge: 'Graduated',
          },
        ],
      },
    },
    // Skills
    skills: {
      tag: 'My Skills',
      title: 'Technologies & ',
      titleHighlight: 'Tools',
      subtitle: 'A diverse set of skills acquired during my training and personal projects.',
      categories: {
        frontend: 'Front-End',
        backend: 'Back-End',
        database: 'Databases',
        devops: 'DevOps & Tools',
        design: 'Design',
        office: 'Office Suite',
        ai: 'Artificial Intelligence',
        ide: 'IDE',
        modeling: 'Modeling',
      },
    },
    // Projects
    projects: {
      tag: 'My Realizations',
      title: 'Recent ',
      titleHighlight: 'Projects',
      subtitle: 'A selection of projects demonstrating my technical skills and creativity.',
      viewProject: 'View project',
      items: [
        {
          title: 'Personal Portfolio',
          description:
            'A personal portfolio presenting my FullStack web development projects. Discover my skills through real, working applications.',
          technologies: ['React', 'TypeScript', 'Vite'],
          github: 'https://github.com/mohamed44-mh/projets/tree/main/portfolio',
          demo: 'https://github.com/mohamed44-mh/projets/tree/main/portfolio',
        },
        {
          title: 'Apartments Sale & Rental',
          description:
            'Explore apartments for sale and rent easily and quickly. Find your ideal space in just a few clicks!',
          technologies: ['Node.js', 'React', 'MySQL'],
          github: 'https://github.com/mohamed44-mh/projets',
          demo: 'https://example.com',
        },
      ],
      btnMore: 'View more on GitHub',
    },
    // Contact
    contact: {
      tag: 'Contact Me',
      title: "Let's stay in ",
      titleHighlight: 'touch',
      subtitle: 'I am open to any opportunity. Do not hesitate to write to me.',
      infoTitle: 'Contact Information',
      phoneLabel: 'Phone',
      emailLabel: 'Email',
      locationLabel: 'Location',
      formTitle: 'Send Me a Message',
      namePlaceholder: 'Your Name',
      emailPlaceholder: 'Your Email',
      subjectPlaceholder: 'Message Subject',
      messagePlaceholder: 'Your message...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      successMsg: 'Message sent successfully! I will reply as soon as possible.',
    },
    // Footer
    footer: {
      rights: '© 2026 Mohamed Elharouchi - Full Stack Web Developer.',
      madeWith: 'Made with',
      inCountry: 'in Morocco',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: typeof translations.FR;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('FR');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'FR' ? 'EN' : 'FR'));
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
