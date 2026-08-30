'use client';

import { useEffect, useRef } from 'react';

interface ProjectViewTrackerProps {
  slug: string;
}

/**
 * Fires a single page-view event to the analytics endpoint when a project
 * detail page mounts. Reuses the existing /pageview endpoint; the project is
 * identified by its path (/projects/{slug}). Renders nothing.
 */
export default function ProjectViewTracker({ slug }: ProjectViewTrackerProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!apiEndpoint) {
      console.warn('NEXT_PUBLIC_API_ENDPOINT not set');
      return;
    }

    sent.current = true;

    fetch(`${apiEndpoint}/pageview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: `/projects/${slug}`,
        userAgent:
          typeof navigator !== 'undefined' ? navigator.userAgent : 'unknown',
        referrer:
          typeof document !== 'undefined'
            ? document.referrer || 'direct'
            : 'direct',
        ts: Date.now(),
      }),
    })
      .then((res) => {
        console.log('Project view sent:', res.status);
      })
      .catch((err) => {
        console.error('Failed to send project view:', err);
      });
  }, [slug]);

  return null;
}
