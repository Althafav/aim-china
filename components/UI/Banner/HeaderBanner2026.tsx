import React from "react";

export default function HeaderBanner2026({
  heading,
  subheading,
  className,
}: any) {
  return (
    <div className="headerbanner-component-wrapper">
      <div className="container">
        <div className="row justify-content-center">
          <div className={`${className} col-lg-10`}>
            <h1
              className="text-black text-black"
              style={{ maxWidth: "1000px", lineHeight: "1.2" }}
            >
              {heading}
            </h1>
            <p className="text-secondary">{subheading} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
