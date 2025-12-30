import React from "react";
import Carousel from "../components/Carousel.jsx";
import SectionList from "../components/SectionList.jsx";
import { useContent } from "../context/ContentContext.jsx";

export default function Planine() {
  const { content } = useContent();
  const { carousel, intro, items } = content.planine;

  return (
    <main>
      <Carousel items={carousel} />

      <section className="section-how">
        <div className="container">
          <span className="subheading">{intro.subheading}</span>
          <h5 className="heading-secondary">{intro.heading}</h5>
        </div>
        <SectionList items={items} anchorId="ljepote" />
      </section>
    </main>
  );
}
