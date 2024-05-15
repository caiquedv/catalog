import Link from "next/link";
import { Nav, Navbar } from "reactstrap";

const Header = () => {
  return (
    <Navbar container="md" color="dark" dark>
      <Link legacyBehavior href="/" passHref>
        <a className="navbar-brand">
          Avance
        </a>
      </Link>
    </Navbar>
  )
}

export default Header