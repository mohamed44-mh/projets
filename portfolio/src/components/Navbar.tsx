import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#about', label: t.nav.about },
    { href: '#skills', label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact', label: t.nav.contact },
  ];

  const toggleTheme = () => {
    setIsLight(!isLight);
    document.documentElement.classList.toggle('light');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-lg' : 'bg-transparent'
        }`}
    >
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" className="font-display font-bold text-xl sm:text-2xl gradient-text">
            ME.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden nav:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 text-sm font-medium"
              >
                {link.label}
              </a>
            ))}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/60 border border-border/40 text-xs font-semibold text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="Toggle language"
            >
              <Globe size={14} className="text-primary" />
              <span>{language}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-full bg-secondary/60 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-110 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            <Button variant="hero" size="sm" asChild>
              <a href="#contact">{t.nav.contactBtn}</a>
            </Button>
          </div>

          {/* Mobile Right Action Group (Language + Theme + Menu) */}
          <div className="flex nav:hidden items-center gap-3.5">
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary/60 border border-border/40 text-xs font-semibold text-foreground hover:text-primary transition-all duration-300"
              aria-label="Toggle language"
            >
              <Globe size={13} className="text-primary" />
              <span>{language}</span>
            </button>

            {/* Theme Toggle Mobile */}
            <button
              onClick={toggleTheme}
              className="p-1 rounded-lg bg-secondary/60 border border-border/40 text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              aria-label="Toggle theme"
            >
              {isLight ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              className="p-1 rounded-lg text-foreground hover:bg-secondary/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`nav:hidden transition-all duration-300 ease-in-out overflow-hidden border-b border-border/50 ${isOpen ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0 py-0 border-none'
          }`}
      >
        <div className="px-4 sm:px-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-muted-foreground hover:text-primary hover:bg-secondary/40 rounded-lg px-3 py-2.5 text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <Button variant="hero" className="w-full" asChild>
              <a href="#contact" onClick={() => setIsOpen(false)}>{t.nav.contactBtn}</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
