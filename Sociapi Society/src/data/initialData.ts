// CENTRALIZED SOCIAPI DATABASE FILE
// FIX: Images moved to public/Image/ — using direct public paths instead of new URL()

// ✅ FIXED: getImagePath now uses public folder (no Vite bundling issues)
export const getImagePath = (filename: string): string => {
  return `/Image/${filename}`;
};

// ============================================================
// INTERFACES
// ============================================================

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: 'Leadership' | 'Technical' | 'Design & Media' | 'Operations' | 'Administration';
  avatar: string;
  bio: string;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
  premium: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Seminar' | 'Hackathons' | 'Community' | 'Projects';
  imageUrl: string;
  date: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  views: number;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  time: string;
  location: string;
  category: 'Upcoming' | 'Past';
  imageUrl: string;
  speaker: {
    name: string;
    role: string;
    avatar: string;
  };
  schedule: { time: string; activity: string }[];
  registeredCount: number;
}

export interface MerchItem {
  id: string;
  name: string;
  price: number;
  category: 'T-Shirt' | 'Hoodie' | 'Cap' | 'Stickers';
  imageUrl: string;
  description: string;
  details: string[];
  sizes?: string[];
  inStock: boolean;
}

export interface ReviewItem {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  avatar: string;
  tag: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Workshops' | 'Membership' | 'Technical';
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  type: 'Internship' | 'Volunteer';
  duration: string;
  location: string;
  description: string;
  requirements: string[];
  benefits: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: 'Unread' | 'Replied';
}

export interface PartnershipInquiry {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  type: 'Event' | 'Learning' | 'Community';
  details: string;
  date: string;
}

export interface SiteSettings {
  logoUrl: string;
  logoText: string;
  subtitleText: string;
  foundedDate: string;
  membersCount: string;
  eventsCount: string;
  campusName: string;
  campusLocation: string;
  phone: string;
  primaryEmail: string;
  secondaryEmail: string;
}

// ============================================================
// SITE SETTINGS
// ============================================================

export const initialSettings: SiteSettings = {
  logoUrl: getImagePath('ss.png'),
  logoText: 'Sociapi Society',
  subtitleText: 'From Ideas to Intelligence',
  foundedDate: 'Dec 2025',
  membersCount: '16+',
  eventsCount: '2',
  campusName: 'Islamia University',
  campusLocation: 'Peshawar',
  phone: '+923329984490',
  primaryEmail: 'sociapisociety@gmail.com',
  secondaryEmail: 'info.sociapi@gmail.com'
};

// ============================================================
// TEAM MEMBERS
// ============================================================

