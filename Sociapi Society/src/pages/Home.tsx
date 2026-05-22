import React from 'react';
import { 
  ArrowRight, ShieldCheck, Zap, Code2, Cpu, Database, 
  Terminal, ArrowUpRight, HelpCircle, ShoppingBag 
} from 'lucide-react';
import { BlogPost, EventItem, TeamMember, GalleryItem, MerchItem, ReviewItem, FAQItem } from '../data/initialData';

// Helper function to import images correctly for Vite bundling
const importImage = (path: string): string => {
  return new URL(`../Image/${path}`, import.meta.url).href;
};

interface HomeProps {
  setCurrentPage: (page: string) => void;
  blogs: BlogPost[];
  events: EventItem[];
  team: TeamMember[];
  gallery: GalleryItem[];
  merch: MerchItem[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  addToCart: (item: MerchItem) => void;
}

export const Home: React.FC<HomeProps> = ({
  setCurrentPage,
  blogs,
  events,
  team,
  gallery,
  merch,
  reviews,
  faqs,
  addToCart
}) => {
  // Get previews
  const upcomingEvents = events.filter(e => e.category === 'Upcoming').slice(0, 2);
  const coreTeam = team.filter(t => t.premium).slice(0, 3);
  const galleryPreview = gallery.slice(0, 6);
  const blogPreview = blogs.slice(0, 2);
  const featuredFAQ = faqs.slice(0, 3);
  const featuredReviews = reviews.slice(0, 3);
  const featuredMerch = merch.slice(0, 2);

  const learningPillars = [
    {
      title: 'Real Projects',
      desc: 'Students work on real AI, data and robotics tasks to build competitive visual prototypes.',
      icon: Code2,
    },
    {
      title: 'Guidance and Mentorship',
      desc: 'Learn from skilled senior members & advisors to bypass basic coding errors.',
      icon: Cpu,
    },
    {
      title: 'Learn AI Skills',
      desc: 'Understand the basics of Data Science, Artificial Intelligence, and Machine Learning. Start building the skills needed for the future.',
      icon: Terminal,
    },
    {
      title: 'Build Smart Projects',
      desc: 'Create real world projects like smart robots, automation systems, and AI based innovations.',
      icon: Database,
    },
    {
      title: 'Explore Machine Learning',
      desc: 'Learn how machine learning models work and how they are used in modern technology and businesses.',
      icon: Zap,
    }
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. WHY CHOOSE US */}
      <section id="why-choose-us" className="relative scroll-mt-24 px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-futuristic font-bold tracking-wider text-[#e8ecee]">
              WE DECODE THE <span className="text-[#7bd355] glow-text">FUTURE</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xs text-[#939596] uppercase tracking-widest">
              Translating textbook concepts into production-grade portfolios
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {learningPillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="glass-panel-interactive p-6 rounded-2xl border border-[#333333] flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-[#333333] border border-[#7bd355]/30 flex items-center justify-center text-[#7bd355] glow-shadow-neon">
                    <pillar.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-futuristic font-semibold text-sm text-[#e8ecee] tracking-wider">{pillar.title}</h3>
                  <p className="text-xs text-[#939596] leading-relaxed">{pillar.desc}</p>
                </div>
                
                <button 
                  onClick={() => setCurrentPage('about')}
                  className="mt-6 flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest text-[#7bd355] hover:text-[#e8ecee] transition-colors"
                >
                  <span>Explore Path</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 2. MISSION & VISION PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-futuristic font-bold text-[#e8ecee] tracking-wide">
              Empowering Student Minds through Practical Engineering
            </h2>
            <p className="text-xs text-[#939596] leading-relaxed">
              We believe academic study is merely the foundation. Real learning occurs when students collaborate, debug late into the night, and build systems that work under real constraints.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3.5">
                <div className="p-1 rounded bg-[#517642]/20 border border-[#7bd355]/30 text-[#7bd355] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-futuristic text-[#e8ecee]">Practical Workshops</h4>
                  <p className="text-xs text-[#939596] mt-0.5">Simple, structured, hands-on learning with immediate feedback loops.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-1 rounded bg-[#517642]/20 border border-[#7bd355]/30 text-[#7bd355] shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold font-futuristic text-[#e8ecee]">Industry-Ready Portfolios</h4>
                  <p className="text-xs text-[#939596] mt-0.5">Connect with mentors, industry professionals, and local internship programs.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setCurrentPage('about')}
              className="px-6 py-3 rounded-full bg-[#333333] border border-[#7bd355]/30 text-[#7bd355] hover:border-[#7bd355] text-xs font-bold uppercase tracking-widest transition-all"
            >
              Learn More About Us
            </button>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-[#517642]/30 aspect-video group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent z-10" />
            <img 
             src="/Image/ss team.jpg"
              alt="Students Collaborating"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#7bd355] font-bold">Meeting</span>
                <h4 className="text-xs font-futuristic font-bold text-[#e8ecee]">Sociapi society</h4>
              </div>
              <button 
                onClick={() => setCurrentPage('gallery')}
                className="p-2 rounded-full bg-[#333333]/90 text-[#7bd355] hover:bg-[#7bd355] hover:text-[#121212] transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. EVENT HIGHLIGHTS */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">Upcoming Operations</span>
              <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Event Briefings</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('events')}
              className="flex items-center space-x-2 text-xs font-bold text-[#7bd355] hover:text-[#e8ecee] transition-colors"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {upcomingEvents.map(event => (
              <div 
                key={event.id}
                className="glass-panel rounded-2xl border border-[#333333] overflow-hidden flex flex-col md:flex-row hover:border-[#7bd355]/40 transition-all group"
              >
                <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                  <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:w-3/5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2.5 py-0.5 rounded-full">{event.date}</span>
                    <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] leading-snug line-clamp-1">{event.title}</h3>
                    <p className="text-xs text-[#939596] leading-relaxed line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-[#333333]">
                    <div className="flex items-center space-x-2">
                      <img src={event.speaker.avatar} alt={event.speaker.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-[9px] text-[#e8ecee] font-semibold">{event.speaker.name}</span>
                    </div>
                    <button 
                      onClick={() => setCurrentPage('events')}
                      className="text-[10px] font-bold uppercase text-[#7bd355] flex items-center space-x-1 hover:text-[#e8ecee]"
                    >
                      <span>Join briefing</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. GALLERY PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">Visual Archives</span>
              <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Visual Evidence</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('gallery')}
              className="flex items-center space-x-2 text-xs font-bold text-[#7bd355] hover:text-[#e8ecee] transition-colors"
            >
              <span>View Full Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryPreview.map(item => (
              <div 
                key={item.id}
                onClick={() => setCurrentPage('gallery')}
                className="relative group rounded-xl overflow-hidden aspect-square border border-[#333333] cursor-pointer"
              >
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-[#121212]/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
                  <span className="text-[8px] uppercase tracking-widest font-bold text-[#7bd355]">{item.category}</span>
                  <p className="text-[10px] text-[#e8ecee] font-semibold truncate mt-0.5">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. TEAM PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">Command Staff</span>
              <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Leadership</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('team')}
              className="flex items-center space-x-2 text-xs font-bold text-[#7bd355] hover:text-[#e8ecee] transition-colors"
            >
              <span>View Roster</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coreTeam.map(member => (
              <div 
                key={member.id}
                className="glass-panel p-6 rounded-2xl border border-[#7bd355]/30 relative hover:border-[#7bd355] transition-all group overflow-hidden shadow-xl"
              >
                {/* Neon glow light element */}
                <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-[#7bd355]/10 blur-xl pointer-events-none" />

                <div className="flex items-center space-x-4">
                  <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#7bd355]/40" />
                  <div>
                    <h3 className="font-futuristic font-bold text-[#e8ecee] tracking-wide">{member.name}</h3>
                    <span className="text-[10px] uppercase font-bold text-[#7bd355] tracking-widest">{member.role}</span>
                  </div>
                </div>

                <p className="text-xs text-[#939596] leading-relaxed mt-4 line-clamp-3">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {member.skills.slice(0, 3).map((skill, sIdx) => (
                    <span key={sIdx} className="text-[9px] font-mono text-[#e8ecee] bg-[#333333] px-2 py-0.5 rounded border border-[#939596]/10">
                      {skill}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setCurrentPage('team')}
                  className="w-full mt-6 py-2 bg-[#333333] hover:bg-[#7bd355] hover:text-[#121212] text-[#7bd355] font-semibold text-[10px] uppercase tracking-widest rounded-xl transition-all"
                >
                  View Profile details
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. MERCHANDISE PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">Premium gear</span>
              <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Official Apparel</h2>
              <p className="text-xs text-[#7bd355] font-mono mt-1 font-semibold">
                ★ 3 shirts will launch soon, order will be processed on WhatsApp
              </p>
            </div>
            <button 
              onClick={() => setCurrentPage('store')}
              className="flex items-center space-x-2 text-xs font-bold text-[#7bd355] hover:text-[#e8ecee] transition-colors animate-pulse"
            >
              <span>Visit Merch Store</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredMerch.map(item => (
              <div 
                key={item.id}
                className="glass-panel rounded-2xl border border-[#333333] overflow-hidden flex flex-col md:flex-row hover:border-[#7bd355]/40 transition-all group"
              >
                <div className="w-full md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-[#161616]">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between space-y-6">
                  <div className="space-y-2">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355]">{item.category}</span>
                    <h3 className="font-futuristic font-bold text-sm text-[#e8ecee]">{item.name}</h3>
                    <p className="text-xs text-[#939596] leading-relaxed line-clamp-3">{item.description}</p>
                    <span className="block text-lg font-futuristic font-bold text-[#7bd355] mt-2">Rs. {item.price}</span>
                  </div>

                  <div className="flex space-x-2 pt-2 border-t border-[#333333]">
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex-1 py-3 rounded-xl bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                    <button 
                      onClick={() => setCurrentPage('store')}
                      className="px-4 py-3 rounded-xl bg-[#333333] border border-[#939596]/10 text-[#e8ecee] hover:border-[#7bd355] hover:text-[#7bd355] transition-all text-[10px] uppercase font-bold"
                    >
                      Configure
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 7. PARTNERS / SPONSORS GARDEN */}
      <section className="relative py-12 px-6 md:px-8 border-y border-[#333333]/50 bg-[#161616]/50">
        <div className="max-w-7xl mx-auto space-y-6 text-center">
          <span className="text-[9px] uppercase tracking-widest text-[#939596] font-bold">sponsors & Community Partners</span>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-80 transition-all duration-500">
            <span className="font-futuristic font-bold text-sm md:text-lg text-[#e8ecee] tracking-widest">Global Pathways</span>
            <span className="font-futuristic font-bold text-sm md:text-lg text-[#e8ecee] tracking-widest">K MAK MARKETING </span>
            <span className="font-futuristic font-bold text-sm md:text-lg text-[#e8ecee] tracking-widest">Software Synergy</span>
            <span className="font-futuristic font-bold text-sm md:text-lg text-[#e8ecee] tracking-widest">AWS CLOUD UAP LABS</span>
          </div>
          <button 
            onClick={() => setCurrentPage('partners')}
            className="block mx-auto text-[10px] uppercase font-bold text-[#7bd355] hover:text-[#e8ecee] transition-all tracking-wider pt-4"
          >
            Inquire about partnerships & sponsorships →
          </button>
        </div>
      </section>

      {/* 8. TESTIMONIALS SLIDER PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Student Reflections</h2>
            <p className="max-w-2xl mx-auto text-xs text-[#939596] uppercase tracking-widest">How peers grow inside the environment</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredReviews.map(rev => (
              <div 
                key={rev.id}
                className="glass-panel p-6 rounded-2xl border border-[#333333] flex flex-col justify-between hover:border-[#517642] transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center space-x-1 text-[#7bd355]">
                    {Array.from({ length: Math.round(rev.rating) }).map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs text-[#939596] italic leading-relaxed">
                    "{rev.review}"
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-[#333333]">
                  <img src={rev.avatar} alt={rev.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-futuristic font-bold text-[#e8ecee]">{rev.name}</h4>
                    <span className="text-[9px] text-[#7bd355]">{rev.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage('reviews')}
            className="block mx-auto px-6 py-2.5 rounded-full bg-[#333333] border border-[#939596]/10 text-[#7bd355] hover:border-[#7bd355] text-[10px] uppercase font-bold tracking-widest transition-all"
          >
            Read more reviews & submit feedback
          </button>

        </div>
      </section>

      {/* 9. FAQ PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">F.A.Q</h2>
            <p className="text-xs text-[#939596] uppercase tracking-widest">Common questions decoded</p>
          </div>

          <div className="space-y-4">
            {featuredFAQ.map(faq => (
              <div 
                key={faq.id}
                className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-5 hover:border-[#7bd355]/30 transition-all cursor-pointer"
                onClick={() => setCurrentPage('faq')}
              >
                <div className="flex justify-between items-center space-x-4">
                  <h3 className="font-futuristic font-bold text-xs text-[#e8ecee]">{faq.question}</h3>
                  <HelpCircle className="w-4 h-4 text-[#7bd355] shrink-0" />
                </div>
                <p className="text-xs text-[#939596] mt-2.5 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage('faq')}
            className="block mx-auto text-xs font-bold text-[#7bd355] hover:text-[#e8ecee] transition-colors"
          >
            Have more questions? Visit our complete FAQ portal →
          </button>

        </div>
      </section>

      {/* 10. BLOG PREVIEW */}
      <section className="relative px-6 md:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold">Digital Dispatches</span>
              <h2 className="text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase font-futuristic">Publications</h2>
            </div>
            <button 
              onClick={() => setCurrentPage('blog')}
              className="flex items-center space-x-2 text-xs font-bold text-[#7bd355] hover:text-[#e8ecee] transition-colors"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {blogPreview.map(blog => (
              <div 
                key={blog.id}
                className="glass-panel rounded-2xl border border-[#333333] overflow-hidden flex flex-col hover:border-[#7bd355]/40 transition-all group cursor-pointer"
                onClick={() => setCurrentPage('blog')}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest text-[#121212] bg-[#7bd355] px-2.5 py-1 rounded-full shadow">
                    {blog.category}
                  </span>
                </div>
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] line-clamp-1 group-hover:text-[#7bd355] transition-colors">{blog.title}</h3>
                    <p className="text-xs text-[#939596] leading-relaxed line-clamp-2">{blog.subtitle}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-[#333333] text-[9px] text-[#939596]">
                    <span>{blog.author} • {blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
