import Navigator from "./Navigator";
import LoginRegistration from "./Login";
import "./Navbar.css"

function Navbar({ onAboutClick }) {
  return (
    <div className="navbar">
      <Navigator onAboutClick={onAboutClick} />
      <LoginRegistration />
    </div>
  )
}

export default Navbar;