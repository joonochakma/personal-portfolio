export const dynamic = 'force-dynamic';

import { webiny } from './lib/webiny';
import { LIST_PROJECTS, LIST_SOCIAL_LINKS, GET_SITE_SETTINGS } from './lib/queries';
import { Project, SocialLink, SiteSettings } from './lib/types';
import HomeClient from './home-client';

async function getProjects(): Promise<Project[]> {
  try {
    const data: { listProjects: { data: Project[] } } =
      await webiny.request(LIST_PROJECTS);
    return data.listProjects.data;
  } catch {
    return [];
  }
}

async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const data: { listSocialLinks: { data: SocialLink[] } } =
      await webiny.request(LIST_SOCIAL_LINKS);
    return data.listSocialLinks.data;
  } catch {
    return [];
  }
}

async function getSiteSettings(): Promise<SiteSettings['values'] | null> {
  try {
    const data: { listSiteSettings: { data: SiteSettings[] } } =
      await webiny.request(GET_SITE_SETTINGS);
    const entries = data.listSiteSettings.data;
    return entries.length > 0 ? entries[0].values : null;
  } catch {
    return null;
  }
}

export default async function Home() {
  const [projects, socialLinks, siteSettings] = await Promise.all([
    getProjects(),
    getSocialLinks(),
    getSiteSettings(),
  ]);

  return (
    <HomeClient
      projects={projects}
      socialLinks={socialLinks}
      siteSettings={siteSettings}
    />
  );
}
