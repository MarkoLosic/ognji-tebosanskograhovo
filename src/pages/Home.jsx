import React from "react";
import { useContent } from "../context/ContentContext.jsx";
import SectionList from "../components/SectionList.jsx";

export default function Home() {
  const { content } = useContent();
  const { hero, highlights, villages } = content.home;

  return (
    <main>
      <section className="section-hero">
        <div className="hero">
          <div className="hero-txt-box">
            <h1 className="heading-primary">{hero.title}</h1>
            <p className="hero-description">{hero.description}</p>
            <a href="#footer" className="btn btn--full margin-right-sm">
              {hero.ctaPrimary}
            </a>
            <a href="#ljepote" className="btn btn--outline">
              {hero.ctaSecondary}
            </a>
            <div className="delivered-meals">
              <div className="deliverd">
                {hero.membersImages.map((image) => (
                  <img key={image} src={image} alt="Član društva" />
                ))}
              </div>
              <p className="deliverd-text">
                <span>{hero.membersCount}</span> {hero.membersLabel}
              </p>
            </div>
          </div>
          <div className="hero-image-box">
            <img className="hero-image" src={hero.heroImage} alt={hero.heroAlt} />
          </div>
        </div>
      </section>

      <section className="section-how">
        <div className="container">
          <span className="subheading">{highlights.subheading}</span>
          <h2 className="heading-secondary">{highlights.heading}</h2>
        </div>
        <SectionList items={highlights.items} anchorId="ljepote" />
      </section>

      <section className="section-how">
        <div className="container">
          <span className="subheading">{villages.subheading}</span>
          <h2 className="heading-secondary">{villages.heading}</h2>
        </div>
        <SectionList items={villages.items} />
      </section>
    </main>
  );
}
