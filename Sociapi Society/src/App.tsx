import { useState, useEffect } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Data imports
import { 
  initialTeam, initialGallery, initialBlogs, initialEvents, 
  initialMerch, initialReviews, initialFAQs, initialCareers, 
  initialContacts, initialPartnerships, TeamMember, GalleryItem, 
  BlogPost, EventItem, MerchItem, ReviewItem, FAQItem, CareerItem, 
  ContactMessage, PartnershipInquiry, initialSettings
} from './data/initialData';

// Component imports
import { ParticlesBackground } from './components/ParticlesBackground';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';

// Page imports
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { Blog } from './pages/Blog';
import { Team } from './pages/Team';
import { Gallery } from './pages/Gallery';
import { Partner } from './pages/Partner';
import { Reviews } from './pages/Reviews';
import { FAQ } from './pages/FAQ';
import { Careers } from './pages/Careers';
import { Contact } from './pages/Contact';
import { MerchStore } from './pages/MerchStore';

export default function App() {
  // Page states
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadPercentage, setLoadPercentage] = useState<number>(0);
  const [loadingLogs, setLoadingLogs] = useState<string[]>([]);
  
  // Database states (dynamic client-side database!)
  const [team] = useState<TeamMember[]>(initialTeam);
  const [gallery] = useState<GalleryItem[]>(initialGallery);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [merch] = useState<MerchItem[]>(initialMerch);
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [faqs] = useState<FAQItem[]>(initialFAQs);
  const [careers] = useState<CareerItem[]>(initialCareers);
  const [messages, setMessages] = useState<ContactMessage[]>(initialContacts);
  const [partnerships, setPartnerships] = useState<PartnershipInquiry[]>(initialPartnerships);

  // Global settings state (easily configurable Logo and stats)
  const [settings] = useState(initialSettings);

  // Cart & Wishlist state
  const [cart, setCart] = useState<{ item: MerchItem; size: string; quantity: number }[]>([]);
  const [wishlist, setWishlist] = useState<MerchItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Admin CMS panel state completely removed for client-side security

  // Loading logs array
  const logsSequence = [
    'Initializing Sociapi Terminal consoles...',
    'Loading vector graphics & matrix grid backgrounds...',
    'Connecting database sockets (Peshawar HQ)...',
    'Decrypting custom typography (Tomorrow, Neue Machina)...',
    'Syncing roster directory database (30 active records)...',
    'Mapping memory archives (40 image logs verified)...',
    'Validating product catalogs (apparel core nodes)...',
    'Syncing reviews & testimonials feeds...',
    'Calculations complete. Deploying HUD visuals...',
  ];

  // Loading process simulation
  useEffect(() => {
    let logIndex = 0;
    
    // Add logs one by one
    const logInterval = setInterval(() => {
      if (logIndex < logsSequence.length) {
        setLoadingLogs(prev => [...prev, logsSequence[logIndex]]);
        logIndex++;
      } else {
        clearInterval(logInterval);
      }
    }, 400);

    // Increment percentage counter
    const pctInterval = setInterval(() => {
      setLoadPercentage(prev => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(pctInterval);
          setTimeout(() => setIsLoading(false), 800); // Small pause for logo flash
          return 100;
        }
      });
    }, 35);

    return () => {
      clearInterval(logInterval);
      clearInterval(pctInterval);
    };
  }, []);

  // Scroll to top on page swap
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Cart manipulation helper
  const handleAddToCart = (product: MerchItem) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(x => x.item.id === product.id);
      if (existingIdx !== -1) {
        return prev.map((x, idx) => 
          idx === existingIdx ? { ...x, quantity: x.quantity + 1 } : x
        );
      }
      return [...prev, { item: product, size: 'M', quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  // Render appropriate view coordinates
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero 
              setCurrentPage={setCurrentPage} 
              memberCount={team.length}
              eventCount={events.length}
              settings={settings}
            />
            <Home 
              setCurrentPage={setCurrentPage}
              blogs={blogs}
              events={events}
              team={team}
              gallery={gallery}
              merch={merch}
              reviews={reviews}
              faqs={faqs}
              addToCart={handleAddToCart}
            />
          </>
        );
      case 'about':
        return <About />;
      case 'events':
        return <Events events={events} setEvents={setEvents} />;
      case 'blog':
        return <Blog blogs={blogs} setBlogs={setBlogs} />;
      case 'team':
        return <Team team={team} />;
      case 'gallery':
        return <Gallery gallery={gallery} />;
      case 'partners':
        return <Partner partnerships={partnerships} setPartnerships={setPartnerships} />;
      case 'reviews':
        return <Reviews reviews={reviews} setReviews={setReviews} />;
      case 'faq':
        return <FAQ faqs={faqs} />;
      case 'careers':
        return <Careers careers={careers} />;
      case 'contact':
        return <Contact messages={messages} setMessages={setMessages} />;
      case 'store':
        return (
          <MerchStore 
            merch={merch} 
            cart={cart} 
            setCart={setCart} 
            wishlist={wishlist} 
            setWishlist={setWishlist}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
          />
        );
      default:
        return (
          <div className="min-h-screen flex items-center justify-center">
            <span className="font-futuristic font-bold text-lg text-red-500">
              Error 404: Page Coordinate Not Mapped
            </span>
          </div>
        );
    }
  };

  if (isLoading) {
    // CINEMATIC TERMINAL INTRO LOADER
    return (
      <div className="fixed inset-0 z-50 bg-[#121212] flex flex-col justify-center items-center px-6">
        
        {/* Neon green tech backdrop grids */}
        <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[600px] md:h-[600px] rounded-full bg-[#7bd355]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-2xl w-full space-y-8 z-10">
          
          {/* Decrypting Glowing Logo */}
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-20 h-20 flex items-center justify-center rounded-2xl bg-[#333333] border-2 border-[#7bd355] shadow-[0_0_30px_rgba(123,211,85,0.4)] animate-pulse">
              <span className="font-futuristic font-black text-4xl text-[#7bd355] glow-text select-none">S</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#517642] to-[#7bd355] opacity-25" />
            </div>
            
            <div className="space-y-1">
              <h2 className="font-futuristic font-bold text-xl tracking-widest text-[#e8ecee]">SOCIAPI SOCIETY</h2>
              <span className="block text-[10px] text-[#7bd355] tracking-widest uppercase font-mono">ISLAMIA UNIVERSITY PESHAWAR</span>
            </div>
          </div>

          {/* Loader Terminal Stream */}
          <div className="bg-[#1e1e1e] border border-[#333333] rounded-xl p-4.5 font-mono text-[10px] text-[#939596] h-48 overflow-y-auto space-y-1.5 shadow-2xl relative">
            <div className="absolute top-3 right-3 flex items-center space-x-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-[#7bd355] animate-pulse" />
              <span className="text-[9px] uppercase tracking-wider text-[#7bd355]">Console Out</span>
            </div>
            
            {loadingLogs.map((log, idx) => (
              <div key={idx} className="flex items-center space-x-2 text-left">
                <span className="text-[#7bd355] font-bold">&gt;&gt;</span>
                <span className={idx === loadingLogs.length - 1 ? 'text-[#e8ecee] font-semibold' : ''}>{log}</span>
              </div>
            ))}
            
            <div className="flex items-center space-x-2">
              <span className="text-[#7bd355] font-bold">&gt;&gt;</span>
              <span className="animate-pulse">Loading system nodes...</span>
            </div>
          </div>

          {/* Progress bar info */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#939596] font-mono">
              <span>SYSTEM_INITIALIZATION</span>
              <span className="text-[#7bd355] font-bold font-futuristic">{loadPercentage}%</span>
            </div>
            <div className="w-full bg-[#333333] h-1.5 rounded-full overflow-hidden border border-[#939596]/10">
              <div 
                className="bg-[#7bd355] h-full shadow-[0_0_15px_rgba(123,211,85,0.8)] transition-all duration-100 ease-out" 
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#121212] overflow-x-hidden flex flex-col justify-between">
      
      {/* 3D-feeling Ambient interactive background particles */}
      <ParticlesBackground />

      {/* Floating backglows */}
      <div className="absolute top-[20%] left-0 w-80 h-80 bg-[#517642]/5 rounded-full blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-[20%] right-0 w-96 h-96 bg-[#7bd355]/3 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Floating Main Navigation Bar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        cartCount={cart.reduce((acc, c) => acc + c.quantity, 0)}
        wishlistCount={wishlist.length}
        toggleCart={() => setIsCartOpen(!isCartOpen)}
        settings={settings}
      />

      {/* Primary views canvas space */}
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>

      {/* Futuristic footer elements */}
      <Footer setCurrentPage={setCurrentPage} />

      {/* Vercel Speed Insights - Performance monitoring */}
      <SpeedInsights />

    </div>
  );
}
