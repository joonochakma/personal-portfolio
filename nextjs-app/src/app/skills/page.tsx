export const dynamic = 'force-dynamic';

import { webiny } from '../lib/webiny';
import { LIST_CERTIFICATIONS, GET_SITE_SETTINGS } from '../lib/queries';
import {
  Certification,
  SiteSettings,
  SITE_SETTINGS_DEFAULTS,
} from '../lib/types';
import Creds from '../lib/creds';

async function getCertifications(): Promise<Certification[]> {
  try {
    const data: { listCertifications: { data: Certification[] } } =
      await webiny.request(LIST_CERTIFICATIONS);
    return data.listCertifications.data;
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

export default async function Skills() {
  const [certifications, siteSettings] = await Promise.all([
    getCertifications(),
    getSiteSettings(),
  ]);

  const settings = siteSettings || SITE_SETTINGS_DEFAULTS;

  return (
    <main>
      <Creds
        certifications={certifications}
        heading={settings.certificationsHeading}
        description={settings.certificationsDescription}
      />
    </main>
  );
}