export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Muhammad Zuhair Zeb',
    role: 'Founder',
    department: 'Leadership',
    avatar: getImagePath('Team Pic/Zuhair.jpeg'),
    bio: 'Muhammad Zuhair Zeb belongs to Swabi, Pakistan. He is an undergraduate student in Artificial Intelligence at Islamia College University, Peshawar. He is the founder of Sociapi Society, a student-led platform that promotes technology, creativity, and skills development. Through this program, he seeks to provide students with opportunities to study current technology and develop practical skills. His interests include data and business intelligence, AI agents, and new technologies. He is skilled in data analysis, dashboard creation, and using AI tools to solve real-world problems.',
    skills: ['Artificial Intelligence', 'Data Analysis', 'Business Intelligence', 'AI Agents', 'Dashboard Design'],
    socials: { github: 'https://github.com/zuhairzeb', linkedin: 'https://linkedin.com/zuhairzeb', email: 'sociapisociety@gmail.com' },
    premium: true,
  },
  {
    id: 'team-2',
    name: 'Muhammad Mudassir',
    role: 'Co-Founder',
    department: 'Leadership',
    avatar: getImagePath('Team Pic/Muhammad Mudassir.jpg'),
    bio: 'Co-Founder of Sociapi Society. Partner in coordinating technical workflows, managing study sprints, and scaling campus machine learning cohorts.',
    skills: ['Python', 'Deep Learning', 'Project Orchestration', 'Team Synergy'],
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    premium: true,
  },
{
    id: 'team-3',
    name: 'Bilal Muhammad',
    role: 'General Secretary',
    department: 'Administration',
    avatar: getImagePath('Team Pic/Bilal Muhammad.jpg'),
    bio: 'Archives society protocols, meeting minutes, and regulatory compliance logs on behalf of leadership.',
    skills: ['Documentation', 'Administrative Protocols', 'Compliance', 'Archival'],
    socials: { github: 'https://github.com' },
    premium: false,
  },
  {
    id: 'team-4',
    name: 'Muhammad Zakria',
    role: 'Project Manager',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Muhammad Zakria.jpg'),
    bio: 'Manages project timelines, task assignments, and resource allocation for technical workshops and bootcamps.',
    skills: ['Project Management', 'Timeline Coordination', 'Resource Allocation', 'Team Leadership'],
    socials: {},
    premium: false,
  },
  {
    id: 'team-5',
    name: 'Muhammad Zulkifal',
    role: 'Event Manager',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Muhammad Zulkifal (Event Manger).jpg'),
    bio: 'Orchestrates end-to-end event scheduling, venue coordination, and timeline adherence for seminars.',
    skills: ['Event Logistics', 'Vendor Coordination', 'Timeline Management', 'Crisis Resolution'],
    socials: {},
    premium: false,
  },

  {
    id: 'team-6',
    name: 'Atika  Aqleem ',
    role: 'Organizer Lead',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Atika Aqlim.jpg'),
    bio: 'Leads the organization of workshops, bootcamps, and seminars, ensuring smooth execution and participant engagement.',
    skills: ['Event Logistics', 'Vendor Coordination', 'Timeline Management', 'Crisis Resolution'],
    socials: {},
    premium: false,
  },

  {
    id: 'team-7',
    name: 'Riyan Ahmad',
    role: 'Organizer',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Riyan Ahmad.png'),
    bio: 'Leads the organization of workshops, bootcamps, and seminars, ensuring smooth execution and participant engagement.',
    skills: ['Event Logistics', 'Vendor Coordination', 'Timeline Management', 'Crisis Resolution'],
    socials: {},
    premium: false,
  },

  {
    id: 'team-8',
    name: 'Hamza khan',
    role: 'HR manager',
    department: 'Administration',
    avatar: getImagePath('Team Pic/Hamza Khan.jpg'),
    bio: 'Directs society personnel logistics, coordinator matching, and interview pipelines for junior technical leads.',
    skills: ['Human Resources', 'Teamwork', 'Communication', 'Recruitment'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-9',
    name: 'Sajid Ullah',
    role: 'Outreach',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Sajid_Wazir.png'),
    bio: 'Leads communications with external tech communities, sponsors, and guest lecturers across Peshawar.',
    skills: ['Outreach', 'Networking', 'Public Relations', 'Events Marketing'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-10',
    name: 'Muhammad Faisal',
    role: 'Video Editor',
    department: 'Design & Media',
    avatar: getImagePath('Team Pic/Faisal Khan.png'),
    bio: 'Crafts premium digital reels, speaker promotional reels, and event wrap-up motion graphics.',
    skills: ['Premiere Pro', 'After Effects', 'Cinematic Cuts', 'Sound Design'],
    socials: { github: 'https://github.com' },
    premium: false,
  },
  {
    id: 'team-11',
    name: 'Asiya Islam',
    role: 'Women Lead',
    department: 'Leadership',
    avatar: getImagePath('Team Pic/Female/Asiya Islam.png'),
    bio: 'Empowering and mentoring women developers at Islamia University, Peshawar, bridging STEM training gaps.',
    skills: ['Mentorship', 'Web Dev', 'Public Speaking', 'STEM Outreach'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: true,
  },
  {
    id: 'team-12',
    name: 'Maham Iqbal',
    role: 'Women CO-Lead',
    department: 'Leadership',
    avatar: getImagePath('Team Pic/Female/Maham Iqbal.png'),
    bio: 'Co-leads STEM initiatives, event coordination, and junior study groups for female engineering students.',
    skills: ['Coordination', 'Project Management', 'UI Design', 'Data Entry'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-13',
    name: 'Alina Kalim',
    role: 'Decor Lead',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Female/Alina khan.JPG'),
    bio: 'Orchestrates the visual layout and stage design of tech seminars, ensuring a premium futuristic atmosphere.',
    skills: ['Venue Styling', 'Theme Design', 'Visual Aesthetics', 'Logistics'],
    socials: {},
    premium: false,
  },

  {
    id: 'team-14',
    name: 'Maimoona Iqbal',
    role: 'Decor',
    department: 'Operations',
    avatar: getImagePath('Team Pic/Female/maimoona.jpg'),
    bio: 'Assists with venue designs, coordinate schedules, and stage logistics during large campaigns.',
    skills: ['Aesthetic Coordination', 'Creative Design', 'Team Collaboration'],
    socials: {},
    premium: false,
  },

  {
    id: 'team-15',
    name: 'Areesh Tahir',
    role: 'Graphic Designers Lead ',
    department: 'Design & Media',
    avatar: getImagePath('Team Pic/Areesh Tahir.png'),
    bio: 'Leads the design of all digital and print media, including event posters, social media graphics, and merchandise designs.',
    skills: ['Graphic Design', 'Adobe Creative Suite', 'Branding', 'Visual Storytelling'],
    socials: {},
    premium: false,
  },

  {
    id: 'team-16', 
    name: 'Muhammad Abdullah ',
    role: 'Graphic Designers CO-Lead ',
    department: 'Design & Media',
    avatar: getImagePath('Team Pic/Muhammad Abdullah .png'),
    bio: 'Leads the design of all digital and print media, including event posters, social media graphics, and merchandise designs.',
    skills: ['Graphic Design', 'Adobe Creative Suite', 'Branding', 'Visual Storytelling'],
    socials: {},
    premium: false,
  },



  {
    id: 'team-17',
    name: 'Shandana Qadir(Amal khan)',
    role: 'Graphic Designer',
    department: 'Design & Media',
    avatar: getImagePath('Team Pic/Shandana Qadir.jfif'),
    bio: 'Designs high-fidelity banners, typography templates, and customized apparel merchandise graphics.',
    skills: ['Figma', 'Vector Art', 'Branding Guidelines', 'Motion Aesthetics'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  
  {
    id: 'team-18',
    name: 'Hamad Khan',
    role: 'Technical CO-Lead',
    department: 'Technical',
    avatar: getImagePath('Team Pic/Hamad Khan.jpg'),
    bio: 'Co-leads technical workshops, manages coding bootcamps, and mentors students in AI and web development.',
    skills: ['Technical Leadership', 'Curriculum Design', 'Code Review', 'Mentorship'],
    socials: {},
    premium: false,
  },
  {
    id: 'team-19',
    name: 'Saad Ahmed',
    role: 'Media',
    department: 'Media',
    avatar: getImagePath('Team Pic/saad.jpeg'),
    bio: 'Manages social media channels, creates promotional content, and engages with the online community to boost event visibility.',
    skills: ['Social Media Management', 'Content Creation', 'Community Engagement', 'Event Promotion'],
    socials: { github: 'https://github.com' },
    premium: true,
  },


  {
    id: 'team-20',
    name: 'Naveed Abbas',
    role: 'Teacher Advisor',
    department: 'Administration',
    avatar: getImagePath('Team Pic/Navved.png'),
    bio: 'Academic mentor guiding Sociapi on institutional policies, compliance, and academic integration.',
    skills: ['Academic Governance', 'Policy Advisory', 'Institutional Relations'],
    socials: { email: 'naveed@iup.edu.pk' },
    premium: true,
  },
];

// ============================================================
// GALLERY
// ============================================================

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Mehfil AI 2026 - Grand Opening',
    category: 'Seminar',
    imageUrl: getImagePath('Mehfil_AI.png'),
    date: '07 May 2026',
    description: 'The grand opening ceremony of Mehfil AI 2026 at Khyber Union Hall, Islamia University Peshawar with 500+ attendees.'
  },
  {
    id: 'gal-2',
    title: 'AGENTUM 2026 - AI Agents Session',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum blog.png'),
    date: '17 Feb 2026',
    description: 'Keynote presentation on AI Agents and Automation during the AGENTUM 2026 seminar.'
  },
  {
    id: 'gal-3',
    title: 'Workshop Session 1',
    category: 'Workshops',
    imageUrl: getImagePath('1.png'),
    date: 'Feb 2026',
    description: 'Hands-on workshop session with students engaged in learning activities.'
  },
  {
    id: 'gal-4',
    title: 'Workshop Session 2',
    category: 'Workshops',
    imageUrl: getImagePath('2.png'),
    date: 'Feb 2026',
    description: 'Interactive demonstration during technical workshop.'
  },
  {
    id: 'gal-5',
    title: 'Community Gathering 1',
    category: 'Community',
    imageUrl: getImagePath('3.png'),
    date: 'Feb 2026',
    description: 'Students networking and sharing ideas at community meetup.'
  },
  {
    id: 'gal-6',
    title: 'Community Gathering 2',
    category: 'Community',
    imageUrl: getImagePath('4.png'),
    date: 'Feb 2026',
    description: 'Group photo from Sociapi community event.'
  },
  {
    id: 'gal-7',
    title: 'Hackathon Event 1',
    category: 'Hackathons',
    imageUrl: getImagePath('5.png'),
    date: 'Feb 2026',
    description: 'Teams working together during coding hackathon.'
  },
  {
    id: 'gal-8',
    title: 'Project Showcase',
    category: 'Projects',
    imageUrl: getImagePath('6.png'),
    date: 'Feb 2026',
    description: 'Student projects on display during exhibition.'
  },
  {
    id: 'gal-9',
    title: 'Panel Discussion',
    category: 'Seminar',
    imageUrl: getImagePath('7.png'),
    date: 'Feb 2026',
    description: 'Expert panel discussion with industry professionals.'
  },
  {
    id: 'gal-10',
    title: 'Networking Session',
    category: 'Community',
    imageUrl: getImagePath('8.png'),
    date: 'Feb 2026',
    description: 'Students networking with speakers and mentors.'
  },
  {
    id: 'gal-11',
    title: 'AGENTUM Session 1',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/0001.jpg'),
    date: '17 Feb 2026',
    description: 'AGENTUM seminar technical session.'
  },
  {
    id: 'gal-12',
    title: 'AGENTUM Session 2',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/6.jpg'),
    date: '17 Feb 2026',
    description: 'Students listening to speaker during AGENTUM.'
  },
  {
    id: 'gal-13',
    title: 'AGENTUM Session 3',
    category: 'Workshops',
    imageUrl: getImagePath('Agentum Pic/7.jpeg'),
    date: '17 Feb 2026',
    description: 'Interactive workshop during AGENTUM seminar.'
  },
  {
    id: 'gal-14',
    title: 'AGENTUM Details 1',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/12.png'),
    date: '17 Feb 2026',
    description: 'Close-up from AGENTUM presentation.'
  },
  {
    id: 'gal-15',
    title: 'AGENTUM Details 2',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/13.png'),
    date: '17 Feb 2026',
    description: 'Another moment from AGENTUM event.'
  },
  {
    id: 'gal-16',
    title: 'AGENTUM Gallery 1',
    category: 'Community',
    imageUrl: getImagePath('Agentum Pic/15.jfif'),
    date: '17 Feb 2026',
    description: 'Group gathering during AGENTUM seminar.'
  },
  {
    id: 'gal-17',
    title: 'AGENTUM Speaker - Khyzar',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/Khyzar Hayat.png'),
    date: '17 Feb 2026',
    description: 'Khyzar Hayat delivering keynote on AI agents.'
  },
  {
    id: 'gal-18',
    title: 'AGENTUM Speaker - Mustafa',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/mustafa.png'),
    date: '17 Feb 2026',
    description: 'Mustafa Khan speaking on Automation & Robotics.'
  },
  {
    id: 'gal-19',
    title: 'AGENTUM Speaker - Uzair',
    category: 'Seminar',
    imageUrl: getImagePath('Agentum Pic/uzair.png'),
    date: '17 Feb 2026',
    description: 'Muhammad Uzair discussing AI for Everyone.'
  },
  {
    id: 'gal-20',
    title: 'AGENTUM Full Hall',
    category: 'Community',
    imageUrl: getImagePath('Agentum Pic/IMG_6010.png'),
    date: '17 Feb 2026',
    description: 'Full auditorium during AGENTUM 2026 seminar.'
  },
];

// ============================================================
// BLOGS
// ============================================================

export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mehfil AI 2026 Successfully Inspired Future Tech Leaders in Peshawar',
    subtitle: 'A full recap of the landmark AI gathering held at Islamia University Peshawar on May 07, 2026.',
    content: `# Mehfil AI 2026 Successfully Inspired Future Tech Leaders in Peshawar

Artificial Intelligence is rapidly changing the future of education, careers, startups, and businesses around the world. To help students understand and explore this fast-growing field, **Sociapi Society** successfully organized Mehfil AI 2026 on 07 May 2026 at Islamia University, Peshawar.

The event became one of the most engaging student-led AI gatherings in Peshawar, bringing together students, developers, freelancers, entrepreneurs, and technology enthusiasts under one platform. Mehfil AI 2026 created an inspiring environment focused on learning, innovation, networking, and practical exposure to modern technology.

With more than **151 participants**, expert speakers, experienced panelists, active student volunteers, sponsors, and community partners, the event delivered valuable insights into Artificial Intelligence, freelancing, startups, career growth, and future technology trends.

## Event Overview
Mehfil AI 2026 was organized with the goal of spreading awareness about Artificial Intelligence and helping students learn practical skills that can support their future careers. The event encouraged students to connect directly with professionals and understand the real-world applications of AI technologies.

## Key Sessions
- AI and technology talks
- Startup and freelancing discussions
- Interactive panel discussions
- Networking opportunities
- Student engagement sessions`,
    author: 'Muhammad Zuhair Zeb',
    authorRole: 'Founder',
    date: 'May 07, 2026',
    readTime: '6 min read',
    category: 'Generative AI',
    tags: ['Mehfil AI', 'Peshawar', 'Future Tech'],
    imageUrl: getImagePath('Mehfil_AI.png'),
    views: 289
  },
  {
    id: 'blog-2',
    title: 'Agentum 2026 Seminar: AI Agents & Automation Sprints',
    subtitle: 'A full overview of the AGENTUM seminar held on 17 February 2026.',
    content: `# Agentum 2026 Seminar

The **AGENTUM 2026 Seminar** was successfully held on 17 February 2026, bringing together students, tech enthusiasts, and future innovators to learn about the latest developments in Artificial Intelligence and modern technology. The event attracted more than **150 participants**, creating an energetic environment filled with learning, discussion, and inspiration.

## Technical Sessions

### 1. Agent Factory: Building Intelligent AI Systems
Khizer Hayat introduced the concept of Agent Factory and intelligent AI systems. He explained how AI agents are designed to perform tasks, make decisions, and interact with digital environments.

### 2. Automation and Robotics
Mustafa Khan spoke about automation and robotics. He explained how automation is transforming industries by improving efficiency and reducing manual work.

### 3. AI for Everyone
Muhammad Uzair focused on making Artificial Intelligence simple and accessible for all students, even those who do not come from a strong technical background.

## Conclusion
The AGENTUM 2026 Seminar was a successful and impactful event that helped students understand the importance of Artificial Intelligence, automation, and robotics in the modern world.`,
    author: 'Muhammad Zuhair Zeb',
    authorRole: 'Founder',
    date: 'Feb 17, 2026',
    readTime: '4 min read',
    category: 'Robotics & AI',
    tags: ['Agentum', 'Automation', 'Robotics'],
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&fit=crop&q=80',
    views: 194
  }
];

// ============================================================
// EVENTS
// ============================================================

export const initialEvents: EventItem[] = [
  {
    id: 'event-1',
    title: 'Mehfil AI 2026 Event',
    description: 'Mehfil AI 2026 Successfully Inspired Future Tech Leaders in Peshawar.',
    longDescription: 'Artificial Intelligence is rapidly changing the future of education, careers, startups, and businesses around the world. To help students understand and explore this fast-growing field, Sociapi Society successfully organized Mehfil AI 2026 on 07 May 2026 at Islamia University, Peshawar. The event became one of the most engaging student-led AI gatherings in Peshawar, bringing together students, developers, freelancers, entrepreneurs, and technology enthusiasts under one platform. With more than 151 participants, expert speakers, and panelists, the event delivered valuable insights into Artificial Intelligence, freelancing, and career growth.',
    date: '07 May 2026',
    time: '10:00 AM - 04:00 PM',
    location: 'Islamia University Peshawar',
    category: 'Past',
    imageUrl: getImagePath('Mehfil_AI.png'),
    speaker: {
      name: 'Abdul Wahid / Junaid Ahmad',
      role: 'Keynote Speakers & Entrepreneurs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80'
    },
    schedule: [
      { time: '10:00 AM', activity: 'AI and technology talks' },
      { time: '12:00 PM', activity: 'Startup and freelancing discussions' },
      { time: '02:00 PM', activity: 'Interactive panel discussions' },
      { time: '04:00 PM', activity: 'Networking and Closing Remarks' }
    ],
    registeredCount: 151
  },
  {
    id: 'event-2',
    title: 'AGENTUM 2026 Seminar',
    description: 'AI agents, automation, and robotics seminar targeting future innovators.',
    longDescription: 'The AGENTUM 2026 Seminar was successfully held on 17 February 2026, bringing together students, tech enthusiasts, and future innovators to learn about the latest developments in Artificial Intelligence and modern technology. The event attracted more than 150 participants, creating an energetic environment filled with learning, discussion, and inspiration.',
    date: '17 February 2026',
    time: '11:00 AM - 03:00 PM',
    location: 'Islamia University Peshawar',
    category: 'Past',
    imageUrl: getImagePath('Agentum blog.png'),
    speaker: {
      name: 'Khizer Hayat / Mustafa Khan / Muhammad Uzair',
      role: 'Instructors & AI developers',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&h=200&fit=crop&q=80'
    },
    schedule: [
      { time: '11:00 AM', activity: 'Agent Factory: Intelligent AI Systems' },
      { time: '12:30 PM', activity: 'Automation and Robotics Schedulers' },
      { time: '02:00 PM', activity: 'AI for Everyone' }
    ],
    registeredCount: 150
  }
];

// ============================================================
// MERCHANDISE
// ============================================================

export const initialMerch: MerchItem[] = [
  {
    id: 'merch-1',
    name: 'SOCIAPI OverSized Male Shirt',
    price: 1500,
    category: 'T-Shirt',
    imageUrl: getImagePath('OVERSIZED Male.png'),
    description: 'Part of our 3 official launch shirts. Made with 100% premium soft cotton and detailed with custom back text print.',
    details: ['100% Cotton', 'Wash-resistant decals', 'Limited launch edition'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'merch-2',
    name: 'SOCIAPI OverSized shirt for females',
    price: 1500,
    category: 'T-Shirt',
    imageUrl: getImagePath('OVERSIZED Female.png'),
    description: 'Part of our 3 official launch shirts. Engineered for programmers and data analysts.',
    details: ['Double stitched seams', 'Modern dark green accent color', 'Breathable weave'],
    sizes: ['M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'merch-3',
    name: 'SOCIAPI Special Edition Shirt',
    price: 1500,
    category: 'T-Shirt',
    imageUrl: getImagePath('OVERSIZED 3.png'),
    description: 'Part of our 3 official launch shirts. A special edition commemorating the journey from Swabi to Peshawar.',
    details: ['Lightweight summer fabric', 'Custom graphics on chest', 'Unisex modern fit'],
    sizes: ['S', 'M', 'L'],
    inStock: true
  }
];

// ============================================================
// REVIEWS & TESTIMONIALS
// ============================================================

export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Hamza Khan',
    role: 'HR Manager',
    review: 'Sociapi is a great platform that encourages creativity, teamwork, and professional growth. Being part of this society as an HR has been a wonderful experience. It provides opportunities for students to learn, collaborate, and develop valuable skills. Proud to be a part of Sociapi!',
    rating: 5,
    avatar: getImagePath('Team Pic/Hamza Khan.jpg'),
    tag: 'HR Manager Review'
  },
  {
    id: 'rev-2',
    name: 'Farhan',
    role: 'Outreach Team member',
    review: 'Sociapi Society is a great initiative for students interested in technology, innovation, and learning new skills. The society actively organizes seminars, workshops, and collaborative activities that help students explore modern fields like artificial intelligence and emerging technologies. What makes Sociapi Society special is its commitment to teamwork, professionalism, and creating opportunities for students to grow beyond the classroom. It provides a platform where motivated students can connect, learn from experts, and develop practical knowledge. Overall, Sociapi Society is doing an excellent job in promoting innovation, skill development, and a strong learning community among students. Highly recommended for anyone who wants to grow in the tech and innovation space!',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=80',
    tag: 'Outreach Review'
  }
];

// ============================================================
// FAQs
// ============================================================

export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Sociapi Society?',
    answer: 'Sociapi Society is a student-led community based at Islamia University Peshawar. We help students turn ideas into skills and skills into real-world projects through workshops, bootcamps, and collaborative learning.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I join Sociapi Society?',
    answer: 'You can join by attending one of our workshops or events, or by filling out the careers form on our website. We welcome all skill levels!',
    category: 'Membership'
  },
  {
    id: 'faq-3',
    question: 'What topics do you cover?',
    answer: 'We focus on AI, Machine Learning, Web Development, Data Science, Robotics, and general technology skills. Check our events page for upcoming workshops!',
    category: 'Workshops'
  },
  {
    id: 'faq-4',
    question: 'How do I contact the team?',
    answer: 'You can email us at sociapisociety@gmail.com or info.sociapi@gmail.com, or call us at +923329984490.',
    category: 'General'
  },
  {
    id: 'faq-5',
    question: 'Are there volunteer opportunities?',
    answer: 'Yes! We have various volunteer roles in Operations, Design & Media, Technical, and Administration. Check the Careers page for open positions.',
    category: 'Membership'
  }
];

