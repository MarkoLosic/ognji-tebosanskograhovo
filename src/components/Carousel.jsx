import React, { useEffect, useMemo, useState } from "react";

export default function Carousel({ items, interval = 6000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const count = items.length;

  const hasItems = useMemo(() => count > 0, [count]);

  useEffect(() => {
    if (!hasItems) return () => {};

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, interval);

    return () => clearInterval(timer);
  }, [count, interval, hasItems]);

  if (!hasItems) {
    return null;
  }

  return (
    <div className="carousel slide carousel-fade">
      <ol className="carousel-indicators">
        {items.map((_, index) => (
          <li
            key={index}
            className={index === activeIndex ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          ></li>
        ))}
      </ol>
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={item.image}
            className={`carousel-item${index === activeIndex ? " active" : ""}`}
          >
            <img
              className="d-block w-100 slideshow-img"
              src={item.image}
              alt={item.alt}
            />
            <div className="carousel-caption">
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
              <div className="arrowDown">
                <a href="#ljepote">
                  <img
                    src="/img/nature/arrow.png"
                    alt="Skroluj dole"
                    width="32"
                  />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        onClick={() => setActiveIndex((prev) => (prev - 1 + count) % count)}
        type="button"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        onClick={() => setActiveIndex((prev) => (prev + 1) % count)}
        type="button"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
}
