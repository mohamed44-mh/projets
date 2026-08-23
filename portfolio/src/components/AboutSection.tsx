import { Calendar, MapPin, GraduationCap, Sparkles, BookOpen, School } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  const highlights = [
    { icon: Calendar, label: t.about.highlights.born, value: t.about.highlights.bornVal },
    { icon: MapPin, label: t.about.highlights.location, value: t.about.highlights.locationVal },
    { icon: GraduationCap, label: t.about.highlights.degree, value: t.about.highlights.degreeVal },
    { icon: Sparkles, label: t.about.highlights.passion, value: t.about.highlights.passionVal },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 relative">
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16 space-y-20">
        {/* Top Grid: Personal Bio & Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
              {t.about.tag}
            </span>
            <h2 className="section-title">
              {t.about.title}
              <span className="gradient-text">{t.about.titleHighlight}</span>
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base sm:text-lg mt-6">
              <p>{t.about.bio1}</p>
              <p>{t.about.bio2}</p>
            </div>
          </div>

          {/* Right Content - Info Cards */}
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {highlights.map((item, index) => (
              <div
                key={item.label}
                className="glass-card p-5 sm:p-6 glow-effect hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="text-primary" size={22} />
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mb-1">{item.label}</p>
                <p className="font-display font-semibold text-foreground text-sm sm:text-base">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline Section */}
        <div className="pt-6 border-t border-border/40">
          <div className="flex flex-col items-center justify-center text-center mb-12">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm sm:text-base font-semibold shadow-sm mb-3">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span>{t.about.education.tag}</span>
            </div>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md">
              {t.about.education.subtitle}
            </p>
          </div>

          <div className="max-w-3xl mx-auto relative pl-6 sm:pl-10 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-primary/80 before:via-primary/40 before:to-primary/10">
            {t.about.education.items.map((item) => (
              <div key={item.title} className="relative group">
                {/* Node Icon on Timeline */}
                <div className="absolute -left-[31px] sm:-left-[33px] top-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg shadow-primary/20 ring-4 ring-background transition-transform duration-300 group-hover:scale-110">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Timeline Card */}
                <div className="glass-card p-6 sm:p-8 glow-effect hover:-translate-y-1 transition-all duration-300 rounded-2xl border border-border/60 shadow-xl">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary border border-primary/25">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{item.period}</span>
                    </div>
                    {item.statusBadge && (
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/60">
                        {item.statusBadge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-foreground tracking-tight mb-1">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-primary font-medium text-sm sm:text-base mb-3">
                    <School className="w-4 h-4 shrink-0" />
                    <span>{item.institution}</span>
                  </div>

                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

