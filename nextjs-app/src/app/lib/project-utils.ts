import { Project } from './types';

/**
 * Determine whether a href points to an external site.
 * External = starts with http:// or https:// (i.e. not an internal Next route).
 */
export function isExternalHref(href: string | undefined | null): boolean {
  if (!href) return false;
  return /^https?:\/\//i.test(href);
}

/**
 * Basic check for whether a string looks like a usable image source.
 * Accepts internal paths (/foo.png) and http(s) URLs. This does not guarantee
 * the resource is actually an image, but filters out obviously empty values.
 */
export function hasImage(src: string | undefined | null): boolean {
  return typeof src === 'string' && src.trim().length > 0;
}

/**
 * Fetch all projects from the CMS. Returns an empty array on any failure
 * so pages degrade gracefully instead of throwing.
 */
export async function fetchProjects(
  request: () => Promise<{ listProjects: { data: Project[] } }>
): Promise<Project[]> {
  try {
    const data = await request();
    return data.listProjects?.data ?? [];
  } catch (err) {
    console.error('Failed to fetch projects from CMS:', err);
    return [];
  }
}
