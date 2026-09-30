// All portfolio content lives here. Edit this file to update the site.

export const profile = {
  name: "Prem S",
  roles: ["Software Development Engineer", "Mobile App Developer (Flutter)", "Java Full Stack Developer", "Cloud Engineer (AWS)"],
  location: "Coimbatore, Tamil Nadu, India",
  email: "selvaraj3805@gmail.com",
  phone: "+91 87786 42535",
  github: "https://github.com/kingprem12",
  linkedin: "https://www.linkedin.com/in/prem-s-12626b309/",
  resume: "assets/Prem_S_Resume.pdf",
  summary:
    "I build products end to end: Flutter apps that ship to the App Store and Play Store, Spring Boot, Laravel and Node.js services, React frontends, and the AWS infrastructure they run on. I like backend systems that scale, interfaces that stay out of the way, and turning research models into tools people can actually use.",
};

export const stats = [
  { value: 5, label: "Live apps on App Store & Play Store" },
  { value: 8.43, decimals: 2, label: "CGPA · B.E. CSE (IoT)" },
  { value: 300, suffix: "+", label: "LeetCode problems solved" },
  { value: 1, prefix: "#", label: "GDG Hackathon, 100+ teams" },
  ];

export const skills = [
  { group: "Languages", items: ["Java", "JavaScript", "TypeScript", "SQL", "Python", "C++"] },
  { group: "Backend", items: ["Spring Boot", "Spring Security", "Spring AI", "Node.js", "Express", "Laravel (PHP)", "FastAPI", "REST APIs", "WebSocket", "JWT"] },
  { group: "Mobile", items: ["Flutter", "Dart", "GetX", "Firebase Cloud Messaging", "Google Maps SDK", "App Store Connect", "Play Console"] },
  { group: "Frontend", items: ["React", "Next.js", "Vite", "Tailwind CSS", "HTML5", "CSS3", "Bootstrap"] },
  { group: "Cloud & DevOps", items: ["AWS EC2", "AWS ECS", "AWS S3", "IAM", "VPC", "Docker", "Terraform", "Azure", "Git & GitHub"] },
  { group: "Data & AI", items: ["MySQL", "PostgreSQL", "H2 / JPA", "Supabase", "LightGBM", "Google Earth Engine", "LLMs / RAG"] },
  { group: "Core CS", items: ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"] },
];

// Words that orbit the 3D core in the hero.
export const orbitTech = ["Java", "Flutter", "Spring Boot", "React", "AWS", "Laravel", "Node.js", "Docker", "MySQL", "Terraform", "FastAPI", "Kafka"];

export const experience = [
  {
    role: "Software Developer Intern · Mobile & Full Stack",
    org: "Dendo (food delivery platform)",
    period: "Jul 8 – Sep 8, 2026 · 3 months",
    points: [
      "Worked across all three Dendo apps: the Restaurant Partner (vendor) app, the customer Food app and the Delivery Partner app.",
      "Built and fixed features in Flutter and the Laravel backend: order lifecycle, live rider tracking on Google Maps, OTP handover, menus and add-ons, payouts and earnings.",
      "Handled admin management in the admin panel: vendors, payout rules and day-to-day order operations.",
      "Hands-on with the team's Git/GitHub workflow (branches, merges, conflict resolution) and with deployments.",
      "Shipped releases and updates to the Apple App Store and Google Play Store.",
    ],
  },
  {
    role: "Software Engineering Job Simulation",
    org: "JPMorgan Chase & Co. · Forage",
    period: "May 2026",
    points: ["Spring Boot project setup, Kafka integration, H2 persistence, REST controllers and REST API integration."],
  },
  {
    role: "Technology, Cyber & Data Analytics Simulations",
    org: "Deloitte · EY · Forage",
    period: "May 2026",
    points: ["Coding and development, cyber security, data analysis and forensic technology, and technology-risk tasks."],
  },
  {
    role: "Digital Marketing Intern",
    org: "Maven Advert",
    period: "May – Jun 2025",
    points: ["Ran 3+ campaigns that lifted social media engagement by 25%, working in a team of 5."],
  },
];

// category: fullstack | cloud | ai | web3 | security
export const projects = [
  {
    title: "TrustLance",
    tagline: "Trust-first freelance marketplace · GDG Hackathon winner",
    year: "2026",
    featured: true,
    category: ["fullstack", "web3"],
    stack: ["Next.js", "React", "Supabase", "PostgreSQL RLS", "Shardeum", "Smart Contracts", "XMTP"],
    points: [
      "Escrow-style milestone payments: funds lock before work starts and release only on approval.",
      "Wallet and Google identity, encrypted wallet-to-wallet messaging and an auditable dispute flow.",
      "Won 1st place on the Shardeum track at Hack with GDG Season-03, a 36-hour hackathon.",
    ],
    links: { code: "https://github.com/kingprem12/TrustLance_TRT" },
  },
  {
    title: "JobTracker",
    tagline: "Job application & interview management system",
    year: "2026",
    featured: true,
    category: ["fullstack"],
    stack: ["Java 21", "Spring Boot 3.5", "Spring Security", "JWT", "JPA / Hibernate", "React 18", "Vite", "Swagger"],
    points: [
      "Role-based access for candidates, career counsellors and administrators.",
      "Spring Boot serves the REST API and the built React SPA from one port, with no CORS setup.",
      "OpenAPI docs, BCrypt passwords, an axios JWT interceptor and Recharts analytics.",
    ],
    links: { code: "https://github.com/kingprem12/job-tracker-management-" },
  },
  {
    title: "Slytherin DEX",
    tagline: "API-first on-chain AMM on Algorand",
    year: "2026",
    category: ["web3", "fullstack"],
    stack: ["TypeScript", "Node.js", "Express", "Algorand", "WebSocket", "JWT"],
    points: [
      "Lets any fintech app offer token swaps with one API call. Swaps confirm in about 3.5s on testnet.",
      "Wallet signature-challenge auth with JWT, and real-time updates over WebSocket.",
    ],
    links: { code: "https://github.com/kingprem12/Slytherin" },
  },
  {
    title: "Loanify",
    tagline: "AI-driven NBFC loan automation",
    year: "2026",
    category: ["ai", "fullstack"],
    stack: ["Next.js 14", "TypeScript", "Node.js", "Express", "SQLite", "Multi-agent AI"],
    points: [
      "Master agent orchestrates verification, sales, underwriting and sanction-letter agents.",
      "Customer eligibility chat plus a live admin dashboard with CSV export.",
    ],
    links: { code: "https://github.com/kingprem12/loanify" },
  },
  {
    title: "SkillGap AI",
    tagline: "Career gap analysis platform",
    year: "2026",
    category: ["ai", "fullstack"],
    stack: ["TypeScript", "React", "Express", "GPT-4", "Drizzle ORM"],
    points: [
      "Parses resumes and maps skill gaps against target roles with 85% matching accuracy.",
      "REST APIs that return personalised learning recommendations.",
    ],
    links: { code: "https://github.com/kingprem12/SkillGap-AI" },
  },
  {
    title: "The Retro Kitchen",
    tagline: "AI recipe generator & 7-day meal planner",
    year: "2025",
    category: ["fullstack", "ai"],
    stack: ["React", "TypeScript", "Express 5", "PostgreSQL", "Zod", "OpenAI"],
    points: [
      "Generates recipes from the ingredients you have, with calories, protein, carbs and fat.",
      "Saved menus, meal plans and type-safe REST routes shared between client and server.",
    ],
    links: { code: "https://github.com/kingprem12/Retro-Kitchen" },
  },
  {
    title: "Ghost Yield",
    tagline: "Initia-native DeFi auto-compounding vault",
    year: "2026",
    category: ["web3"],
    stack: ["Solidity", "Initia", "InterwovenKit", "React"],
    points: ["A session-authorised 'Ghost Operator' compounds yield through auto-signing, without an approval prompt on every compound."],
    links: { code: "https://github.com/kingprem12/Ghost_Yield" },
  },
  {
    title: "Private Chatbot & LawCraftsMan",
    tagline: "Local RAG over your own documents",
    year: "2026",
    category: ["ai"],
    stack: ["Python", "Ollama", "Mistral", "Vector store", "FastAPI", "React"],
    points: ["Ingests documents into embeddings and answers questions fully offline. LawCraftsMan applies the same approach to legal texts."],
    links: { code: "https://github.com/kingprem12/Private-chatbot" },
  },
  {
    title: "Secure Network Perimeters",
    tagline: "Firewall, IDS/IPS & VPN lab",
    year: "2026",
    category: ["security", "cloud"],
    stack: ["Kali Linux", "UFW", "Snort", "Wireshark", "OpenVPN"],
    points: ["Firewall rules, Snort intrusion detection and VPN tunnels, with live ICMP/TCP attack monitoring."],
    links: { code: "https://github.com/kingprem12/Securing-Network-Perimeters-Using-Firewalls-IDS-IPS-and-VPNs" },
  },
  {
    title: "Smart AI Traffic Management",
    tagline: "IoT signals with violation & noise detection",
    year: "2025",
    category: ["ai"],
    stack: ["Raspberry Pi", "IR sensors", "Sound sensors", "Python"],
    points: ["Detects violations, resets signals, issues automated fines and enforces noise limits near schools."],
    links: {},
  },
];

export const achievements = [
  {
    title: "1st Place, Hack with GDG Season-03",
    detail: "Shardeum track, 36-hour hackathon by GDG KSRCE. Team Gryffindor, Feb 2026.",
    cert: "gdg-hackathon-winner",
    icon: "trophy",
  },
  {
    title: "Academic Topper, Batch 2023–27",
    detail: "Ranked #1 in the department in the 3rd semester with an SGPA of 9.14.",
    image: "assets/img/topper-batch.jpg",
    icon: "star",
  },
  {
    title: "II Rank, Keerthi'25 Annual Day",
    detail: "Recognised by Sri Krishna College of Technology for the academic year 2024–25.",
    cert: "keerthi25-rank",
    icon: "medal",
  },
  {
    title: "2nd Place, Unstop @ BVIMR",
    detail: "Kutty-Port: an AI-driven micro-port and online-auction strategy for MSME coastal exports.",
    icon: "rocket",
  },
];

// file: name in assets/certs (thumbnail in assets/thumbs/<id>.jpg)
export const certifications = [
  { id: "azure-fundamentals", file: "azure-fundamentals.jpeg", title: "Microsoft Certified: Azure Fundamentals", issuer: "Microsoft", date: "Jun 2025", tag: "cloud" },
  { id: "aws-cloud-practitioner-essentials", file: "aws-cloud-practitioner-essentials.pdf", title: "AWS Cloud Practitioner Essentials", issuer: "AWS Skill Builder", date: "Sep 2025", tag: "cloud" },
  { id: "aws-cloud-quest-badge", file: "aws-cloud-quest-badge.jpeg", title: "AWS Cloud Quest: Cloud Practitioner", issuer: "AWS", date: "2025", tag: "cloud" },
  { id: "jpmorgan-software-engineering", file: "jpmorgan-software-engineering.pdf", title: "Software Engineering Job Simulation", issuer: "JPMorgan Chase · Forage", date: "May 2026", tag: "engineering" },
  { id: "deloitte-technology", file: "deloitte-technology.pdf", title: "Technology Job Simulation", issuer: "Deloitte · Forage", date: "May 2026", tag: "engineering" },
  { id: "mern-traineeship", file: "mern-traineeship.pdf", title: "Full-Stack (MERN) App/Web Development Traineeship", issuer: "V Vision · MSME", date: "Nov 2024", tag: "engineering" },
  { id: "infosys-reactjs", file: "infosys-reactjs.pdf", title: "ReactJS", issuer: "Infosys Springboard", date: "Sep 2024", tag: "engineering" },
  { id: "cisco-python-essentials-1", file: "cisco-python-essentials-1.pdf", title: "Python Essentials 1", issuer: "Cisco Networking Academy", date: "Jan 2026", tag: "engineering" },
  { id: "cisco-python-essentials-2", file: "cisco-python-essentials-2.pdf", title: "Python Essentials 2", issuer: "Cisco Networking Academy", date: "Jan 2026", tag: "engineering" },
  { id: "cisco-intro-cybersecurity", file: "cisco-intro-cybersecurity.pdf", title: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Mar 2024", tag: "security" },
  { id: "deloitte-cyber", file: "deloitte-cyber.pdf", title: "Cyber Job Simulation", issuer: "Deloitte · Forage", date: "May 2026", tag: "security" },
  { id: "ey-technology-risk", file: "ey-technology-risk.pdf", title: "Technology Risk Job Simulation", issuer: "EY · Forage", date: "May 2026", tag: "security" },
  { id: "deloitte-data-analytics", file: "deloitte-data-analytics.pdf", title: "Data Analytics Job Simulation", issuer: "Deloitte · Forage", date: "May 2026", tag: "data" },
  { id: "gdg-hackathon-winner", file: "gdg-hackathon-winner.pdf", title: "Certificate of Merit, 1st Place", issuer: "Hack with GDG S3 · KSRCE", date: "Feb 2026", tag: "awards" },
  { id: "keerthi25-rank", file: "keerthi25-rank.jpg", title: "Certificate of Appreciation, II Rank", issuer: "Sri Krishna College of Technology", date: "2025", tag: "awards" },
  { id: "maven-advert-internship", file: "maven-advert-internship.pdf", title: "Internship Certificate, Digital Marketing", issuer: "Maven Advert", date: "Jun 2025", tag: "awards" },
];

// Listed on the resume; no certificate file on disk yet.
export const otherCredentials = [
  "Oracle Cloud Infrastructure 2025, Generative AI Professional",
  "Java OOPs Concepts, Infosys Springboard",
  "Responsive Web Pages using Bootstrap 4, Infosys Springboard",
];

export const education = [
  { degree: "B.E. Computer Science & Engineering (Internet of Things)", school: "Sri Krishna College of Technology, Coimbatore", period: "2023 – 2027", score: "CGPA 8.43" },
  { degree: "Higher Secondary, Computer Science", school: "SHNV Matric Higher Secondary School, Sivakasi", period: "Class XII", score: "90.83%" },
];

// Flagship products shown as animated showcases (see js/showcase.js).
const PLAY = "https://play.google.com/store/apps/details?id=";
export const showcases = {
  dendo: {
    apps: [
      {
        icon: "🏪", name: "Dendo Restaurant Partner", who: "Vendor app",
        blurb: "Everything a restaurant needs to run on Dendo from one phone.",
        points: ["Live order queue, accept → cook → hand over with OTP", "Menu, add-ons, stock, store hours and coupons", "Rider location on a map, wallet, payouts and earnings"],
        play: PLAY + "com.dendo.update.store", ios: "https://apps.apple.com/in/app/dendo-restaurant-partner/id6754547094",
      },
      {
        icon: "🍔", name: "Dendo Food", who: "Customer app", downloads: "1K+",
        blurb: "Biryani to burgers from local restaurants, delivered fast.",
        points: ["Browse restaurants and a wide variety of dishes", "Live tracking from kitchen to doorstep", "UPI, cards, wallets and cash on delivery"],
        play: PLAY + "com.dendo.update.user", ios: "https://apps.apple.com/in/app/dendo-food-everything-app/id6754545236",
      },
      {
        icon: "🛵", name: "Dendo Delivery Partner", who: "Rider app", downloads: "1K+",
        blurb: "The fleet side: riders pick up, navigate and get paid.",
        points: ["Order pickup and drop with live navigation", "Trips, earnings, bonuses and twice-weekly payouts", "Proof of delivery and OTP handover"],
        play: PLAY + "com.dendo.update.delivery", ios: "https://apps.apple.com/in/app/dendo-delivery-partner/id6754546419",
      },
    ],
    stack: ["Flutter", "Dart", "GetX", "Laravel (PHP)", "REST APIs", "Firebase FCM", "Google Maps", "Docker", "AWS"],
  },
  nexa: {
    apps: [
      {
        icon: "🧍", name: "Nexa Ride", who: "Rider app", downloads: "100+",
        blurb: "Book a bike, auto, cab or EV, or send a parcel, from one app.",
        points: ["Upfront fares before you book", "START OTP to verify the driver", "Live trip tracking and instant UPI payments"],
        play: PLAY + "com.nexaride.userapp", ios: "https://apps.apple.com/in/app/nexa-ride/id6791447323",
      },
      {
        icon: "🚖", name: "Nexa Ride Partner", who: "Driver app", downloads: "100+",
        blurb: "Drivers take trips when they want and track every rupee.",
        points: ["Real-time ride requests, one-tap accept", "Built-in navigation and in-app chat", "Earnings, wallet and bank settlements"],
        play: PLAY + "com.nexadriver",
      },
    ],
    stack: ["iOS & Android", "Real-time GPS tracking", "Upfront pricing", "OTP ride start", "UPI payments", "In-app chat"],
  },
  agri: {
    stack: ["React", "FastAPI", "LightGBM", "PSO", "Google Earth Engine", "JWT", "AWS EC2 / S3", "Docker", "Terraform", "ESP32"],
    links: { code: "https://github.com/kingprem12/Agri-Shield", iot: "https://github.com/kingprem12/Agri-shield--X", paper: "assets/AgriShieldX_IEEE_Paper.pdf" },
  },
};
