import { Agent, ProjectTemplate } from '../types';
import { 
    FileCodeIcon,
    SaaSIcon,
    BookOpenIcon,
} from '../components/Icons';

export const TEMPLATES: Partial<Record<Agent, ProjectTemplate[]>> = {
  [Agent.HTMLAutomator]: [
    {
      name: 'Modern Portfolio Page',
      description: 'A sleek, single-page portfolio with a hero, project grid, and contact form. Fully responsive with smooth animations.',
      Icon: FileCodeIcon,
      initialPrompt: 'Generate a script to create a single HTML file named "portfolio.html". The file must contain the complete HTML and inline CSS for a visually stunning, professional, and fully responsive developer portfolio. It needs a hero section, a project grid with placeholder images, and a contact form. The design must be world-class: modern, minimalist, and highly professional, using a dark theme with cyan accents. Please also include a small, subtle, and elegantly styled watermark in the footer that says "Made with AgentBash" and links to "https://agentbash.vercel.app".',
    },
    {
      name: 'SaaS Landing Page',
      description: 'A professional landing page for a fictional SaaS product, featuring a hero section with a CTA, features, and footer.',
      Icon: SaaSIcon,
      initialPrompt: 'Generate a script to create a single HTML file named "landing-page.html". The file must contain the complete HTML and inline CSS for a professional SaaS product landing page. Include a navigation bar, a compelling hero section with a call-to-action button, a three-column features section, and a simple footer. The UI/UX must be world-class, clean, and trustworthy. Please also include a small, subtle, and elegantly styled watermark in the footer that says "Made with AgentBash" and links to "https://agentbash.vercel.app".',
    },
    {
      name: 'Simple Blog Layout',
      description: 'A clean, minimalist blog layout focused on readability and elegant typography, with a header, article area, and sidebar.',
      Icon: BookOpenIcon,
      initialPrompt: 'Generate a script to create a single HTML file named "blog-post.html". The file must contain the complete HTML and inline CSS for a clean, minimalist blog post layout. Focus on excellent typography and readability. It should have a header, a main content area for the article with styled headings, paragraphs, and code blocks, and a simple sidebar. Please also include a small, subtle, and elegantly styled watermark in the footer that says "Made with AgentBash" and links to "https://agentbash.vercel.app".',
    },
  ]
};