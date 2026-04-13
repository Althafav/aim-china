import ButtonComponent from "@/components/Button/ButtonComponent";
import React from "react";

export default function CTABlockComponent(props: any) {
  const bannerStyle = {
    backgroundImage: "url(/assets/imgs/2026/aim2026-bannerpattern.svg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "300px",
  };

  return (
    <div className="ctablock-component-wrapper my-5">
      <div className="container text-white py-3">
        <div className="row justify-content-center h-100">
          <div className="col-lg-10 ">
            <div className=" d-flex flex-wrap gap-3 justify-content-between">
              <h2 className="theme-gradient-text-2">{props.heading}</h2>

              <div>
                <ButtonComponent
                  name={props.buttonName}
                  link={props.buttonLink}
                  target={props.buttonTarget}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
