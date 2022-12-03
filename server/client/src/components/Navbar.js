import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="header-bg">
      <div className="container">
        <Link to="/">
          <div className="head">Buboo Note Web</div>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
