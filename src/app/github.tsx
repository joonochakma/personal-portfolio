import cn from 'classnames';
import GithubIcon from './icons/github-Icon';

function Github() {
  const githubIconColour = cn({ white: true, black: false });
  console.log(githubIconColour);
  return (
    <div className="bg-gradient-to-r from-purple-500 from-20% via-sky-400 via-30% to-pink-500 flex flex-1 p-[1.5px]">
      <a
        className="dark:bg-black bg-white h-full w-full "
        href="https://github.com/joonochakma"
        aria-label="Go to GitHub"
      >
        <GithubIcon colour={githubIconColour} />
        <h1 className="font-thin font-Inter">Github</h1>
      </a>
    </div>
  );
}

export default Github;
