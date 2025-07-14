// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import EmailIcon from './icons/Email-Icon';
import GithubIcon from './icons/github-Icon';
import LinkedinIcon from './icons/linkedin-Icon';

function Socials() {
  const iconColour = cn('text-black', 'dark:text-white');

  const socials = [
    {
      href: 'https://github.com/joonochakma',
      label: 'Github',
      icon: <GithubIcon colour={iconColour} />,
    },
    {
      href: 'https://www.linkedin.com/in/joono-chakma-035363268/',
      label: 'Linkedin',
      icon: <LinkedinIcon />,
    },
    {
      href: 'mailto:joono+portfolio@chakma.com.au',
      label: 'Send an email',
      icon: <EmailIcon />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center sm:justify-start px-6 sm:px-12 lg:px-20 xl:px-52 animate-fade-down">
      {socials.map((social) => (
        <div
          key={social.label}
          className="group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800"
        >
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[400%] group-hover:h-[400%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>
          <a
            className="relative z-10 flex items-center dark:bg-black bg-white px-6 py-2 rounded-md transition-colors duration-500 group-hover:bg-transparent"
            href={social.href}
            aria-label={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {social.icon}
            <span className="pl-2 font-thin font-Inter whitespace-nowrap">
              {social.label}
            </span>
          </a>
        </div>
      ))}
    </div>
  );
}

export default Socials;
