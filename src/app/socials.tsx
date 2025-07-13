// eslint-disable-next-line import/no-extraneous-dependencies
import cn from 'classnames';
import EmailIcon from './icons/Email-Icon';
import GithubIcon from './icons/github-Icon';
import LinkedinIcon from './icons/linkedin-Icon';

function Socials() {
  const githubIconColour = cn('text-black', 'dark:text-white');
  const linkedinIconColour = cn('text-black', 'dark:text-white');
  const EmailIconColour = cn('text-black', 'dark:text-white');

  return (
    <div className="flex flex-row pl-52 animate-fade-down">
      <div className="w-xs pr-4">
        <div className="group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-purple-600 via-sky-400 to-pink-500">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-purple-600 via-sky-400 to-pink-500 rounded-full w-0 h-0 scale-0 group-hover:w-[400%] group-hover:h-[400%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>
          <a
            className="relative z-10 flex items-center dark:bg-black bg-white px-10 py-2 h-full rounded-md transition-colors duration-500 group-hover:bg-transparent"
            href="https://github.com/joonochakma"
            aria-label="Go to GitHub"
          >
            <GithubIcon colour={githubIconColour} />
            <h1 className="pl-2 font-thin font-Inter">Github</h1>
          </a>
        </div>
      </div>

      <div className="w-xs pr-4">
        <div className="group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[400%] group-hover:h-[400%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>
          <a
            className="relative z-10 flex items-center dark:bg-black bg-white px-10 py-2 h-full rounded-md transition-colors duration-500 group-hover:bg-transparent"
            href="https://www.linkedin.com/in/joono-chakma-035363268/"
            aria-label="Go to Linkedin"
          >
            <LinkedinIcon />
            <h1 className="pl-2 font-thin font-Inter">Linkedin</h1>
          </a>
        </div>
      </div>
      <div className="w-xs pr-4">
        <div className="group relative p-[1.5px] overflow-hidden rounded-md bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800">
          <div className="absolute inset-0 z-0 flex items-center justify-center">
            <div className="bg-gradient-to-r from-sky-400 via-pink-500 to-purple-800 rounded-full w-0 h-0 scale-0 group-hover:w-[400%] group-hover:h-[400%] group-hover:scale-100 transition-all duration-700 ease-out" />
          </div>
          <a
            className="relative z-10 flex items-center dark:bg-black bg-white px-10 py-2 h-full rounded-md transition-colors duration-500 group-hover:bg-transparent"
            href="mailto:joono+portfolio@chakma.com.au"
            aria-label="Send an email"
          >
            <EmailIcon />
            <h1 className="pl-2 font-thin font-Inter">Send an email</h1>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Socials;
