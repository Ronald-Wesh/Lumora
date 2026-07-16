export const WORKS = [
  {
    name: 'Aster Labs',
    category: 'Branding',
    year: '2025',
    desc: 'A complete identity and go-to-market system for a fast-moving research startup.',
    tags: ['Branding', 'Strategy', 'Design'],
  },
  {
    name: 'Nova Finance',
    category: 'Product',
    year: '2024',
    desc: 'A finance platform reimagined — clear data, calm interfaces, and effortless flows.',
    tags: ['Product Design', 'Web App', 'QA'],
  },
  {
    name: 'Helio Studio',
    category: 'Identity',
    year: '2023',
    desc: 'A bold visual identity and art direction system built to scale across every surface.',
    tags: ['Brand Identity', 'Art Direction'],
  },
  {
    name: 'Pulse Health',
    category: 'Mobile',
    year: '2023',
    desc: 'A wellness app grounded in research, shipped end to end from concept to release.',
    tags: ['Mobile App', 'UX Research', 'Development'],
  },
]

export const SERVICES = [
  { n: '01', title: 'Software Development', desc: 'Scalable web & mobile products built to last.' },
  { n: '02', title: 'Product Design', desc: 'Interfaces that feel effortless and look sharp.' },
  { n: '03', title: 'Quality Assurance', desc: 'Rigorous testing for flawless, confident releases.' },
  { n: '04', title: 'Consulting', desc: 'Strategy and direction for ambitious teams.' },
]

export const STATS = [
  { value: 150, suffix: '+', label: 'Projects delivered' },
  { value: 98, suffix: '%', label: 'Client retention' },
  { value: 12, suffix: '', label: 'Years of craft' },
  { value: 40, suffix: '+', label: 'Team members' },
]

export const NAV_ROUTES = [
  { n: '01', label: 'Home', id: 'home' },
  { n: '02', label: 'Work', id: 'works' },
  { n: '03', label: 'Services', id: 'services' },
  { n: '04', label: 'Studio', id: 'about' },
  { n: '05', label: 'Careers', id: 'careers' },
  { n: '06', label: 'Contact', id: null },
] as const

export const FOOTER_COLUMNS = [
  {
    title: 'Company',
    links: [
      { label: 'About', id: 'about' },
      { label: 'Careers', id: 'careers' },
      { label: 'Partners', id: 'partners' },
      { label: 'Contact', id: null },
    ],
  },
  {
    title: 'Services',
    links: [
      { label: 'Development', id: 'development' },
      { label: 'Design', id: 'design' },
      { label: 'Quality Assurance', id: 'qa' },
      { label: 'Consulting', id: 'consulting' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'X / Twitter', id: null },
      { label: 'Behance', id: null },
      { label: 'Dribbble', id: null },
      { label: 'LinkedIn', id: null },
    ],
  },
]
