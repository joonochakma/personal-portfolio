// CMS Content Model Types
// These interfaces match the Webiny Headless CMS GraphQL schema (fields nested under `values`)

export interface Project {
  id: string;
  values: {
    title: string;
    slug: string;
    description: string;
    descriptions?: string[];
    imageUrl: string;
    images?: string[];
    videoUrl?: string;
    useMobileFrame?: boolean;
    publishedDate: string;
    datetime: string;
    category: string[];
    github?: string;
    live?: string;
    href: string;
  };
}

export interface Certification {
  id: string;
  values: {
    title: string;
    badgeImage: string;
    credlyUrl: string;
    altText: string;
    order: number;
  };
}

export interface SocialLink {
  id: string;
  values: {
    label: string;
    href: string;
    iconName: string;
    isExternal: boolean;
    order: number;
  };
}

export interface JcLabPage {
  id: string;
  values: {
    title: string;
    bodyContent: string;
    heroImage: string;
    heroImageAlt: string;
  };
}

export interface SiteSettings {
  id: string;
  values: {
    fullName: string;
    aboutText: string;
    contactEmail: string;
    contactHeading: string;
    contactSubtext: string;
    projectsSectionHeading: string;
    projectsSectionSubtext: string;
    certificationsHeading: string;
    certificationsDescription: string;
  };
}

// Default fallback values if CMS returns nothing
export const SITE_SETTINGS_DEFAULTS: SiteSettings['values'] = {
  fullName: 'Joono Chakma',
  aboutText:
    "I'm a passionate software developer based in Melbourne, Australia, and a recent graduate of Swinburne University of Technology with a Bachelor of Computer Science. My journey into software development is driven by curiosity and a genuine passion for technology, with a strong focus on continuously learning and improving my skills. When I'm not coding, you can find me capturing moments through photography or creating melodies through music. Welcome to my portfolio, where I showcase my projects and the creative solutions I've developed along the way.",
  contactEmail: 'joono+portfolio@chakma.com.au',
  contactHeading: 'Get in Touch',
  contactSubtext: "Want to chat? Here's how to reach me.",
  projectsSectionHeading: 'Projects',
  projectsSectionSubtext:
    'Check out my latest work from AI work, to mobile apps to websites',
  certificationsHeading: 'AWS Certifications & Cloud Achievements',
  certificationsDescription:
    'I have developed strong practical experience designing and building cloud-native applications using Amazon Web Services. My certifications reflect hands-on knowledge in serverless architecture, secure system design, and scalable backend development.',
};
