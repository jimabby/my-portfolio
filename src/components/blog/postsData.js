import hermesThumb  from '../../assets/hermes/Hermes_ai-panel.webp';
import mmodeThumb   from '../../assets/m-mode/Nikon-Z8-m-mode.webp';
import grandHotelTaipeiThumb from '../../assets/taipei-taoyuan/taipei-taoyuan-9.webp';
import hiroThumb from '../../assets/hiro/hiro.webp';
import housedRedesignThumb from '../../assets/housed-redesign/housed-redesign-home.webp';

export const posts = [
  {
    id: 5,
    slug: 'housed-redesign',
    isoDate: '2026-08-20',
    key: 'housedRedesign',
    title: 'Rebuilding Housed — From Brochure Site to Booking Platform',
    category: 'Project',
    date: 'Aug 2026',
    readTime: '9 min read',
    tags: ['Redesign', 'Website', 'SEO'],
    thumbnail: housedRedesignThumb,
    excerpt:
      'How the Housed website moved from a nine-page brochure to a club-by-club platform: auditing the old site, rebuilding the information architecture, and cutting over without losing the URLs.',
  },
  {
    id: 4,
    slug: 'grand-hotel-taipei',
    isoDate: '2026-04-15',
    key: 'grandHotelTaipei',
    title: 'Staying at the Grand Hotel Taipei',
    category: 'Travel',
    date: 'Apr 2026',
    readTime: '5 min read',
    tags: ['Taipei', 'Travel', 'Photography'],
    thumbnail: grandHotelTaipeiThumb,
    excerpt:
      'A personal April stay at the Grand Hotel Taipei, from the red-pillared entrance and grand lobby to quiet corridors, city views, and slow moments around the grounds.',
  },
  {
    id: 3,
    slug: 'hiro',
    isoDate: '2026-03-20',
    key: 'hiro',
    title: 'Hiro — The AI Job Application Agent',
    category: 'Project',
    date: 'Mar 2026',
    readTime: '8 min read',
    tags: ['AI', 'Automation', 'Project'],
    thumbnail: hiroThumb,
    excerpt:
      'An AI desktop agent that scrapes Seek, Indeed, and LinkedIn on a schedule, scores every job against your resume, tailors your application, and submits — all while you sleep.',
  },
  {
    id: 1,
    slug: 'hermes',
    isoDate: '2026-03-05',
    key: 'hermes',
    title: 'Hermes — An AI-Powered Email Client',
    category: 'Project',
    date: 'Mar 2026',
    readTime: '6 min read',
    tags: ['AI', 'Project'],
    thumbnail: hermesThumb,
    excerpt:
      'A full-featured email client with Claude AI built in. Connect Gmail, Outlook, or any IMAP account and use 9 AI writing modes to compose better emails.',
  },
  {
    id: 2,
    slug: 'm-mode',
    isoDate: '2025-02-10',
    key: 'mMode',
    title: 'Understanding M Mode',
    category: 'Camera Basics',
    date: 'Feb 2025',
    readTime: '5 min read',
    tags: ['Photography', 'Beginner'],
    thumbnail: mmodeThumb,
    excerpt:
      'Learn how shutter speed, aperture, and ISO work together to give you full creative control over your camera — with practical examples you can try right away.',
  },
];