// ============================================================
// CAREERS / VOLUNTEER ROLES
// ============================================================

export const initialCareers: CareerItem[] = [
  {
    id: 'car-1',
    title: 'Organizer',
    department: 'Operations',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Islamia University Peshawar',
    description: 'Coordinate venue bookings, stage decorations, and timelines for seminars and bootcamps.',
    requirements: ['Good communication skills', 'Reliable coordination capability'],
    benefits: ['Leadership certificate']
  },
  {
    id: 'car-2',
    title: 'Graphic Designer',
    department: 'Design & Media',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Hybrid',
    description: 'Design digital posters, banners, and launch templates for social networks.',
    requirements: ['Basic Figma or Illustrator knowledge'],
    benefits: ['Design team portfolio credit']
  },
  {
    id: 'car-3',
    title: 'Media Team Member',
    department: 'Design & Media',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Peshawar Campus',
    description: 'Capture high-quality visual logs and write event recap descriptions.',
    requirements: ['Interests in camera operations or copywriting'],
    benefits: ['Press pass clearance']
  },
  {
    id: 'car-4',
    title: 'Outreach Team Member',
    department: 'Operations',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Peshawar Campus',
    description: 'Manage outreach invites to panels, partners, and guest lectures.',
    requirements: ['Interest in PR coordination'],
    benefits: ['Strategic networks access']
  },
  {
    id: 'car-5',
    title: 'Decor Team Member',
    department: 'Operations',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Peshawar Campus',
    description: 'Assist the Decor Lead in stage styling and event aesthetics.',
    requirements: ['Creative eye and operational diligence'],
    benefits: ['Event entry access']
  },
  {
    id: 'car-6',
    title: 'Technical Team Member',
    department: 'Technical',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Hybrid',
    description: 'Collaborate on coding bootcamps, git sprints, and OpenCV labs.',
    requirements: ['Understanding of Python or JavaScript'],
    benefits: ['Mentorship from AI Leads']
  },
  {
    id: 'car-7',
    title: 'Logistics Team Member',
    department: 'Operations',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Peshawar Campus',
    description: 'Coordinate campus resources, credentials lists, and seat registrations.',
    requirements: ['Detail-oriented scheduling'],
    benefits: ['Operational leadership certification']
  },
  {
    id: 'car-8',
    title: 'Finance Team Member',
    department: 'Administration',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Peshawar Campus',
    description: 'Track society budget records, apparel orders, and sponsor receipts.',
    requirements: ['Organized spreadsheets coordination'],
    benefits: ['Financial audit experience']
  },
  {
    id: 'car-9',
    title: 'HR Team Member',
    department: 'Administration',
    type: 'Volunteer',
    duration: 'Ongoing',
    location: 'Peshawar Campus',
    description: 'Assist the HR Manager in coordination and onboarding schedules.',
    requirements: ['Human Resources interests'],
    benefits: ['Administrative experience']
  }
];

// ============================================================
// CONTACT & PARTNERSHIPS (empty by default)
// ============================================================

export const initialContacts: ContactMessage[] = [];
export const initialPartnerships: PartnershipInquiry[] = [];
