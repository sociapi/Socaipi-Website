import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, User, ArrowRight, X, AlertCircle } from 'lucide-react';
import { EventItem } from '../data/initialData';

interface EventsProps {
  events: EventItem[];
  setEvents: React.Dispatch<React.SetStateAction<EventItem[]>>;
}

export const Events: React.FC<EventsProps> = ({ events, setEvents }) => {
  const [filter, setFilter] = useState<'All' | 'Upcoming' | 'Past'>('All');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  
  // Registration modal states
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  const filteredEvents = events.filter((e) => {
    if (filter === 'All') return true;
    return e.category === filter;
  });

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent || !regName || !regEmail) return;

    // Increment registered count in local state
    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === selectedEvent.id
          ? { ...ev, registeredCount: ev.registeredCount + 1 }
          : ev
      )
    );

    // Update selectedEvent instance locally in memory to reflect count change
    setSelectedEvent((prev) => prev ? { ...prev, registeredCount: prev.registeredCount + 1 } : null);

    setRegSuccess(true);
    setRegName('');
    setRegEmail('');
    setTimeout(() => {
      setRegSuccess(false);
      setIsRegModalOpen(false);
    }, 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
      
      {/* Page Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Operations Log // events</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          SOCIETY <span className="text-[#7bd355] glow-text">CAMPAIGNS</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Discover hands-on bootcamps, community hackathons, and technical lectures. Secure your roster clearance code below to join us.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center space-x-2 border-b border-[#333333] pb-4">
        {['All', 'Upcoming', 'Past'].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category as any)}
            className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
              filter === category
                ? 'bg-[#7bd355] text-[#121212] font-bold shadow-[0_0_15px_rgba(123,211,85,0.25)]'
                : 'text-[#939596] hover:text-[#e8ecee] hover:bg-[#333333]/30'
            }`}
          >
            {category} Campaigns
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="glass-panel-interactive rounded-2xl border border-[#333333] overflow-hidden flex flex-col justify-between group h-full"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-[#161616]">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  className={`absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow ${
                    event.category === 'Upcoming'
                      ? 'bg-[#7bd355] text-[#121212]'
                      : 'bg-[#333333] text-[#939596]'
                  }`}
                >
                  {event.category}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#7bd355] font-semibold">{event.date}</span>
                  <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] line-clamp-1 group-hover:text-[#7bd355] transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-xs text-[#939596] leading-relaxed line-clamp-3">
                    {event.description}
                  </p>
                </div>

                <div className="flex flex-col space-y-2 pt-3 border-t border-[#333333] text-[11px] text-[#939596]">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-3.5 h-3.5 text-[#7bd355]" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-[#7bd355]" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => setSelectedEvent(event)}
                className="w-full py-3 rounded-xl bg-[#333333] hover:bg-[#7bd355] hover:text-[#121212] border border-[#7bd355]/30 text-[#7bd355] font-bold text-[10px] uppercase tracking-widest transition-all flex items-center justify-center space-x-2"
              >
                <span>Read Full Intel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EVENT DETAIL MODAL */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/90 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-[#1e1e1e] border border-[#7bd355]/30 rounded-2xl flex flex-col md:flex-row shadow-2xl overflow-hidden my-8 max-h-[90vh]">
            
            {/* Event visual left panel */}
            <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden bg-[#161616] shrink-0">
              <img
                src={selectedEvent.imageUrl}
                alt={selectedEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />
              
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-4 left-4 p-1.5 rounded-full bg-[#121212]/80 border border-[#939596]/10 text-[#939596] hover:text-[#7bd355]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Event detail contents right panel */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                    {selectedEvent.category} Campaign
                  </span>
                  <h2 className="text-xl md:text-2xl font-futuristic font-bold text-[#e8ecee] mt-2 leading-tight">
                    {selectedEvent.title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center space-x-2 text-[#939596]">
                    <Calendar className="w-4 h-4 text-[#7bd355]" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#939596]">
                    <Clock className="w-4 h-4 text-[#7bd355]" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#939596] col-span-2">
                    <MapPin className="w-4 h-4 text-[#7bd355]" />
                    <span>{selectedEvent.location}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8ecee]">Mission Parameters</h4>
                  <p className="text-xs text-[#939596] leading-relaxed">
                    {selectedEvent.longDescription}
                  </p>
                </div>

                {/* Speaker profile info */}
                <div className="p-4 rounded-xl bg-[#121212] border border-[#333333] flex items-center space-x-4">
                  <img
                    src={selectedEvent.speaker.avatar}
                    alt={selectedEvent.speaker.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#7bd355]/30"
                  />
                  <div>
                    <span className="block text-[9px] uppercase text-[#7bd355] font-bold">Campaign Briefing Officer</span>
                    <h5 className="font-futuristic font-bold text-xs text-[#e8ecee]">{selectedEvent.speaker.name}</h5>
                    <p className="text-[10px] text-[#939596]">{selectedEvent.speaker.role}</p>
                  </div>
                </div>

                {/* Event Agendas */}
                {selectedEvent.schedule && selectedEvent.schedule.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#e8ecee]">Agenda Coordinates</h4>
                    <div className="space-y-2 text-xs">
                      {selectedEvent.schedule.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-[#161616] p-2.5 rounded-lg border border-[#333333]">
                          <span className="font-mono text-[#7bd355] font-bold text-[10px]">{item.time}</span>
                          <span className="text-[#939596]">{item.activity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Roster action section */}
              <div className="mt-8 pt-6 border-t border-[#333333] flex items-center justify-between">
                <div className="flex items-center space-x-2 text-xs text-[#939596]">
                  <Users className="w-4 h-4 text-[#7bd355]" />
                  <span>{selectedEvent.registeredCount} Agents Enlisted</span>
                </div>
                
                {selectedEvent.category === 'Upcoming' ? (
                  <button
                    onClick={() => setIsRegModalOpen(true)}
                    className="px-6 py-3 rounded-xl bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    Register Seat
                  </button>
                ) : (
                  <span className="text-xs uppercase tracking-widest text-[#939596] font-bold">Campaign Closed</span>
                )}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* REGISTRATION SUB-MODAL */}
      {isRegModalOpen && selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/95 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#1e1e1e] border border-[#7bd355]/40 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-futuristic font-bold text-xs uppercase tracking-widest text-[#7bd355]">Enlistment Form</h3>
              <button
                onClick={() => setIsRegModalOpen(false)}
                className="p-1 rounded-full hover:bg-[#333333] text-[#939596] hover:text-[#7bd355]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {regSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
                  ✓
                </div>
                <h4 className="font-futuristic font-bold text-[#e8ecee]">Welcome Aboard!</h4>
                <p className="text-xs text-[#939596]">
                  Your seat configuration has been mapped successfully. Confirmation dispatch sent.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4 text-xs">
                <div className="p-3 rounded-lg bg-[#333333] text-[#939596] flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-[#7bd355] shrink-0 mt-0.5" />
                  <p className="text-[10px]">
                    You are registering for: <span className="text-[#e8ecee] font-semibold">{selectedEvent.title}</span>. Ensure credentials match your university card record.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Aslam Khan"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      required
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 pl-9 pr-3 text-[#e8ecee] focus:border-[#7bd355]"
                    />
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#939596]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">University Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="e.g. aslam@student.uop.edu.pk"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      required
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 pl-9 pr-3 text-[#e8ecee] focus:border-[#7bd355]"
                    />
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#939596]" />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Confirm Registration
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
