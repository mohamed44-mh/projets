import { 
  Code2, 
  Server, 
  Database, 
  GitBranch, 
  Palette, 
  FileText, 
  Bot,
  Terminal,
  Shapes
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      title: t.skills.categories.frontend,
      icon: Code2,
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Bootstrap'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      title: t.skills.categories.backend,
      icon: Server,
      skills: ['Python', 'PHP', 'Node.js', 'Laravel'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: t.skills.categories.database,
      icon: Database,
      skills: ['MySQL', 'MongoDB'],
      color: 'from-orange-500 to-amber-500',
    },
    {
      title: t.skills.categories.devops,
      icon: GitBranch,
      skills: ['Git', 'GitHub', 'GitLab', 'Postman'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: t.skills.categories.design,
      icon: Palette,
      skills: ['Canva', 'Figma'],
      color: 'from-pink-500 to-rose-500',
    },
    {
      title: t.skills.categories.office,
      icon: FileText,
      skills: ['Word', 'PowerPoint', 'Excel', 'Access'],
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: t.skills.categories.ai,
      icon: Bot,
      skills: ['ChatGPT', 'Lovable AI', 'Google Gemini'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      title: t.skills.categories.ide,
      icon: Terminal,
      skills: ['Visual Studio Code'],
      color: 'from-sky-500 to-cyan-500',
    },
    {
      title: t.skills.categories.modeling,
      icon: Shapes,
      skills: ['UML', 'StarUML'],
      color: 'from-teal-500 to-green-500',
    },
  ];

  return (
    <section id="skills" className="py-16 sm:py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-primary text-sm font-semibold uppercase tracking-wider mb-3 block">
              {t.skills.tag}
            </span>
            <h2 className="section-title">
              {t.skills.title} <span className="gradient-text">{t.skills.titleHighlight}</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className="glass-card p-5 sm:p-6 glow-effect group hover:-translate-y-1 transition-all duration-300 flex flex-col justify-start"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Header */}
                <div className="flex items-center gap-3.5 sm:gap-4 mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${category.color} p-0.5 flex-shrink-0`}>
                    <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                      <category.icon className="text-foreground w-5 h-5 sm:w-6 sm:h-6" size={22} />
                    </div>
                  </div>
                  <h3 className="font-display font-semibold text-base sm:text-lg">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="skill-badge"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
};

export default SkillsSection;
