import React, { useState, useEffect, useRef } from 'react';
import { Search, Eye, ArrowLeft, Clock, Copy, Check } from 'lucide-react';
import { BlogPost } from '../data/initialData';

interface BlogProps {
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
}

export const Blog: React.FC<BlogProps> = ({ blogs, setBlogs }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  
  // Reading progress and scroll tracking
  const [scrollProgress, setScrollProgress] = useState(0);
  const articleContainerRef = useRef<HTMLDivElement | null>(null);

  // Share link success alert
  const [copied, setCopied] = useState(false);

  // Categories list
  const categories = ['All', ...Array.from(new Set(blogs.map((b) => b.category)))];

  // Filter posts
  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenPost = (post: BlogPost) => {
    setActivePost(post);
    setScrollProgress(0);
    // Track views
    setBlogs((prev) =>
      prev.map((b) => (b.id === post.id ? { ...b, views: b.views + 1 } : b))
    );
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Monitor scroll height inside article viewer
  useEffect(() => {
    const handleScroll = () => {
      if (!articleContainerRef.current) return;
      const element = articleContainerRef.current;
      const totalHeight = element.scrollHeight - element.clientHeight;
      if (totalHeight > 0) {
        const scrolled = (element.scrollTop / totalHeight) * 100;
        setScrollProgress(scrolled);
      }
    };

    const container = articleContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activePost]);

  // Find related articles (same category or shared tags)
  const relatedArticles = activePost 
    ? blogs.filter((b) => b.id !== activePost.id && (b.category === activePost.category || b.tags.some(t => activePost.tags.includes(t)))).slice(0, 2)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 relative z-10">
      
      {!activePost ? (
        // LIST OF ARTICLES VIEW
        <div className="space-y-12">
          
          {/* Header */}
          <div className="space-y-4 text-center max-w-2xl mx-auto">
            <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Dispatches // log_archive</span>
            <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
              SOCIAPI <span className="text-[#7bd355] glow-text">INTELLIGENCE</span>
            </h1>
            <p className="text-xs text-[#939596] leading-relaxed">
              Insights, guides, and engineering updates from members turning academic theory into real code.
            </p>
          </div>

          {/* Search and Category Filters */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#333333] pb-6">
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#7bd355] text-[#121212]'
                      : 'text-[#939596] hover:text-[#e8ecee] hover:bg-[#333333]/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search archive..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1e1e1e] border border-[#333333] rounded-full py-2 pl-9 pr-4 text-xs text-[#e8ecee] focus:outline-none focus:border-[#7bd355]"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#939596]" />
            </div>
          </div>

          {/* Featured Article & Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="text-center py-20 text-[#939596] text-sm">
              No dispatches found matching search or category requirements.
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Post Card */}
              {filteredBlogs[0] && (
                <div 
                  onClick={() => handleOpenPost(filteredBlogs[0])}
                  className="glass-panel rounded-2xl border border-[#333333] overflow-hidden flex flex-col lg:flex-row hover:border-[#7bd355]/40 transition-all cursor-pointer group"
                >
                  <div className="w-full lg:w-3/5 h-64 lg:h-96 relative overflow-hidden bg-[#161616]">
                    <img src={filteredBlogs[0].imageUrl} alt={filteredBlogs[0].title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500" />
                    <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest text-[#121212] bg-[#7bd355] px-3 py-1 rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="p-8 lg:w-2/5 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <span className="text-[10px] font-mono text-[#7bd355] font-semibold uppercase">{filteredBlogs[0].category}</span>
                      <h2 className="text-xl md:text-2xl font-futuristic font-bold text-[#e8ecee] group-hover:text-[#7bd355] transition-colors leading-tight">
                        {filteredBlogs[0].title}
                      </h2>
                      <p className="text-xs text-[#939596] leading-relaxed">
                        {filteredBlogs[0].subtitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-[#333333]">
                      <div className="space-y-0.5">
                        <span className="block text-xs font-bold text-[#e8ecee]">{filteredBlogs[0].author}</span>
                        <span className="block text-[10px] text-[#939596]">{filteredBlogs[0].authorRole}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-[10px] text-[#939596]">
                        <span className="flex items-center"><Clock className="w-3 h-3 text-[#7bd355] mr-1" /> {filteredBlogs[0].readTime}</span>
                        <span className="flex items-center"><Eye className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {filteredBlogs[0].views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sub-grid of other articles */}
              {filteredBlogs.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.slice(1).map((blog) => (
                    <div 
                      key={blog.id}
                      onClick={() => handleOpenPost(blog)}
                      className="glass-panel rounded-2xl border border-[#333333] overflow-hidden hover:border-[#7bd355]/40 transition-all flex flex-col justify-between cursor-pointer group"
                    >
                      <div>
                        <div className="relative h-48 overflow-hidden bg-[#161616]">
                          <img src={blog.imageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest text-[#121212] bg-[#7bd355] px-2.5 py-1 rounded-full">
                            {blog.category}
                          </span>
                        </div>
                        <div className="p-6 space-y-4">
                          <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] line-clamp-2 group-hover:text-[#7bd355] transition-colors leading-snug">
                            {blog.title}
                          </h3>
                          <p className="text-xs text-[#939596] leading-relaxed line-clamp-3">
                            {blog.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="p-6 pt-0">
                        <div className="flex items-center justify-between pt-4 border-t border-[#333333] text-[10px] text-[#939596]">
                          <span>{blog.author} • {blog.date}</span>
                          <span className="flex items-center"><Clock className="w-3 h-3 text-[#7bd355] mr-1" /> {blog.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      ) : (
        // DYNAMIC SINGLE ARTICLE VIEW
        <div className="max-w-4xl mx-auto space-y-8 relative">
          
          {/* Custom Reading Progress Bar */}
          <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-[#333333]">
            <div 
              className="bg-[#7bd355] h-full shadow-[0_0_10px_#7bd355] transition-all" 
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Back Action button */}
          <button 
            onClick={() => setActivePost(null)}
            className="inline-flex items-center space-x-2 py-2 px-4 rounded-xl bg-[#333333] text-[#7bd355] border border-[#7bd355]/20 hover:border-[#7bd355] text-xs font-bold uppercase tracking-widest transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Archive Index</span>
          </button>

          {/* Header Metadata */}
          <div className="space-y-4">
            <span className="text-[10px] font-mono text-[#7bd355] font-semibold uppercase tracking-widest">
              Category: {activePost.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee] leading-tight">
              {activePost.title}
            </h1>
            <p className="text-sm text-[#939596] leading-relaxed">
              {activePost.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#1e1e1e] border border-[#333333] text-xs text-[#939596]">
              <div className="flex items-center space-x-3">
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-[#e8ecee]">{activePost.author}</span>
                  <span className="block text-[9px] text-[#939596]">{activePost.authorRole}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 text-[#7bd355] mr-1.5" /> {activePost.readTime}</span>
                <span className="flex items-center"><Eye className="w-3.5 h-3.5 text-[#7bd355] mr-1.5" /> {activePost.views} views</span>
              </div>
            </div>
          </div>

          {/* Article Banner image */}
          <div className="relative h-64 md:h-[450px] rounded-2xl overflow-hidden bg-[#161616] border border-[#333333]">
            <img src={activePost.imageUrl} alt={activePost.title} className="w-full h-full object-cover" />
          </div>

          {/* Main Content Body */}
          <div 
            ref={articleContainerRef}
            className="prose prose-invert max-w-none text-sm leading-relaxed text-[#e8ecee] space-y-6 pt-4 border-t border-[#333333]"
          >
            {/* Extremely simple & performant custom markdown visualizer to style headings and code blocks */}
            {activePost.content.split('\n\n').map((para, pIdx) => {
              if (para.startsWith('# ')) {
                return (
                  <h1 key={pIdx} className="text-2xl md:text-3xl font-futuristic font-bold text-[#e8ecee] pt-4">
                    {para.replace('# ', '')}
                  </h1>
                );
              }
              if (para.startsWith('## ')) {
                return (
                  <h2 key={pIdx} className="text-xl md:text-2xl font-futuristic font-bold text-[#e8ecee] pt-3">
                    {para.replace('## ', '')}
                  </h2>
                );
              }
              if (para.startsWith('### ')) {
                return (
                  <h3 key={pIdx} className="text-lg md:text-xl font-futuristic font-semibold text-[#e8ecee] pt-2">
                    {para.replace('### ', '')}
                  </h3>
                );
              }
              if (para.startsWith('> ')) {
                return (
                  <blockquote key={pIdx} className="border-l-4 border-[#7bd355] bg-[#333333]/20 pl-4 py-3 rounded-r-lg italic text-[#939596]">
                    {para.replace('> ', '')}
                  </blockquote>
                );
              }
              if (para.startsWith('```')) {
                const codeLines = para.split('\n').filter(line => !line.startsWith('```'));
                return (
                  <pre key={pIdx} className="bg-[#121212] border border-[#333333] p-4 rounded-xl overflow-x-auto font-mono text-xs text-[#7bd355]">
                    <code>{codeLines.join('\n')}</code>
                  </pre>
                );
              }
              if (para.startsWith('* ')) {
                return (
                  <ul key={pIdx} className="list-disc pl-5 space-y-2">
                    {para.split('\n').map((item, iIdx) => (
                      <li key={iIdx}>{item.replace('* ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return <p key={pIdx}>{para}</p>;
            })}
          </div>

          {/* Social share & tags panel */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-[#333333]">
            <div className="flex flex-wrap gap-1.5">
              {activePost.tags.map((tag, idx) => (
                <span key={idx} className="text-[10px] bg-[#333333] border border-[#939596]/10 text-[#939596] px-2.5 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#939596]">
              <span>Share Intel:</span>
              <button 
                onClick={handleCopyLink}
                className="p-2 rounded bg-[#333333] hover:text-[#7bd355] flex items-center space-x-1"
                title="Copy URL"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#7bd355]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
              <button className="p-2.5 rounded bg-[#333333] hover:text-[#7bd355] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </button>
              <button className="p-2.5 rounded bg-[#333333] hover:text-[#7bd355] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </button>
            </div>
          </div>

          {/* Related Articles recommendation */}
          {relatedArticles.length > 0 && (
            <div className="pt-12 border-t border-[#333333] space-y-6">
              <h3 className="font-futuristic font-bold text-xs uppercase tracking-widest text-[#7bd355]">Related Transmissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((rel) => (
                  <div 
                    key={rel.id}
                    onClick={() => handleOpenPost(rel)}
                    className="glass-panel p-4 rounded-xl border border-[#333333] hover:border-[#7bd355]/30 cursor-pointer flex space-x-4 items-center"
                  >
                    <img src={rel.imageUrl} alt={rel.title} className="w-16 h-16 rounded object-cover shrink-0 bg-[#161616]" />
                    <div className="min-w-0">
                      <h4 className="font-futuristic font-bold text-xs text-[#e8ecee] truncate">{rel.title}</h4>
                      <span className="block text-[9px] text-[#7bd355] mt-1 uppercase">{rel.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
