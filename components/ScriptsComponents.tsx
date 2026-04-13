import React, { useEffect } from "react";
import Script from "next/script";
import Globals from "@/modules/Globals";

export default function ScriptsComponents() {
  return (
    <>
      <Script
        src={`/assets/js/jquery-3.5.1.min.js`}
        strategy="beforeInteractive"
      />
      <Script
        type="text/javascript"
        src={`/assets/js/main.js`}
        strategy="beforeInteractive"
      ></Script>
      {/* <Script
        type="text/javascript"
        src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
        id="aisensy-wa-widget"
        widget-id="ZoNhVP"
      ></Script> */}
      <Script
        src={`${Globals.BASE_URL}assets/js/gtag.js`}
        strategy="beforeInteractive"
      ></Script>
    </>
  );
}
