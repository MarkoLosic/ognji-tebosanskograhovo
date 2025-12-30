import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleNavClick = () => {
    setNavOpen(false);
  };

  const scrollToFooter = (event) => {
    event.preventDefault();
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
    setNavOpen(false);
  };

  return (
    <header className={`header${navOpen ? " nav-open" : ""}`}>
      <img
        className="logo"
        src="/img/nature/logo-vektor.obrada.png"
        alt="Ognjište Bosansko Grahovo"
      />
      <nav className="main-nav">
        <ul className="main-nav-list">
          <li>
            <NavLink className="main-nav-link" to="/" onClick={handleNavClick}>
              Početna strana
            </NavLink>
          </li>
          <li>
            <NavLink
              className="main-nav-link"
              to="/sela"
              onClick={handleNavClick}
            >
              Grad i sela
            </NavLink>
          </li>
          <li>
            <NavLink
              className="main-nav-link"
              to="/planine"
              onClick={handleNavClick}
            >
              Planine
            </NavLink>
          </li>
          <li>
            <NavLink
              className="main-nav-link"
              to="/galerija"
              onClick={handleNavClick}
            >
              Galerija
            </NavLink>
          </li>
          <li>
            <a className="main-nav-link" href="#footer" onClick={scrollToFooter}>
              O nama
            </a>
          </li>
          <li>
            <a
              className="main-nav-link nav-cta"
              href="#footer"
              onClick={scrollToFooter}
            >
              Kontaktirajte nas
            </a>
          </li>
        </ul>
      </nav>
      <button
        className="btn-mobile-nav"
        aria-label="Otvori navigaciju"
        onClick={() => setNavOpen((prev) => !prev)}
      >
        <ion-icon className="icon-mobile-nav" name="menu-outline"></ion-icon>
        <ion-icon className="icon-mobile-nav" name="close-outline"></ion-icon>
      </button>
    </header>
  );
}
