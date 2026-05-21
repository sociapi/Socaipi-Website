// CENTRALIZED SOCIAPI DATABASE FILE
// Modify values below to instantly update the website layout and statistics.

// Helper function to import images correctly for Vite bundling
const importImage = (path: string): string => {
  return new URL(`../Image/${path}`, import.meta.url).href;
};

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

// ----------------------------------------------------
// GLOBAL SITE BRANDING & STATISTICS
// ----------------------------------------------------
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

export const initialSettings: SiteSettings = {
  logoUrl: importImage('ss.png'), // Add image path to display a custom logo
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

// ----------------------------------------------------
// TEAM MEMBERS LIST (Exact custom request)
// ----------------------------------------------------
export const initialTeam: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Muhammad Zuhair Zeb',
    role: 'Founder',
    department: 'Leadership',
    avatar: importImage('Team Pic/Zuhair.jpeg'),
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
    avatar: importImage('Team Pic/Muhammad Mudassir.jpg'),
    bio: 'Co-Founder of Sociapi Society. Partner in coordinating technical workflows, managing study sprints, and scaling campus machine learning cohorts.',
    skills: ['Python', 'Deep Learning', 'Project Orchestration', 'Team Synergy'],
    socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    premium: true,
  },
  {
    id: 'team-3',
    name: 'Hamza khan',
    role: 'HR manager',
    department: 'Administration',
    avatar: importImage('Team Pic/Hamza Khan.jpg'),
    bio: 'Directs society personnel logistics, coordinator matching, and interview pipelines for junior technical leads.',
    skills: ['Human Resources', 'Teamwork', 'Communication', 'Recruitment'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-4',
    name: 'Sajid Ullah',
    role: 'Outreach',
    department: 'Operations',
    avatar: importImage('Team Pic/Saجid_waزir.png'),
    bio: 'Leads communications with external tech communities, sponsors, and guest lecturers across Peshawar.',
    skills: ['Outreach', 'Networking', 'Public Relations', 'Events Marketing'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-5',
    name: 'Muhammad Faisal',
    role: 'Video Editor',
    department: 'Design & Media',
    avatar: importImage('Team Pic/Faisal Khan.png'),
    bio: 'Crafts premium digital reels, speaker promotional reels, and event wrap-up motion graphics.',
    skills: ['Premiere Pro', 'After Effects', 'Cinematic Cuts', 'Sound Design'],
    socials: { github: 'https://github.com' },
    premium: false,
  },
  {
    id: 'team-6',
    name: 'Asiya Islam',
    role: 'Women Lead',
    department: 'Leadership',
    avatar: importImage('Team Pic/Female/Asiya Islam.png'),
    bio: 'Empowering and mentoring women developers at Islamia University, Peshawar, bridging STEM training gaps.',
    skills: ['Mentorship', 'Web Dev', 'Public Speaking', 'STEM Outreach'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: true,
  },
  {
    id: 'team-7',
    name: 'Maham Iqbal',
    role: 'Women CO-Lead',
    department: 'Leadership',
    avatar: importImage('Team Pic/Female/Maham Iqbal.png'),
    bio: 'Co-leads STEM initiatives, event coordination, and junior study groups for female engineering students.',
    skills: ['Coordination', 'Project Management', 'UI Design', 'Data Entry'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-8',
    name: 'Alina Kalim',
    role: 'Decor Lead',
    department: 'Operations',
    avatar: importImage('Team Pic/Female/Alina khan.JPG'),
    bio: 'Orchestrates the visual layout and stage design of tech seminars, ensuring a premium futuristic atmosphere.',
    skills: ['Venue Styling', 'Theme Design', 'Visual Aesthetics', 'Logistics'],
    socials: {},
    premium: false,
  },
  {
    id: 'team-9',
    name: 'Maimoona Iqbal',
    role: 'Decor',
    department: 'Operations',
    avatar: importImage('Team Pic/Female/maimoona.jpg'),
    bio: 'Assists with venue designs, coordinate schedules, and stage logistics during large campaigns.',
    skills: ['Aesthetic Coordination', 'Creative Design', 'Team Collaboration'],
    socials: {},
    premium: false,
  },
  {
    id: 'team-10',
    name: 'Shandana Qadir(Amal khan)',
    role: 'Graphic co-Lead',
    department: 'Design & Media',
    avatar: importImage('Team Pic/Shandana Qadir.jfif'),
    bio: 'Designs high-fidelity banners, typography templates, and customized apparel merchandise graphics.',
    skills: ['Figma', 'Vector Art', 'Branding Guidelines', 'Motion Aesthetics'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-11',
    name: 'Bilal Muhammad',
    role: 'General Secretary',
    department: 'Leadership',
    avatar: importImage('Team Pic/Bilal Muhammad.jpg'),
    bio: 'Manages administrative files, registrations database, and correspondence with university management.',
    skills: ['Administration', 'Strategic Planning', 'Technical Documentation'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: true,
  },
  {
    id: 'team-12',
    name: 'Muhammad Zakria',
    role: 'Project Manger',
    department: 'Technical',
    avatar: importImage('Team Pic/Muhammad Zakria.jpg'),
    bio: 'Directs open-source projects, reviews developer repositories, and coordinates git branches.',
    skills: ['Git Sprints', 'Project Schedulers', 'Python Scripting', 'Code Audits'],
    socials: { github: 'https://github.com' },
    premium: false,
  },
  {
    id: 'team-13',
    name: 'Muhammad zulkifal',
    role: 'Event Manger',
    department: 'Operations',
    avatar: importImage('Team Pic/Muhammad Zulkifal (Event Manger).jpg'),
    bio: 'Supervises venue bookings, coordinator rosters, guest welcome lists, and registration desks.',
    skills: ['Event Logistics', 'Crowd Schedulers', 'Operations Lead'],
    socials: { linkedin: 'https://linkedin.com' },
    premium: false,
  },
  {
    id: 'team-14',
    name: 'Muhammad Hammad khan',
    role: 'Technical co-lead',
    department: 'Technical',
    avatar: importImage('Team Pic/Hamad Khan.jpg'),
    bio: 'Instructs bootcamps on Next.js, OpenCV setups, and trains junior developers in clean code practices.',
    skills: ['Full Stack Development', 'React', 'OpenCV', 'Algorithms'],
    socials: { github: 'https://github.com' },
    premium: true,
  },
  {
    id: 'team-15',
    name: 'Muhammad Saad',
    role: 'Media',
    department: 'Design & Media',
    avatar: importImage('Team Pic/saad.jpeg'),
    bio: 'Captures photography during live speaker sessions and writes technical recap columns for our social platforms.',
    skills: ['Photography', 'Social Outreach', 'Copywriting'],
    socials: {},
    premium: false,
  }
];

// Teacher Advisor Bio
export const teacherAdvisor = {
  name: 'Naveed Abbas',
  role: 'Teacher Advisor',
  avatar: importImage('Team Pic/Navved.png'),
  bio: 'Guides Sociapi Society on institutional guidelines, academic integrations, and community mentoring pipelines.'
};

// ----------------------------------------------------
// GALLERY ARCHIVES
// ----------------------------------------------------
export const initialGallery: GalleryItem[] = Array.from({ length: 20 }).map((_, index) => {
  const categories: GalleryItem['category'][] = ['Workshops', 'Seminars', 'Seminars', 'Community', 'Projects'];
  const category = categories[index % categories.length];
  const itemNum = index + 1;
  return {
    id: `gallery-${itemNum}`,
    title: `${category} Image Log #${itemNum}`,
    category,
    imageUrl: `src//Image/Agentum Pic/IMG_6010.png`,
    
    date: '2026-05-07',
    description: 'Visual evidence capturing technical education, mentorship, and developer collaboration during active campaigns.'
  };
});

// Overwrite first few gallery pictures with relevant technology images
const techImages = [
  importImage('1.png'),
  importImage('2.png'),
  importImage('3.png'),
  importImage('4.png'),
  importImage('5.png'),
  importImage('6.png'),
  importImage('7.png'),
  importImage('8.png'),
  importImage('9.png'),
  importImage('10.png'),
  importImage('Agentum Pic/0001.jpg'),
  importImage('Agentum Pic/6.jpg'),
  importImage('Agentum Pic/7.jpeg'),
  importImage('Agentum Pic/12.png'),
  importImage('Agentum Pic/13.png'),
  importImage('Agentum Pic/15.jfif'),
  importImage('Agentum Pic/Khyzar Hayat.png'),
  importImage('Agentum Pic/mustafa.png'),
  importImage('Agentum Pic/uzair.png'),
  importImage('Agentum Pic/IMG_6010.png'),
];
techImages.forEach((img, idx) => {
  if (initialGallery[idx]) {
    initialGallery[idx].imageUrl = img;
  }
});

// ----------------------------------------------------
// BLOG ARTICLES & EVENTS (Mehfil AI & Agentum request)
// ----------------------------------------------------
export const initialBlogs: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Mehfil AI 2026 Successfully Inspired Future Tech Leaders in Peshawar',
    subtitle: 'A full recap of the landmark AI gathering held at Islamia University Peshawar on May 07, 2026.',
    content: `# Mehfil AI 2026 Successfully Inspired Future Tech Leaders in Peshawar

Artificial Intelligence is rapidly changing the future of education, careers, startups, and businesses around the world. To help students understand and explore this fast-growing field, **Sociapi Society** successfully organized Mehfil AI 2026 on 07 May 2026 at Islamia University, Peshawar.

The event became one of the most engaging student-led AI gatherings in Peshawar, bringing together students, developers, freelancers, entrepreneurs, and technology enthusiasts under one platform. Mehfil AI 2026 created an inspiring environment focused on learning, innovation, networking, and practical exposure to modern technology.

With more than **151 participants**, expert speakers, experienced panelists, active student volunteers, sponsors, and community partners, the event delivered valuable insights into Artificial Intelligence, freelancing, startups, career growth, and future technology trends.

---

## Event Overview
Mehfil AI 2026 was organized with the goal of spreading awareness about Artificial Intelligence and helping students learn practical skills that can support their future careers. The event encouraged students to connect directly with professionals and understand the real-world applications of AI technologies.

* **Event Name**: Mehfil AI 2026
* **Date**: 07 May 2026
* **Organized By**: Sociapi Society
* **Venue**: Islamia University Peshawar
* **Participants**: 151+
* **Sociapi Society Members**: 25
* **Speakers**: 2
* **Panelists**: 3

The event included several engaging activities, such as:
1. AI and technology talks
2. Startup and freelancing discussions
3. Interactive panel discussions
4. Networking opportunities
5. Student engagement sessions

The audience remained highly active throughout the event and showed strong interest in Artificial Intelligence, freelancing opportunities, startup culture, and technology-based careers.

---

## Expert Speaker Sessions
One of the major highlights of Mehfil AI 2026 was the insightful speaker sessions delivered by experienced professionals who shared practical knowledge and career guidance with students.

### Abdul Wahid: Leveraging AI Tools for Financial Gains
Abdul Wahid delivered an informative session about the growing impact of AI tools in freelancing and online earning opportunities. He explained how students and professionals can use Artificial Intelligence tools to improve productivity, automate repetitive tasks, and build additional income streams.

He discussed practical ways AI is helping freelancers work smarter and complete projects more efficiently. His session motivated students to learn modern AI tools and develop digital skills that can support freelancing careers and online businesses.

### Junaid Ahmad: Starting a Startup with AI: Idea to Launch
Junaid Ahmad shared valuable knowledge about launching AI-based startups and turning innovative ideas into real products. His talk focused on entrepreneurship, creativity, teamwork, and problem-solving using modern technology.

He explained the journey of building a startup from the initial idea stage to launching a product in the market. Students learned how Artificial Intelligence can help solve real-world problems and create business opportunities in different industries.

---

## Interactive Panel Discussion Session
The panel discussion session became one of the most engaging and memorable parts of Mehfil AI 2026. Students had the opportunity to interact directly with industry professionals and hear honest discussions about life after university, career struggles, industry expectations, and professional growth.

> **Panel Topic**: The Real Talk: Uni to Life From Campus to Reality Unfiltered Uni Diaries Beyond the Degree

The discussion focused on the challenges students face after graduation and the importance of skill development, confidence, networking, and continuous learning.

### Panelists:
* **Hafeez Ahmad**: Lecturer in the Department of Computer Science and also works as an AI Engineer at Wibbow Technologies.
* **Ziaullah Khattak**: Co-Founder and CTO of Software Synergy Solutions and Club.
* **Fazal Wahid**: AI Engineer based in Peshawar and currently works as an Associate AI Engineer at Tech Emulsion.

---

## Sponsors and Community Partners
The success of Mehfil AI 2026 became possible because of the support of sponsors and community partners who contributed to the event and helped create a professional learning environment for students.

 Sponsors: K MAK MARKETING, Global Pathway
* **Community Partners**: Software Synergy Club, TechLink, Elarion, AWS UOP, Farabi`,
    author: 'Muhammad Zuhair Zeb',
    authorRole: 'Founder',
    date: 'May 07, 2026',
    readTime: '6 min read',
    category: 'Generative AI',
    tags: ['Mehfil AI', 'Peshawar', 'Future Tech'],
    imageUrl: importImage('محفلAi.png'),
    views: 289
  },
  {
    id: 'blog-2',
    title: 'Agentum 2026 Seminar: AI Agents & Automation Sprints',
    subtitle: 'A full overview of the AGENTUM seminar held on 17 February 2026.',
    content: `# Agentum 2026 Seminar

The **AGENTUM 2026 Seminar** was successfully held on 17 February 2026, bringing together students, tech enthusiasts, and future innovators to learn about the latest developments in Artificial Intelligence and modern technology. The event attracted more than **150 participants**, creating an energetic environment filled with learning, discussion, and inspiration.

The seminar focused on three important topics related to the future of AI, automation, and robotics. Each session was delivered by experienced speakers who shared practical insights and real world knowledge with the audience.

---

## Technical Sessions

### 1. Agent Factory: Building Intelligent AI Systems
* **Speaker**: Khizer Hayat
Khizer Hayat introduced the concept of Agent Factory and intelligent AI systems. He explained how AI agents are designed to perform tasks, make decisions, and interact with digital environments.

During the talk, the audience learned how modern AI systems are built using intelligent agents that can work together to solve complex problems. Khizer Hayat also discussed the future of agent based systems and how they can be used in different industries such as business, education, and technology.

### 2. Automation and Robotics
* **Speaker**: Mustafa Khan
Mustafa Khan spoke about automation and robotics. He explained how automation is transforming industries by improving efficiency and reducing manual work.

Mustafa Khan shared examples of how robots and automated systems are being used in manufacturing, healthcare, logistics, and many other sectors. He also discussed how robotics is connected with Artificial Intelligence and how these technologies are shaping the future of work.

### 3. AI for Everyone
* **Speaker**: Muhammad Uzair
His talk focused on making Artificial Intelligence simple and accessible for all students, even those who do not come from a strong technical background.

He explained how AI tools are becoming easier to use and how students can apply them in education, freelancing, research, and daily life. The session encouraged students to start learning AI and explore the many opportunities available in the field.

---

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
    imageUrl: importImage('محفلAi.png'),
    speaker: {
      name: 'Abdul Wahid / Junaid Ahmad',
      role: 'Keynote Speakers & Entrepreneurs',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&q=80'
    },
    schedule: [
      { time: '10:00 AM', activity: 'AI and technology talks' },
      { time: '12:00 PM', activity: 'Startup and freelancing discussions' },
      { time: '02:00 PM', activity: 'Interactive panel discussions' }
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
    imageUrl: importImage('Agentum blog.png'),
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

// ----------------------------------------------------
// MERCHANDISE (3 shirts launching soon request)
// ----------------------------------------------------
export const initialMerch: MerchItem[] = [
  {
    id: 'merch-1',
    name: 'SOCIAPI OverSized Male Shirt',
    price: 1500,
    category: 'T-Shirt',
    imageUrl: importImage('OVERSIZED Male.png'),
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
    imageUrl: importImage('OVERSIZED Female.png'),
    description: 'Part of our 3 official launch shirts. Engineered for programmers and data analysts.',
    details: ['Double stitched seams', 'Modern dark green accent color', 'Breathable weave'],
    sizes: ['M', 'L', 'XL'],
    inStock: true
  },
  {
    id: 'merch-3',
    name: 'SOCIAPI  Shirt',
    price: 1500,
    category: 'T-Shirt',
    imageUrl: importImage('OVERSIZED 3.png'),
    description: 'Part of our 3 official launch shirts. A special edition commemorating the journey from Swabi to Peshawar.',
    details: ['Lightweight summer fabric', 'Custom graphics on chest', 'Unisex modern fit'],
    sizes: ['S', 'M', 'L'],
    inStock: true
  }
];

// ----------------------------------------------------
// STUDENT TESTIMONIALS (Exact custom request)
// ----------------------------------------------------
export const initialReviews: ReviewItem[] = [
  {
    id: 'rev-1',
    name: 'Hamza Khan',
    role: 'HR Manager',
    review: 'Sociapi is a great platform that encourages creativity, teamwork, and professional growth. Being part of this society as an HR has been a wonderful experience. It provides opportunities for students to learn, collaborate, and develop valuable skills. Proud to be a part of Sociapi!',
    rating: 5,
    avatar: importImage('Team Pic/Hamza Khan.jpg'),
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

// FAQs
export const initialFAQs: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'What is Sociapi Society?',
    answer: 'Sociapi Society is a student-led community based at Islamia University Peshawar. We help students turn ideas into skills and skills into real-world projects.',
    category: 'General'
  },
  {
    id: 'faq-2',
    question: 'How do I contact the team?',
    answer: 'You can email us at sociapisociety@gmail.com / info.sociapi@gmail.com, or call us at +923329984490.',
    category: 'General'
  }
];

// Open Volunteer roles
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

export const initialContacts: ContactMessage[] = [];
export const initialPartnerships: PartnershipInquiry[] = [];

