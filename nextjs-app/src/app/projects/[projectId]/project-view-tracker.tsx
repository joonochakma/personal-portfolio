'use client';

import { useEffect, useRef } from 'react';

interface ProjectViewTrackerProps {
  projectId: string;
  slug: string;
  title: string;
}

/**
 * Fires a single project-view event to the analytics endpoint when a
 * project detail page mounts. Renders nothing.
 */
export default function ProjectViewTracker({
  projectId,
  slug,
  title,
}: ProjectViewTrackerProps) {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;

    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!apiEndpoint) {
      console.warn('NEXT_PUBLIC_API_ENDPOINT not set');
      return;
    }

    sent.current = true;

    fetch(`${apiEndpoint}/projectview`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId,
        slug,
        title,
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
  }, [projectId, slug, title]);

  return null;
}
