import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { FAQItem } from '../data/initialData';

interface FAQProps {
  faqs: FAQItem[];
}

export const FAQ: React.FC<FAQProps> = ({ faqs }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | FAQItem['category']>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQId, setExpandedFAQId] = useState<string | null>(null);

  const categories: ('All' | FAQItem['category'])[] = [
    'All', 'General', 'Workshops', 'Membership', 'Technical'
  ];

  // Filtering
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedFAQId(expandedFAQId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
      
      {/* Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Knowledge Base // faqs</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          COMMON <span className="text-[#7bd355] glow-text">COORDINATES</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Search our technical support log database. If you have inquiries not mapped here, reach out directly.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-[#333333] pb-6">
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat
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
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#1e1e1e] border border-[#333333] rounded-full py-2 pl-9 pr-4 text-xs text-[#e8ecee] focus:outline-none focus:border-[#7bd355]"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#939596]" />
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-10 text-[#939596] text-xs uppercase tracking-widest">
            No queries found in the FAQ database log files.
          </div>
        ) : (
          filteredFAQs.map((faq) => {
            const isExpanded = expandedFAQId === faq.id;
            return (
              <div 
                key={faq.id}
                className="bg-[#1e1e1e] border border-[#333333] rounded-xl overflow-hidden hover:border-[#517642] transition-colors duration-200"
              >
                {/* Header bar */}
                <button
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left text-xs font-bold font-futuristic text-[#e8ecee] hover:text-[#7bd355] transition-colors"
                >
                  <div className="flex items-center space-x-3 pr-4">
                    <HelpCircle className="w-4 h-4 text-[#7bd355] shrink-0" />
                    <span>{faq.question}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#7bd355] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#939596] shrink-0" />
                  )}
                </button>

                {/* Collapsible content area */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-60 border-t border-[#333333]' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 text-xs text-[#939596] leading-relaxed">
                    <p>{faq.answer}</p>
                    <div className="mt-4 pt-2 border-t border-[#333333] flex items-center justify-between text-[8px] uppercase font-mono font-bold tracking-widest text-[#7bd355]/60">
                      <span>Category: {faq.category}</span>
                      <span>Verified: Dec 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
