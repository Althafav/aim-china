import React from "react";

export default function Banner2026(props: any) {
  const bannerStyle = {
    backgroundImage: "url(/assets/imgs/2026/aim2026-bannerpattern-wave.svg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "300px",
  };

  return (
    <div style={bannerStyle} className="banner2026-component">
      <div className="container text-white py-3">
        <div className="row d-flex align-items-center h-100 justify-content-center">
          <div className={`${props.className} d-flex justify-content-center flex-column`}>
            <h1 className="text-black text-black" style={{maxWidth: "1000px", lineHeight : "1.4"}}>{props.heading}</h1>
            <p className="  fw-bold text-primary">{props.subheading} </p>
          </div>
        </div>
      </div>
    </div>
  );
}
