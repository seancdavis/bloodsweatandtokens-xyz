import episode01Transcript from '../content/transcripts/episode-01.txt?raw';
import episode02Transcript from '../content/transcripts/episode-02.txt?raw';
import episode03Transcript from '../content/transcripts/episode-03.txt?raw';
import episode04Transcript from '../content/transcripts/episode-04.txt?raw';

export type PlatformLink = {
  label: string;
  url: string;
};

export type Host = {
  name: string;
  role: string;
  bio: string;
  links: PlatformLink[];
};

export type Episode = {
  id: string;
  season: number;
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  publishedAt: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  videoId: string;
  descriptionHtml: string;
  summary: string;
  takeaways: string[];
  chapters: string[];
  transcript: string;
  transcriptUrl: string;
};

export const site = {
  name: 'Blood, Sweat & Tokens',
  tagline: 'A podcast about building under pressure.',
  seasonLabel: 'Season 1',
  seasonTitle: 'Delete Your CMS',
  description:
    'Two builders stop talking about AI and start building with it: real deadlines, real prototypes, and a weekly commitment to ship.',
  url: 'https://bloodsweatandtokens.xyz',
  coverArt:
    'https://hosting-media.riverside.com/media/podcasts/7fa448d6-138b-4d99-91a2-ec0d4a11b606/logos/5ad17be8-32fd-4aca-98c6-b098d450075a.jpeg',
  rssUrl: 'https://api.riverside.com/hosting/Vx6O326l.rss',
  sourceNote: 'Static data imported from the Riverside RSS feed on 2026-06-04.',
};

export const platformLinks: PlatformLink[] = [
  {
    label: 'Apple Podcasts',
    url: 'https://podcasts.apple.com/us/podcast/blood-sweat-tokens/id1896816742',
  },
  {
    label: 'Spotify',
    url: 'https://open.spotify.com/show/033ntjjBUJ5tNTpyhhsYIF',
  },
  {
    label: 'YouTube',
    url: 'https://www.youtube.com/playlist?list=PLnCGOKNgAav8WjiqlNlV1YwVr11t4ykO_',
  },
  {
    label: 'RSS',
    url: site.rssUrl,
  },
];

export const footerLinks: PlatformLink[] = [
  ...platformLinks,
  {
    label: 'Netlify',
    url: 'https://www.netlify.com/',
  },
  {
    label: 'Ample',
    url: 'https://www.ample.co/',
  },
];

export const hosts: Host[] = [
  {
    name: 'Taylor MacDonald',
    role: 'Partner and CTO at Ample',
    bio: 'Taylor runs technical strategy for client work at Ample and brings the agency-side scar tissue: budgets, stakeholders, CMS migrations, and the pressure to make useful things ship.',
    links: [
      {
        label: 'Ample',
        url: 'https://www.ample.co/',
      },
    ],
  },
  {
    name: 'Sean C. Davis',
    role: 'Developer experience at Netlify',
    bio: 'Sean works on developer tools at Netlify and spends the show turning agentic workflows into real prototypes, then unpacking where the magic holds and where it gets expensive.',
    links: [
      {
        label: 'Netlify',
        url: 'https://www.netlify.com/',
      },
      {
        label: 'Website',
        url: 'https://www.seancdavis.com/',
      },
    ],
  },
];

