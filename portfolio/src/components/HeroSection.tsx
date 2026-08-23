import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-[77vh] lg:min-h-[85vh] flex items-center justify-center overflow-hidden pt-24 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-24"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-72 h-72 md:w-96 md:h-96 bg-primary/10 rounded-full blur-[120px] animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-60 h-60 md:w-80 md:h-80 bg-primary/5 rounded-full blur-[100px] animate-float pointer-events-none" style={{ animationDelay: '-3s' }} />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">

          {/* Status Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-medium mb-6 animate-fade-up backdrop-blur-md max-w-[90vw]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>{t.hero.statusBadge}</span>
          </div>

          {/* Name */}
          <h1
            className="font-display font-bold text-3xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-fade-up tracking-tight leading-[1.15]"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="block text-foreground text-2xl sm:text-4xl md:text-5xl mb-2 font-semibold">{t.hero.greeting}</span>
            <span className="gradient-text inline-block">{t.hero.name}</span>
          </h1>

          {/* Title */}
          <p
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-6 font-display animate-fade-up font-medium"
            style={{ animationDelay: '0.2s' }}
          >
            {t.hero.title}
          </p>

          {/* Description */}
          <p
            className="text-muted-foreground text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed animate-fade-up px-2"
            style={{ animationDelay: '0.3s' }}
          >
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-row items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12 animate-fade-up"
            style={{ animationDelay: '0.4s' }}
          >
            <Button variant="hero" size="sm" asChild className="px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base sm:h-12">
              <a href="#projects">
                {t.hero.btnProjects}
                <ArrowDown className="ml-1.5" size={14} />
              </a>
            </Button>
            <Button variant="heroOutline" size="sm" asChild className="px-5 py-2.5 text-sm sm:px-8 sm:py-3 sm:text-base sm:h-12">
              <a href="#contact">{t.hero.btnContact}</a>
            </Button>
          </div>

          {/* Social Links */}
          <div
            className="flex items-center justify-center gap-3.5 sm:gap-4 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            <a
              href="https://github.com/mohamed44-mh/projets"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-el-harouchi-a33215390/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3.5 rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:Mohamedharouchi2007@gmail.com"
              className="p-3.5 rounded-xl bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:scale-105 transition-all duration-300 shadow-sm"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
        <a href="#about" aria-label="Scroll to About">
          <ArrowDown className="text-muted-foreground hover:text-primary transition-colors" size={22} />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
