import Navlinks from './navlinks';

function Header() {
  return (
    <div className="font-Inter flex">
      <h1 className="font-Inter flex-1 pl-52">JC.</h1>
      <Navlinks />
    </div>
  );
}

export default Header;