export const episodes: Episode[] = [
  {
    id: 'd0c37151-0abf-4000-9b8d-0ccab997fbf9',
    season: 1,
    number: 4,
    slug: 'the-friction-paradox-why-less-control-means-more-tolerance',
    title: 'S01 E04 - The Friction Paradox: Why Less Control Means More Tolerance',
    shortTitle: 'The Friction Paradox: Why Less Control Means More Tolerance',
    publishedAt: '2026-05-29T10:00:00.000Z',
    duration: '00:55:15',
    durationSeconds: 3315,
    audioUrl:
      'https://api.riverside.com/hosting-analytics/media/b6b493d363663586b8e5bc65727d8efce86eb8de144995dd31ca74a8b757fcf0/eyJlcGlzb2RlSWQiOiJkMGMzNzE1MS0wYWJmLTQwMDAtOWI4ZC0wY2NhYjk5N2ZiZjkiLCJwb2RjYXN0SWQiOiI3ZmE0NDhkNi0xMzhiLTRkOTktOTFhMi1lYzBkNGExMWI2MDYiLCJhY2NvdW50SWQiOiI2OWE1ZmJhOTRkZmVkYWY3NDViZTk1YTMiLCJwYXRoIjoibWVkaWEvY2xpcHMvNmEwNjM1MTgwMGZhY2Q4NjFjNWJmZTkyL3RheWxvci1tYWNkb25hbGRzLXN0dWRpby00VE9qRS1jb21wb3Nlci0yMDI2LTUtMTRfXzIyLTQ4LTI0Lm1wMyJ9.mp3',
    videoId: 'lXemc4eDe8Y',
    descriptionHtml:
      '<p>The conversation covers a range of topics related to content management, AI, and product development. It delves into the challenges of multi-agent workflows, the total cost of ownership for CMS, the importance of control and feedback in content management, and the role of immediate feedback and communication in content management. The discussion also explores the sustainability of inference models, educational debt in CMS implementation, and the future of UI and communication surfaces. The conversation delves into the challenges of content management systems, the impact of voice assistants and natural language interfaces, the exploration of voice assistant tools and models, and the future of content management systems. It highlights the importance of reducing friction, the use of voice assistants to reduce anxiety, and the potential evolution of content management systems.</p><p></p><p>Takeaways</p><ul><li>Multi-agent workflows</li><li>Total cost of ownership for CMS</li><li>Control and feedback in content management</li><li>Immediate feedback and communication in content management Empowering users with less friction can increase their tolerance for delays and improve outcomes.</li><li>The use of voice assistants and natural language interfaces can reduce anxiety and improve communication.</li></ul><p></p><p>Chapters</p><ul><li>00:00 Importance of Control and Feedback in Content Management</li><li>30:26 Friction in Content Management Systems</li><li>43:19 Exploring Voice Assistant Tools and Models</li><li>51:00 The Future of Content Management Systems</li></ul>',
    summary:
      'Taylor and Sean dig into the friction paradox: why reducing control can increase tolerance when AI-driven content workflows give users fast, honest feedback.',
    takeaways: [
      'Multi-agent workflows need fast, visible feedback loops.',
      'CMS ownership cost is tied to educational debt and implementation drag.',
      'Voice assistants and natural language interfaces can reduce anxiety when the workflow is clear.',
    ],
    chapters: [
      '00:00 Importance of control and feedback in content management',
      '30:26 Friction in content management systems',
      '43:19 Exploring voice assistant tools and models',
      '51:00 The future of content management systems',
    ],
    transcript: episode04Transcript,
    transcriptUrl:
      'https://hosting-media.riverside.com/media/podcasts/7fa448d6-138b-4d99-91a2-ec0d4a11b606/episodes/d0c37151-0abf-4000-9b8d-0ccab997fbf9/transcripts.txt',
  },
  {
    id: '2ae65ac3-a6d0-47eb-9535-698ed988d5fd',
    season: 1,
    number: 3,
    slug: 'the-cognitive-tax-how-information-overload-inflates-your-tco',
    title: 'S01 E03 - The Cognitive Tax: How Information Overload Inflates Your TCO',
    shortTitle: 'The Cognitive Tax: How Information Overload Inflates Your TCO',
    publishedAt: '2026-05-26T15:44:13.000Z',
    duration: '00:52:47',
    durationSeconds: 3167,
    audioUrl:
      'https://api.riverside.com/hosting-analytics/media/136cc8037faae1c76e268212d5d47c0367df803ac45900ef27d2e00e60caccea/eyJlcGlzb2RlSWQiOiIyYWU2NWFjMy1hNmQwLTQ3ZWItOTUzNS02OThlZDk4OGQ1ZmQiLCJwb2RjYXN0SWQiOiI3ZmE0NDhkNi0xMzhiLTRkOTktOTFhMi1lYzBkNGExMWI2MDYiLCJhY2NvdW50SWQiOiI2OWE1ZmJhOTRkZmVkYWY3NDViZTk1YTMiLCJwYXRoIjoibWVkaWEvY2xpcHMvNmEwMjBhNTk4OTU4MGRhODY0YWE4ZTlhL3RheWxvci1tYWNkb25hbGRzLXN0dWRpby00VE9qRS1jb21wb3Nlci0yMDI2LTUtMTFfXzE4LTU2LTU2Lm1wMyJ9.mp3',
    videoId: 'TyEN3603vy0',
    descriptionHtml:
      '<p>The conversation explores the concept of total cost of ownership in software development projects, focusing on the challenges and costs associated with CMS implementation. It delves into the impact of AI on reducing friction and improving the success rate of technology projects. The discussion also touches on the development of prototypes and the potential for AI tools to revolutionize the development process. The conversation delves into the challenges of information overload and communication fragmentation in the digital age, leading to the exploration of solutions for streamlining and enhancing user experience in content management and previewing. The discussion also touches on the evolution of technology and its impact on information management.</p><p></p><p>Takeaways</p><ul><li>Total cost of ownership in software development projects is a significant concern, with a focus on CMS implementation costs.</li><li>AI tools have the potential to reduce friction and improve the success rate of technology projects.</li><li>Prototypes and AI tools are shaping the future of software development, offering new possibilities for innovation and efficiency. Information overload and communication fragmentation are significant challenges in the digital age.</li><li>Natural language solutions and user experience enhancements are key to addressing content management and previewing challenges.</li></ul><p></p><p>Chapters</p><ul><li>00:00 Exploring Total Cost of Ownership in Software Development</li><li>10:55 Revolutionizing Development with Prototypes and AI Tools</li><li>30:48 The Impact of Information Overload</li><li>36:06 Enhancing User Experience in Content Management and Previewing</li></ul>',
    summary:
      'A close look at the cognitive tax behind CMS projects: information overload, fragmented communication, and why AI changes the cost profile.',
    takeaways: [
      'Total cost of ownership is not just licensing; it includes coordination, implementation, and ongoing comprehension.',
      'Prototypes and AI tooling can reduce friction when they make work visible sooner.',
      'Natural language interfaces may be most valuable when they collapse fragmented communication paths.',
    ],
    chapters: [
      '00:00 Exploring total cost of ownership in software development',
      '10:55 Revolutionizing development with prototypes and AI tools',
      '30:48 The impact of information overload',
      '36:06 Enhancing user experience in content management and previewing',
    ],
    transcript: episode03Transcript,
    transcriptUrl:
      'https://hosting-media.riverside.com/media/podcasts/7fa448d6-138b-4d99-91a2-ec0d4a11b606/episodes/2ae65ac3-a6d0-47eb-9535-698ed988d5fd/transcripts.txt',
  },
  {
    id: '14214c32-69b9-4fcc-90e4-0c2cbe65502c',
    season: 1,
    number: 2,
    slug: 'the-desensitization-dilemma-security-vs-seamless-experience',
    title: 'S01 E02 - The Desensitization Dilemma: Security vs. Seamless Experience',
    shortTitle: 'The Desensitization Dilemma: Security vs. Seamless Experience',
    publishedAt: '2026-05-26T15:41:49.000Z',
    duration: '00:51:26',
    durationSeconds: 3086,
    audioUrl:
      'https://api.riverside.com/hosting-analytics/media/0844512c02243c43211162edaf68071a863256cf2222cd673aca2fbdfb884f62/eyJlcGlzb2RlSWQiOiIxNDIxNGMzMi02OWI5LTRmY2MtOTBlNC0wYzJjYmU2NTUwMmMiLCJwb2RjYXN0SWQiOiI3ZmE0NDhkNi0xMzhiLTRkOTktOTFhMi1lYzBkNGExMWI2MDYiLCJhY2NvdW50SWQiOiI2OWE1ZmJhOTRkZmVkYWY3NDViZTk1YTMiLCJwYXRoIjoibWVkaWEvY2xpcHMvNjlmMzg1Y2RkMWIzYTYzZjg2YzBjZmU2L3RheWxvci1tYWNkb25hbGRzLXN0dWRpby00VE9qRS1jb21wb3Nlci0yMDI2LTQtMzBfXzE4LTM5LTQxLm1wMyJ9.mp3',
    videoId: '6W9VKltWwps',
    descriptionHtml:
      '<p>In this episode, Taylor MacDonald and Sean C. Davis discuss the impact of natural language processing on content management systems and user experience. They explore the problem with traditional content management systems, the potential of natural language processing to eliminate friction, and the ideal state for content management in both greenfield applications and established systems. The conversation delves into the concept of desensitization and abstraction layers, highlighting the transformative potential of natural language processing in AI. The conversation delves into the development of UI components, data storage and management, security and risk mitigation, agent governance and control, and deterministic systems with AI instruction. The discussion emphasizes the impact of natural language on interactions and explores strategies for mitigating security risks in autonomous agent systems.</p><p></p><p>Takeaways</p><ul><li>Natural language processing in AI can eliminate friction in content management systems and improve user experience.</li><li>The use of natural language processing can revolutionize the way we interact with systems and devices. UI components as isolated blocks</li><li>Data mapping to database rows</li></ul><p></p><p>Chapters</p><ul><li>00:00 Introduction to Blood, Sweat, and Tokens</li><li>09:24 The Impact of Natural Language Processing</li><li>26:54 The Ideal State for Content Management</li><li>34:00 Security and Risk Mitigation</li><li>50:13 Deterministic Systems and AI Instruction</li></ul>',
    summary:
      'Taylor and Sean work through the tradeoff between seamless natural-language workflows and the security controls that keep autonomous systems sane.',
    takeaways: [
      'Natural language can remove CMS friction, but it also abstracts away important control points.',
      'Agent governance needs to be designed into the workflow rather than patched on afterward.',
      'Deterministic systems still matter when AI is providing the instructions.',
    ],
    chapters: [
      '00:00 Introduction to Blood, Sweat, and Tokens',
      '09:24 The impact of natural language processing',
      '26:54 The ideal state for content management',
      '34:00 Security and risk mitigation',
      '50:13 Deterministic systems and AI instruction',
    ],
    transcript: episode02Transcript,
    transcriptUrl:
      'https://hosting-media.riverside.com/media/podcasts/7fa448d6-138b-4d99-91a2-ec0d4a11b606/episodes/14214c32-69b9-4fcc-90e4-0c2cbe65502c/transcripts.txt',
  },
  {
    id: '56709c01-cf56-4fed-892f-fd254123236e',
    season: 1,
    number: 1,
    slug: 'smooth-operations-how-ai-eliminates-cms-friction',
    title: 'S01 E01 - Smooth Operations: How AI Eliminates CMS Friction',
    shortTitle: 'Smooth Operations: How AI Eliminates CMS Friction',
    publishedAt: '2026-05-26T15:33:36.000Z',
    duration: '00:37:53',
    durationSeconds: 2273,
    audioUrl:
      'https://api.riverside.com/hosting-analytics/media/e818104768cc3621189d3661b85ec4c32e58a42c1ac887fb78f603b27c5763fa/eyJlcGlzb2RlSWQiOiI1NjcwOWMwMS1jZjU2LTRmZWQtODkyZi1mZDI1NDEyMzIzNmUiLCJwb2RjYXN0SWQiOiI3ZmE0NDhkNi0xMzhiLTRkOTktOTFhMi1lYzBkNGExMWI2MDYiLCJhY2NvdW50SWQiOiI2OWE1ZmJhOTRkZmVkYWY3NDViZTk1YTMiLCJwYXRoIjoibWVkaWEvY2xpcHMvNjlmM2ExMGNjNDJkNzhhOTkzNDY3OTA1L3RheWxvci1tYWNkb25hbGRzLXN0dWRpby00VE9qRS1jb21wb3Nlci0yMDI2LTQtMzBfXzIwLTM1LTU2Lm1wMyJ9.mp3',
    videoId: 'IAqyJDQo3KE',
    descriptionHtml:
      '<p>The conversation explores the challenges of content management systems (CMS) and the impact of AI on reducing friction in content management. It delves into the frustrations with CMS, the evolution of CMS, and the future of content management. The use of voice automation and workflow integration is also discussed as a means of reducing friction in content management.</p><p></p><p>Takeaways</p><ul><li>Reducing friction through AI tooling</li><li>Challenges with CMS and content management</li></ul><p></p><p>Chapters</p><ul><li>00:00 Introduction to Blood, Sweat, and Tokens</li><li>15:26 The Impact of AI on Friction Reduction</li><li>28:18 The Future of CMS and Content Management</li></ul>',
    summary:
      'The opening episode sets the experiment: can AI tooling reduce the friction and expense that make CMS work feel heavier than it should?',
    takeaways: [
      'Most CMS pain comes from the gap between rigid interfaces and messy real-world content needs.',
      'AI tooling can reduce friction when it is tied to real product workflows.',
      'The season starts with a practical question: what would it take to delete your CMS?',
    ],
    chapters: [
      '00:00 Introduction to Blood, Sweat, and Tokens',
      '15:26 The impact of AI on friction reduction',
      '28:18 The future of CMS and content management',
    ],
    transcript: episode01Transcript,
    transcriptUrl:
      'https://hosting-media.riverside.com/media/podcasts/7fa448d6-138b-4d99-91a2-ec0d4a11b606/episodes/56709c01-cf56-4fed-892f-fd254123236e/transcripts.txt',
  },
];

export const latestEpisode = episodes[0];

export function getEpisodeBySlug(slug: string) {
  return episodes.find((episode) => episode.slug === slug);
}

export function episodePath(episode: Episode) {
  return `/episodes/${episode.slug}/`;
}

export function episodeCode(episode: Episode) {
  return String(episode.number).padStart(3, '0');
}

export function formatEpisodeDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(date));
}

export function formatEpisodeListDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    timeZone: 'UTC',
  })
    .format(new Date(date))
    .toUpperCase();
}

export function durationClock(duration: string) {
  return duration.replace(/^00:/, '');
}

export function transcriptPreview(transcript: string, maxLength = 480) {
  const normalized = transcript.replace(/\s+/g, ' ').trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength).trim()}...`;
}
