import React from "react";
import { splitParagraphs } from "../utils/text.js";

export default function SectionList({ items, anchorId = "ljepote" }) {
  return (
    <div className="container grid grid--2-cols grid--center-v">
      {items.map((item, index) => {
        const textBox = (
          <div
            key={`${item.title}-text`}
            className="step-text-box"
            id={index === 0 ? anchorId : undefined}
          >
            <p className="step-number">{item.number}</p>
            <h3 className="heading-tertiary">
              <b>{item.title}</b>
            </h3>
            {splitParagraphs(item.description).map((paragraph, paragraphIndex) => (
              <p
                key={`${item.title}-${paragraphIndex}`}
                className="step-description"
              >
                {paragraph}
              </p>
            ))}
          </div>
        );

        const imageBox = (
          <div key={`${item.title}-image`} className="step-img-box">
            <img src={item.image} className="step-img" alt={item.alt} />
          </div>
        );

        return index % 2 === 0 ? (
          <React.Fragment key={item.title}>
            {textBox}
            {imageBox}
          </React.Fragment>
        ) : (
          <React.Fragment key={item.title}>
            {imageBox}
            {textBox}
          </React.Fragment>
        );
      })}
    </div>
  );
}
