import React from 'react';
import { Target, Compass, BookOpen, GraduationCap, Trophy } from 'lucide-react';

// Helper function to import images correctly for Vite bundling
const importImage = (path: string): string => {
  return new URL(`../Image/${path}`, import.meta.url).href;
};

export const About: React.FC = () => {
  const milestones = [
    {
      date: 'December 2025',
      title: 'Society Inception',
      desc: 'Founded at Islamia University Peshawar with a core group of 2 eager computer science .',
    },
    {
      date: 'Feb 2026',
      title: 'Agentum 2026 Seminar',
      desc: 'The AGENTUM 2026 Seminar was successfully held on 17 February 2026, bringing together students, tech enthusiasts, and future innovators to learn about the latest developments in Artificial Intelligence and modern technology. The event attracted more than 150 participants, creating an energetic environment filled with learning, discussion, and inspiration.',
    },
    {
      date: '07 May 2026',
      title: 'Mehfil AI',
      desc: 'Mehfil AI 2026 was organized with the goal of spreading awareness about Artificial Intelligence and helping students learn practical skills that can support their future careers. The event encouraged students to connect directly with professionals and understand the real-world applications of AI technologies.',
    },
    {
      date: ' (Upcoming)',
      title: 'Session',
      desc: 'coming soon',
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-20 relative z-10">
      
      {/* 1. OVERVIEW & TITLE */}
      <div className="space-y-6 text-center max-w-3xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">System Intel // about_sociapi</span>
        <h1 className="text-4xl md:text-6xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          SOCIAPI <span className="text-[#7bd355] glow-text">SOCIETY</span>
        </h1>
        <div className="text-xs sm:text-sm text-[#939596] leading-relaxed space-y-4 text-left glass-panel p-6 rounded-xl border border-[#333333]">
          <p>
            Sociapi Society is a student-led community based at Islamia University Peshawar, where students turn ideas into skills and skills into real projects. It is a student community where we learn new skills together and help each other grow. Our society is made to support every student who wants to learn modern and practical technology in an easy and friendly way.
          </p>
          <p>
            We focus on programming, AI, Robotics, Gen AI, Machine Learning, Deep Learning, OpenCV, Data Science, Data Analysis, web development, and many other digital skills. We aim to make learning simple, useful, and connected to real life.
          </p>
          <p>
            We arrange workshops, training sessions, study groups, and project activities. Students learn by doing, build real projects, and add strong work to their portfolios. We believe learning becomes powerful when students practice, share ideas, and solve problems as a team.
          </p>
          <p>
            Our community at Islamia University Peshawar is open to all students. It does not matter if someone is a beginner or advanced. Everyone gets support, guidance, and a friendly environment to learn and grow.
          </p>
        </div>
      </div>

      {/* 2. VISION & MISSION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-8 rounded-2xl border border-[#7bd355]/20 hover:border-[#7bd355] transition-all relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#7bd355]/5 rounded-full blur-xl" />
          <div className="flex items-center space-x-3.5 mb-6">
            <div className="p-2.5 rounded-xl bg-[#333333] border border-[#7bd355]/20 text-[#7bd355] shadow-lg shadow-black/20">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">Our Vision</h3>
          </div>
          <p className="text-xs text-[#939596] leading-relaxed">
            To forge a smart, highly-skilled, and creative student community in Peshawar that thrives on practical coding, artificial intelligence, and open hardware. We envision a culture where every university student feels capable of building production-grade digital solutions.
          </p>
        </div>

        <div className="glass-panel p-8 rounded-2xl border border-[#517642]/40 hover:border-[#7bd355] transition-all relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-[#517642]/10 rounded-full blur-xl" />
          <div className="flex items-center space-x-3.5 mb-6">
            <div className="p-2.5 rounded-xl bg-[#333333] border border-[#517642]/30 text-[#7bd355] shadow-lg shadow-black/20">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-futuristic font-bold text-sm tracking-widest uppercase text-[#e8ecee]">Our Mission</h3>
          </div>
          <ul className="space-y-3.5 text-xs text-[#939596] leading-relaxed">
            <li className="flex items-start space-x-2">
              <span className="text-[#7bd355] mt-0.5">•</span>
              <span>Provide simple, practical workshops in modern digital frameworks.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#7bd355] mt-0.5">•</span>
              <span>Help students construct strong portfolios and showcase active repos.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#7bd355] mt-0.5">•</span>
              <span>Bridge operations and networking with local industry experts.</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-[#7bd355] mt-0.5">•</span>
              <span>Cultivate critical problem-solving and clean team workflows.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. INTERACTIVE TIMELINE */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Milestone Timeline</h2>
          <p className="text-[10px] text-[#939596] uppercase tracking-widest">Tracking our engineering trajectory</p>
        </div>

        <div className="relative border-l border-[#333333] pl-6 ml-4 md:ml-12 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative space-y-2 group">
              {/* Glowing anchor node */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-[#121212] border-2 border-[#7bd355] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#7bd355] group-hover:scale-150 transition-transform" />
              </div>
              <span className="text-[10px] font-mono text-[#7bd355] uppercase tracking-widest font-semibold">{m.date}</span>
              <h4 className="font-futuristic font-bold text-xs text-[#e8ecee] uppercase tracking-wider">{m.title}</h4>
              <p className="text-xs text-[#939596] leading-relaxed max-w-2xl">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. LEADERSHIP MESSAGE */}
      <div className="space-y-8">
        
        {/* Founder Bio Panel */}
        <div className="glass-panel rounded-2xl border border-[#7bd355]/30 p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#7bd355]/5 rounded-full blur-2xl pointer-events-none" />
          
          <div className="space-y-3 lg:col-span-1 text-center lg:text-left">
            <img 
             src="/Image/Team Pic/Zuhair.jpeg" // 
              alt="Muhammad Zuhair Zeb" 
              className="w-28 h-28 rounded-2xl object-cover mx-auto lg:mx-0 border-2 border-[#7bd355]"
            />
            <div>
              <span className="text-[8px] uppercase tracking-widest font-mono text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded-full">★ Founder</span>
              <h4 className="font-futuristic font-bold text-[#e8ecee] tracking-wide mt-1">Muhammad Zuhair Zeb</h4>
              <span className="text-[9px] uppercase font-bold text-[#939596] tracking-wider block">AI Undergraduate / Swabi</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-futuristic font-bold text-xs tracking-widest uppercase text-[#7bd355]">// Founder Profile</h3>
            <p className="text-xs text-[#939596] leading-relaxed">
              Muhammad Zuhair Zeb belongs to Swabi, Pakistan. He is an undergraduate student in Artificial Intelligence at Islamia College University, Peshawar. He is the founder of Sociapi Society, a student-led platform that promotes technology, creativity, and skills development.
            </p>
            <p className="text-xs text-[#939596] leading-relaxed">
              Through this program, he seeks to provide students with opportunities to study current technology and develop practical skills. His interests include data and business intelligence, AI agents, and new technologies. He is skilled in data analysis, dashboard creation, and using AI tools to solve real-world problems.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['AI Agents', 'Data Analysis', 'Business Intelligence', 'Dashboard Sprints'].map((sk, sidx) => (
                <span key={sidx} className="text-[8px] font-mono text-[#7bd355] bg-[#333333] px-2 py-0.5 rounded border border-[#7bd355]/20">{sk}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Teacher Advisor Bio Panel */}
        <div className="glass-panel rounded-2xl border border-[#333333] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative overflow-hidden">
          <div className="space-y-3 lg:col-span-1 text-center lg:text-left">
            <img 
              src="/Image/Team Pic/Navved.png"
              alt="Naveed Abbas" 
              className="w-28 h-28 rounded-2xl object-cover mx-auto lg:mx-0 border-2 border-[#517642]"
            />
            <div>
              <span className="text-[8px] uppercase tracking-widest font-mono text-[#939596] bg-[#333333] px-2 py-0.5 rounded-full">Academic Mentor</span>
              <h4 className="font-futuristic font-bold text-[#e8ecee] tracking-wide mt-1">Naveed Abbas</h4>
              <span className="text-[9px] uppercase font-bold text-[#939596] tracking-wider block">Teacher Advisor</span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-futuristic font-bold text-xs tracking-widest uppercase text-[#7bd355]">// Teacher Advisor Message</h3>
            <p className="text-xs text-[#939596] leading-relaxed">
              As Teacher Advisor for Sociapi Society, Naveed Abbas guides the student leadership on institutional compliance, academic integration points, and community outreach. 
            </p>
            <p className="text-xs text-[#939596] leading-relaxed">
              "We strive to combine rigorous course syllabus tracks with flexible student-driven hackathons. Our mission is to prepare Peshawar's tech students to meet and exceed global engineering benchmarks."
            </p>
          </div>
        </div>

      </div>

      {/* 5. LEARNING PHILOSOPHY & PILLARS */}
      <div className="space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-futuristic font-bold text-[#e8ecee] tracking-wider uppercase">Our Pillars</h2>
          <p className="text-[10px] text-[#939596] uppercase tracking-widest">How we scale knowledge</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-2xl space-y-4">
            <div className="w-9 h-9 rounded-xl bg-[#333333] border border-[#7bd355]/20 flex items-center justify-center text-[#7bd355]">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="font-futuristic font-bold text-xs uppercase tracking-wider text-[#e8ecee]">Weekly Study Groups</h4>
            <p className="text-xs text-[#939596] leading-relaxed">
              Informal circles meeting on campus to dissect documentation, practice algorithms, and review member projects.
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-2xl space-y-4">
            <div className="w-9 h-9 rounded-xl bg-[#333333] border border-[#7bd355]/20 flex items-center justify-center text-[#7bd355]">
              <GraduationCap className="w-4 h-4" />
            </div>
            <h4 className="font-futuristic font-bold text-xs uppercase tracking-wider text-[#e8ecee]">Intense Bootcamps</h4>
            <p className="text-xs text-[#939596] leading-relaxed">
              Highly technical weekend sessions focused on specialized tooling (e.g. Next.js structure, OpenCV video arrays, Arduino motors).
            </p>
          </div>

          <div className="bg-[#1a1a1a] border border-[#333333] p-6 rounded-2xl space-y-4">
            <div className="w-9 h-9 rounded-xl bg-[#333333] border border-[#7bd355]/20 flex items-center justify-center text-[#7bd355]">
              <Trophy className="w-4 h-4" />
            </div>
            <h4 className="font-futuristic font-bold text-xs uppercase tracking-wider text-[#e8ecee]">Portfolio Challenges</h4>
            <p className="text-xs text-[#939596] leading-relaxed">
              Building and publishing open-source applications, making sure every member exits the cohort with verifiable code repos.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
