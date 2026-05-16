export const skillGroups = [
  {
    title: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'Tailwind CSS',
      'TanStack Query',
      'Zustand',
    ],
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express.js', 'REST APIs', 'WebSockets', 'Rate Limiting'],
  },
  {
    title: 'Data + Infra',
    items: [
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Kafka',
      'Docker',
      'AWS',
      'EC2',
      'ECS',
      'IAM',
    ],
  },
  {
    title: 'Architecture + Performance',
    items: [
      'CQRS',
      'Event-Driven Architecture',
      'Code Splitting',
      'Lazy Loading',
      'Web Workers',
    ],
  },
]

export const impactStats = [
  { value: '35%', label: 'Onboarding completion boost via Mixpanel diagnostics' },
  { value: '30%', label: 'Dashboard load-time reduction on high-frequency streams' },
  { value: '40%', label: 'Engagement increase with AI assistant module' },
  { value: '95%', label: 'Component testing coverage achieved in scalable UI systems' },
]

const contactEmail = 'ashishyadavfeb02@gmail.com'

const mailSubject = 'Company Name'
const mailBody = `Hi Ashish,

I visited your portfolio and would like to get in touch.

`

const gmailComposeParams = new URLSearchParams({
  view: 'cm',
  fs: '1',
  to: contactEmail,
  su: mailSubject,
  body: mailBody,
})

export const profileLinks = {
  github: 'https://github.com/ASHISHYADAV85270',
  linkedin: 'https://www.linkedin.com/in/ashish852/',
  emailAddress: contactEmail,
  email: `https://mail.google.com/mail/?${gmailComposeParams.toString()}`,
  phone: 'tel:+918527086883',
}

function toGoogleDriveDownloadUrl(url) {
  if (!url || !url.includes('drive.google.com')) {
    return url
  }

  const fileId =
    url.match(/\/d\/([^/]+)/)?.[1] ?? url.match(/[?&]id=([^&]+)/)?.[1]

  if (!fileId) {
    return url
  }

  return `https://drive.google.com/uc?export=download&id=${fileId}`
}

import { env } from '../config/env.js'

const rawCvUrl = env.cvUrl

export const cvDownload = {
  url: toGoogleDriveDownloadUrl(rawCvUrl),
  label: 'Download CV',
}

export const profileImage = '/images/ashish-profile.png'

export const projects = [
  {
    name: 'GEO Overview Matrix Analytics',
    tag: 'AI Systems',
    websiteUrl: 'https://writesonic.com/',
    websiteLabel: 'Writesonic Platform',
    imageUrl: '/images/writesonic-dashboard.png',
    imageAlt: 'Writesonic GEO overview dashboard screenshot',
    galleryImages: [
      {
        url: '/images/writesonic-dashboard-home.png',
        alt: 'Writesonic dashboard home view with SEO workflows',
      },
    ],
    description:
      'Built matrix views for Topic-wise, Competitor-wise, and Platform-wise visibility in Writesonic GEO workflows.',
    highlights: [
      'Built with Next.js 15, TanStack Query, and Zustand for fast analytics interaction.',
      'Handled real-time graphing workloads around 5K updates/min with stable performance.',
      'Reduced dashboard load times by 30% through fetch optimization and rendering improvements.',
    ],
  },
  {
    name: 'Custom Debugger + AI Assistant',
    tag: 'Frontend Engineering',
    websiteUrl: 'https://writesonic.com/',
    websiteLabel: 'Writesonic Dashboard Context',
    description:
      'Developed a custom debugger and AI-assisted user workflows in React for complex execution monitoring.',
    highlights: [
      'Built start/stop/step workflows with watch expressions and breakpoints via Socket.io.',
      'Integrated Monaco editor and CSV ingestion with Web Workers for heavy initialization tasks.',
      'Improved user engagement by 40% with AI-powered interaction modules.',
    ],
  },
  {
    name: 'Scalable Design System Platform',
    tag: 'Distributed Backend',
    websiteUrl: 'https://nile.aqueralabs.com/1.7.0/',
    websiteLabel: 'Aquera Design System',
    imageUrl: '/images/design-system-showcase.png',
    imageAlt: 'Aquera Labs design system components showcase',
    description:
      'Built reusable component systems and frontend infrastructure patterns for consistent, faster delivery.',
    highlights: [
      'Implemented modular component libraries used across product surfaces.',
      'Improved consistency using reusable forms, buttons, and layout primitives.',
      'Enabled predictable scaling through performance-first UI architecture patterns.',
    ],
  },
]

export const experiences = [
  {
    company: 'Aquera Labs',
    period: 'Software Engineer (Full Stack) | Dec 2023 - May 2025',
    role: 'Debugger, AI Assistant, and Scalable Frontend Systems',
    points: [
      'Built a React + Redux debugger with start/stop/step operations, breakpoint controls, and watch expressions.',
      'Integrated Socket.io data streams while minimizing re-renders for stable live state sync.',
      'Implemented secure refresh token flow using React Context and Axios interceptors, reducing backend load by 50%.',
    ],
  },
  {
    company: 'Writesonic',
    period: 'Software Engineer (Full Stack) | May 2025 - Jan 2026',
    role: 'Analytics UI, AI Integrations, and Product Performance',
    points: [
      'Built matrix view analytics and advanced citation filters with URL-persistent query states.',
      'Delivered a time graph component with 7-day, 30-day, and custom ranges for high-frequency event data.',
      'Drove Mixpanel funnel diagnostics that increased onboarding completion by 35%.',
    ],
  },
]

export const designSystemHighlights = [
  {
    title: 'Token-Driven Foundation',
    description:
      'Unified spacing, typography, and interaction behaviors through reusable design primitives.',
  },
  {
    title: 'Composable Components',
    description:
      'Built extensible components with predictable APIs for rapid product assembly.',
  },
  {
    title: 'Scalable Governance',
    description:
      'Established contribution patterns, testing standards, and review consistency across teams.',
  },
]

export const technicalHighlights = [
  {
    title: 'CQRS',
    description:
      'Separated write and read paths to reduce complexity in high-throughput domains and improve maintainability.',
  },
  {
    title: 'Event-Driven Architecture',
    description:
      'Designed asynchronous workflows to decouple services and increase system resilience.',
  },
  {
    title: 'Kafka',
    description:
      'Used Kafka for event streaming, enabling scalable processing of product and user behavior events.',
  },
  {
    title: 'Docker',
    description:
      'Containerized services to standardize runtime environments and simplify deployments.',
  },
  {
    title: 'Rate Limiting',
    description:
      'Protected critical APIs and maintained performance under burst traffic conditions.',
  },
]
