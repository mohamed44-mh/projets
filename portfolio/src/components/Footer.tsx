import { Github, Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/mohamed44-mh/projets' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/mohamed-el-harouchi-a33215390/' },
    { icon: Mail, label: 'Email', href: 'mailto:Mohamedharouchi2007@gmail.com' },
  ];

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          {/* Logo */}
          <a href="#home" className="font-display font-bold text-xl gradient-text">
            ME.
          </a>

          <p className="text-muted-foreground text-sm">
            © 2026 Mohamed Elharouchi - Développeur Web Full Stack.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
