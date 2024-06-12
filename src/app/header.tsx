import Navlinks from './navlinks';

function Header() {
  return (
    <div className="font-Inter font-thin flex text-2xl">
      <h1 className="font-Inter flex-1 pl-52">JC.</h1>
      <Navlinks />
    </div>
  );
}

export default Header;
