import hermesThumb  from '../../assets/Hermes_ai-panel.webp';
import mmodeThumb   from '../../assets/Nikon-Z8-m-mode.webp';
import grandHotelTaipeiThumb from '../../assets/taipei-taoyuan/taipei-taoyuan-9.webp';
import hiroThumb from '../../assets/hiro.webp';

export const posts = [
  {
    id: 4,
    slug: 'grand-hotel-taipei',
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
