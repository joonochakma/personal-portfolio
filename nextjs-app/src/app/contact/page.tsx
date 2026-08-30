export const dynamic = 'force-dynamic';

import { webiny } from '../lib/webiny';
import { GET_SITE_SETTINGS } from '../lib/queries';
import { SiteSettings, SITE_SETTINGS_DEFAULTS } from '../lib/types';
import CopyEmailButton from './copy-email-button';

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

export default async function Contact() {
  const siteSettings = await getSiteSettings();
  const settings = siteSettings || SITE_SETTINGS_DEFAULTS;

  return (
    <CopyEmailButton
      email={settings.contactEmail}
      heading={settings.contactHeading}
      subtext={settings.contactSubtext}
    />
  );
}
