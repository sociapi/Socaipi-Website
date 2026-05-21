import React, { useState } from 'react';
import { Star, MessageSquare, Send, Check } from 'lucide-react';
import { ReviewItem } from '../data/initialData';

interface ReviewsProps {
  reviews: ReviewItem[];
  setReviews: React.Dispatch<React.SetStateAction<ReviewItem[]>>;
}

export const Reviews: React.FC<ReviewsProps> = ({ reviews, setReviews }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(5);
  const [tag, setTag] = useState('Web Dev');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !reviewText) return;

    const newReview: ReviewItem = {
      id: `rev-${Date.now()}`,
      name,
      role,
      review: reviewText,
      rating,
      avatar: `https://images.unsplash.com/photo-${1500000000000 + (reviews.length * 123456) % 9999999}?w=200&h=200&fit=crop&q=80`,
      tag
    };

    setReviews((prev) => [newReview, ...prev]);
    setSuccess(true);
    setName('');
    setRole('');
    setReviewText('');
    setRating(5);
    
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-20 relative z-10">
      
      {/* Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Transmission logs // feedback</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          STUDENT <span className="text-[#7bd355] glow-text">TRANSMISSIONS</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Verify peer experiences, success pathways, and bootcamp testimonials. Let us know how your learning path has progressed.
        </p>
      </div>

      {/* Reviews feed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((rev) => (
          <div 
            key={rev.id}
            className="glass-panel p-6 md:p-8 rounded-2xl border border-[#333333] hover:border-[#7bd355]/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < Math.round(rev.rating) 
                          ? 'text-[#7bd355] fill-[#7bd355]' 
                          : 'text-[#333333] fill-[#333333]'
                      }`} 
                    />
                  ))}
                </div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                  {rev.tag}
                </span>
              </div>

              <p className="text-xs text-[#939596] leading-relaxed italic">
                "{rev.review}"
              </p>
            </div>

            <div className="flex items-center space-x-3 mt-6 pt-4 border-t border-[#333333]">
              <img src={rev.avatar} alt={rev.name} className="w-9 h-9 rounded-full object-cover border border-[#7bd355]/30" />
              <div>
                <h4 className="text-xs font-futuristic font-bold text-[#e8ecee]">{rev.name}</h4>
                <span className="text-[9px] text-[#939596]">{rev.role}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Review Submission Form */}
      <div className="max-w-2xl mx-auto glass-panel border border-[#7bd355]/20 rounded-2xl p-6 md:p-8 space-y-6">
        
        <div className="flex items-center space-x-3 pb-4 border-b border-[#333333]">
          <div className="p-2 rounded-lg bg-[#333333] text-[#7bd355]">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">Submit Transmission</h3>
            <p className="text-[9px] text-[#939596] uppercase tracking-widest">Share your learning journey logs</p>
          </div>
        </div>

        {success ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-futuristic font-bold text-[#e8ecee]">Feedback Transmitted!</h4>
            <p className="text-xs text-[#939596]">
              Thank you! Your testimonial has been logged and published on the live feed.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            
            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ayesha Shah"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Role / Academic Level</label>
              <input
                type="text"
                placeholder="e.g. CS Student / AI Lead"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Topic Focus Tag</label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              >
                <option value="Web Dev Success">Web Dev Success</option>
                <option value="Robotics/IoT">Robotics/IoT</option>
                <option value="AI/ML Pipeline">AI/ML Pipeline</option>
                <option value="General Bootcamp">General Bootcamp</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Star Rating (1 - 5)</label>
              <input
                type="number"
                max={5}
                min={1}
                step={0.5}
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                required
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <div className="space-y-1 md:col-span-2">
              <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Review Text</label>
              <textarea
                placeholder="Write your experiences, skills gained, projects built, or how mentors assisted you..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={4}
                className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355]"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all flex items-center justify-center space-x-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Log Feedback</span>
            </button>

          </form>
        )}

      </div>

    </div>
  );
};
