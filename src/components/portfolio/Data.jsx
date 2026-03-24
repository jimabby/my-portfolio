import HermesImg from "../../assets/Hermes_ai-panel.webp";
import HermesOverview from "../../assets/Hermes_overview.webp";
import HermesSummary from "../../assets/Hermes_ai-summary.webp";
import HermesAssistant from "../../assets/Hermes_ai-assistant.webp";
import HermesCategory from "../../assets/Hermes_ai-category.webp";
import HermesAccounts from "../../assets/Hermes_accounts.webp";
import Work1 from "../../assets/Takeaway.webp";
import Work2 from "../../assets/sociopedia.webp";
import Work3 from "../../assets/gym.webp";
import Work4 from "../../assets/icase.webp";
import Work5 from "../../assets/idesign.webp";
import Work6 from "../../assets/earrelief.webp";
import Work7 from "../../assets/maxmise.webp";
import Work8 from "../../assets/medirecords.webp";
import Work9 from "../../assets/myownvet.webp";
import HousedImg from "../../assets/Housed.webp";
import HousedImg1 from "../../assets/Housed1.webp";
import HousedImg2 from "../../assets/Housed2.webp";
import OnsenImg from "../../assets/onsen.webp";
import OnsenImg1 from "../../assets/onsen1.webp";
import SimbaImg from "../../assets/simbaeducation.webp";
import SimbaImg1 from "../../assets/simbaeducation1.webp";
import SimbaImg2 from "../../assets/simbaeducation2.webp";

export const projectsData = [
  {
    id: 0,
    image: HermesImg,
    title: 'Hermes - AI Email Client',
    category: 'App',
    link: 'https://jimkong-portfolio.vercel.app/blog/hermes',
    summary: 'AI-powered email client with smart writing modes and summaries.',
    tags: ['AI', 'Email', 'Product'],
    gallery: [
      HermesOverview,
      HermesImg,
      HermesSummary,
      HermesAssistant,
      HermesCategory,
      HermesAccounts,
    ],
  },
  {
    id: 1,
    image: Work1,
    title: 'Takeaway System',
    category: 'Website',
    link: "https://github.com/jimabby/TakeawayPlatform---Backend",
    summary: 'End-to-end food ordering platform with admin controls.',
    tags: ['Web App', 'Ordering', 'Admin'],
  },
  {
    id: 2,
    image: Work2,
    title: 'Sociopedia',
    category: 'Website',
    link: 'https://github.com/jimabby/Sociopedia',
    summary: 'Social media web app with feeds, profiles, and interactions.',
    tags: ['Social', 'Web App', 'UI'],
  },
  {
    id: 3,
    image: Work3,
    title: 'Gym',
    category: 'Website',
    link: 'https://github.com/jimabby/gym-website',
    summary: 'Fitness landing page focused on high-impact conversions.',
    tags: ['Landing', 'Fitness', 'UI'],
  },
  {
    id: 4,
    image: Work4,
    title: 'iCase',
    category: 'Website',
    link: 'https://github.com/jimabby/iCase',
    summary: 'E-commerce storefront for phone cases and accessories.',
    tags: ['E-commerce', 'Storefront', 'UI'],
  },
  {
    id: 5,
    image: Work5,
    title: 'iDesign - Ecommerce',
    category: 'Website',
    link: 'https://github.com/jimabby/ecommerce-website',
    summary: 'Modern e-commerce platform with product-focused UX.',
    tags: ['E-commerce', 'Web App', 'UI'],
  },
  {
    id: 6,
    image: Work6,
    title: 'EarRelief',
    category: 'Wordpress',
    link: 'https://earrelief.com.au/',
    summary: 'WordPress site for a healthcare-focused brand.',
    tags: ['WordPress', 'Healthcare', 'SEO'],
  },
  {
    id: 7,
    image: HousedImg,
    title: 'Housed',
    category: 'Website',
    link: 'https://housed.com.au/',
    summary: 'Gym website showcasing classes, trainers, and memberships.',
    tags: ['Website', 'Fitness', 'UI'],
    gallery: [HousedImg, HousedImg1, HousedImg2],
  },
  {
    id: 8,
    image: OnsenImg,
    title: 'Onsen',
    category: 'Website',
    link: 'https://onsen.housed.com.au/',
    summary: 'Premium gym brand site under Housed with a refined aesthetic.',
    tags: ['Website', 'Fitness', 'Brand'],
    gallery: [OnsenImg, OnsenImg1],
  },
  {
    id: 9,
    image: SimbaImg,
    title: 'Simba Education',
    category: 'Wordpress',
    link: 'https://simba.nsw.edu.au/',
    summary: 'Education site highlighting programs, enrolment, and trust.',
    tags: ['WordPress', 'Education', 'SEO'],
    gallery: [SimbaImg, SimbaImg1, SimbaImg2],
  },
  {
    id: 10,
    image: Work7,
    title: 'MaxMise Beauty',
    category: 'Wordpress',
    link: 'https://maximisebeauty.com.au/',
    summary: 'Beauty brand website with strong visual merchandising.',
    tags: ['WordPress', 'Beauty', 'Brand'],
  },
  {
    id: 11,
    image: Work8,
    title: 'MediRecords',
    category: 'Wordpress',
    link: 'https://medirecords.com/',
    summary: 'Healthcare platform site with product-led storytelling.',
    tags: ['WordPress', 'Healthcare', 'Product'],
  },
  {
    id: 12,
    image: Work9,
    title: 'MyOwnVet',
    category: 'Wordpress',
    link: 'https://myownvet.com.au/',
    summary: 'Veterinary services site optimized for conversions.',
    tags: ['WordPress', 'Healthcare', 'Services'],
  },
]

export const projectsNav = [
  {
    name: 'All'
  },
  {
    name: 'Website'
  },
  {
    name: 'Wordpress'
  },
  {
    name: 'App'
  }
]
