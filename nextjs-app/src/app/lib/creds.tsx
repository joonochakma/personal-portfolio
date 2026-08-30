import { Certification } from './types';

interface CredsProps {
  certifications: Certification[];
  heading: string;
  description: string;
}

// Default certifications if CMS returns empty
const defaultCertifications: Certification[] = [
  {
    id: 'default-1',
    values: {
      title: 'AWS Certified Developer Associate',
      badgeImage: '/aws-certified-developer-associate.png',
      credlyUrl:
        'https://www.credly.com/badges/2523e773-0a04-41e1-8c5f-afc6a3d8e04b/public_url',
      altText: 'AWS Certified Developer Associate',
      order: 1,
    },
  },
  {
    id: 'default-2',
    values: {
      title: 'AWS Certified Cloud Practitioner',
      badgeImage: '/aws-certified-cloud-practitioner.png',
      credlyUrl:
        'https://www.credly.com/badges/de6ed83c-664a-409b-90d3-00ad08a02d59/public_url',
      altText: 'AWS Certified Cloud Practitioner',
      order: 2,
    },
  },
  {
    id: 'default-3',
    values: {
      title: 'CCNA: Introduction to Networks',
      badgeImage: '/ccna-introduction-to-networks.png',
      credlyUrl:
        'https://www.credly.com/badges/1d1c43a6-5d73-474d-adf4-a825b7a6b226/public_url',
      altText: 'CCNA: Introduction to Networks',
      order: 3,
    },
  },
];

export default function Certifications({
  certifications,
  heading,
  description,
}: CredsProps) {
  const certs =
    certifications.length > 0 ? certifications : defaultCertifications;

  // Sort by order field
  const sortedCerts = [...certs].sort(
    (a, b) => a.values.order - b.values.order
  );

  return (
    <div className="dark:bg-black bg-white dark:text-white text-black my-28 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="light:text-black dark:text-white animate-fade-down text-4xl font-semibold tracking-tight sm:text-5xl">
              {heading}
            </h2>

            <p className="animate-fade font-Inter mt-6 text-lg leading-8 light:text-black dark:text-gray-300">
              {description}
            </p>
          </div>

          <div className="mx-auto grid w-full max-w-xl grid-cols-2 gap-12 lg:max-w-none lg:pl-8">
            {sortedCerts.map((cert, index) => (
              <a
                key={cert.id}
                href={cert.values.credlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`animate-fade-up ${
                  index > 0 ? `animate-delay-${index * 100 + 100}` : ''
                } group flex justify-center`}
              >
                <img
                  src={cert.values.badgeImage}
                  alt={cert.values.altText}
                  className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
