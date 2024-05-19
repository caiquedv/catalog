import Link from "next/link";
import { Navbar } from "reactstrap";

const Header = () => {
  return (
    <Navbar container="md" color="dark" dark>
      <Link legacyBehavior href="/" passHref>
        <a className="navbar-brand">
          Avance Importados
        </a>
      </Link>
    </Navbar>
  )
}

export default Header