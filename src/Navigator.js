import "./Navigator.css"

function Navigator({ onAboutClick }) {
  return (
    <div>
      <ul className="Navigator">
        <li onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Home
        </li>
        <li onClick={onAboutClick}>
          About Us
        </li>
      </ul>
    </div>
  )
}

export default Navigator;