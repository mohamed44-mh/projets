import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const projectImages = [
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop',
  'https://i.postimg.cc/VLSYSZh1/apart.jpg',
];

const ProjectsSection = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const projectsList = t.projects.items.map((item, index) => ({
    ...item,
    image: projectImages[index] || projectImages[0],
  }));

  return (
    <section id="projects" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
            {t.projects.tag}
          </span>
          <h2 className="section-title">
            {t.projects.title}<span className="gradient-text">{t.projects.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 w-full">
          {projectsList.map((project, index) => {
            const isPortfolio = index === 0;
            const portfolioGithubUrl = "https://github.com/mohamed44-mh/projets/tree/main/portfolio";

            const handleClick = () => {
              if (isPortfolio) {
                // Portfolio project → scroll to top of this site
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                // Other projects → deploying page
                navigate(`/deploying?project=${encodeURIComponent(project.title)}&lang=${language}`);
              }
            };

            return (
              <article
                key={project.title}
                className="glass-card rounded-2xl border border-border/60 overflow-hidden group glow-effect flex flex-col h-full hover:-translate-y-1.5 transition-all duration-300 shadow-xl cursor-pointer"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={handleClick}
              >
                {/* Image & Overlay */}
                <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none" />

                  {/* Top-Right Action Buttons - visible on hover */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-2 z-20 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300">
                    {isPortfolio ? (
                      <a
                        href={portfolioGithubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => { e.stopPropagation(); }}
                        className="w-9 h-9 rounded-xl bg-secondary/80 backdrop-blur-md border border-border/50 text-foreground hover:text-primary flex items-center justify-center transition-all shadow-md hover:scale-105"
                        aria-label="View on GitHub"
                      >
                        <Github size={16} />
                      </a>
                    ) : (
                      <button
                        onClick={(e) => { e.stopPropagation(); handleClick(); }}
                        className="w-9 h-9 rounded-xl bg-secondary/80 backdrop-blur-md border border-border/50 text-foreground hover:text-primary flex items-center justify-center transition-all shadow-md hover:scale-105"
                        aria-label="View on GitHub"
                      >
                        <Github size={16} />
                      </button>
                    )}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleClick(); }}
                      className="w-9 h-9 rounded-xl bg-secondary/80 backdrop-blur-md border border-border/50 text-foreground hover:text-primary flex items-center justify-center transition-all shadow-md hover:scale-105"
                      aria-label="View demo"
                    >
                      <ExternalLink size={16} />
                    </button>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-5 sm:p-6 flex flex-col flex-grow justify-between gap-5">
                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl text-primary mb-2 flex items-center justify-between tracking-tight">
                      <span>{project.title}</span>
                      <ArrowUpRight size={20} className="opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2" />
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Pills */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border/40">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/25 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <Button variant="heroOutline" size="lg" asChild className="w-full sm:w-auto">
            <a href="https://github.com/mohamed44-mh/projets" target="_blank" rel="noopener noreferrer">
              {t.projects.btnMore}
              <Github className="ml-2" size={18} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
