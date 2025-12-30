import React from "react";
import { useContent } from "../context/ContentContext.jsx";

export default function Footer() {
  const { content } = useContent();
  const footer = content.footer;

  return (
    <footer className="footer" id="footer">
      <div className="container grid grid--footer">
        <div className="logo-col">
          <a href="#" className="footer-logo">
            <img
              className="logo"
              alt="Ognjište Bosansko Grahovo logo"
              src="/img/nature/logo-vektor.obrada.png"
            />
          </a>

          <ul className="social-links">
            <li>
              <a className="footer-link" href={footer.social.instagram}>
                <ion-icon className="social-icon" name="logo-instagram"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href={footer.social.facebook}>
                <ion-icon className="social-icon" name="logo-facebook"></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href={footer.social.twitter}>
                <ion-icon className="social-icon" name="logo-twitter"></ion-icon>
              </a>
            </li>
          </ul>

          <p className="copyright">{footer.copyright}</p>
        </div>
        <div className="address-col">
          <p className="footer-heading">{footer.addressTitle}</p>
          <address className="contacts">
            <p className="address">{footer.address}</p>
            <p>
              <a className="footer-link" href={`tel:${footer.phone}`}>
                {footer.phone}
              </a>
              <br />
              <a className="footer-link" href={`mailto:${footer.email}`}>
                {footer.email}
              </a>
            </p>
          </address>
        </div>
        <nav className="nav-col">
          <p className="footer-heading">{footer.leadershipTitle}</p>
          <ul className="footer-nav">
            {footer.leadership.map((item) => (
              <li key={item}>
                <a className="footer-link" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">{footer.goalsTitle}</p>
          <ul className="footer-nav">
            {footer.goals.map((item) => (
              <li key={item}>
                <a className="footer-link" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">{footer.supportTitle}</p>
          <ul className="footer-nav">
            {footer.support.map((item) => (
              <li key={item}>
                <a className="footer-link" href="#">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
