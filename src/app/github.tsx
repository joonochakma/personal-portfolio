import GithubIcon from './icons/githubIcon';

function Github() {
  return (
    <div className=" flex flex-1 border-solid border-2 ">
      <a href="https://github.com/joonochakma" aria-label="Go to GitHub">
        <GithubIcon colour="white" />

        <h1 className="font-thin font-Inter">Github</h1>
      </a>
    </div>
  );
}

export default Github;
