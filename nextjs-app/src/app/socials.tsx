import cn from 'classnames';
import Link from 'next/link';
import EmailIcon from './icons/Email-Icon';
import GithubIcon from './icons/github-Icon';
import LinkedinIcon from './icons/linkedin-Icon';
import { SocialLink } from './lib/types';

// Map iconName values from CMS to React icon components
function getIcon(iconName: string, iconColour: string): React.ReactNode | null {
  switch (iconName) {
    case 'github':
      return <GithubIcon colour={iconColour} />;
    case 'linkedin':
      return <LinkedinIcon />;
    case 'email':
      return <EmailIcon />;
    default:
      return null;
  }
}

interface SocialsProps {
  socialLinks?: SocialLink[];
}

function Socials({ socialLinks }: SocialsProps) {
  const iconColour = cn('text-black', 'dark:text-white');

  // Fallback to default hardcoded links if no CMS data
  const defaultLinks: SocialLink[] = [
    {
      id: 'default-github',
      values: {
        href: 'https://github.com/joonochakma',
        label: 'Github',
        iconName: 'github',
        isExternal: true,
        order: 1,
      },
    },
    {
      id: 'default-linkedin',
      values: {
        href: 'https://www.linkedin.com/in/joono-chakma-035363268/',
        label: 'Linkedin',
        iconName: 'linkedin',
        isExternal: true,
        order: 2,
      },
    },
    {
      id: 'default-email',
      values: {
        href: '/contact',
        label: 'Get in touch',
        iconName: 'email',
        isExternal: false,
        order: 3,
      },
    },
  ];

  const links =
    socialLinks && socialLinks.length > 0 ? socialLinks : defaultLinks;

  // Sort by order field
  const sortedLinks = [...links].sort(
    (a, b) => a.values.order - b.values.order
  );

  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start px-6 sm:px-12 lg:px-20 xl:px-52 animate-fade-down">
      {sortedLinks.map((social) => {
        const icon = getIcon(social.values.iconName, iconColour);
        if (!icon) return null;

        return (
          <div
            key={social.id}
            className="group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800"
          >
            <div className="absolute inset-0 z-0 flex items-center justify-center">
              <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[400%] group-hover:h-[400%] group-hover:scale-100 transition-all duration-700 ease-out" />
            </div>
            {social.values.isExternal ? (
              <a
                className="relative z-10 flex items-center dark:bg-black bg-white px-6 py-2 rounded-md transition-colors duration-500 group-hover:bg-transparent"
                href={social.values.href}
                aria-label={social.values.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
                <span className="pl-2 font-thin font-Inter whitespace-nowrap">
                  {social.values.label}
                </span>
              </a>
            ) : (
              <Link
                className="relative z-10 flex items-center dark:bg-black bg-white px-6 py-2 rounded-md transition-colors duration-500 group-hover:bg-transparent"
                href={social.values.href}
                aria-label={social.values.label}
              >
                {icon}
                <span className="pl-2 font-thin font-Inter whitespace-nowrap">
                  {social.values.label}
                </span>
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Socials;
