import React, { useEffect } from "react";
import MenuComponent from "./MenuComponent";
import FooterComponent from "./FooterComponent";
import { useRouter } from "next/router";
import SolidMenuComponent from "./Portfolio/startup/SolidMenuComponent";
import MetaTagsComponent from "./MetaTagsComponent";
import Script from "next/script";
import Globals from "@/modules/Globals";
import MenuComponent2 from "./revamp/MenuComponent2";
import ScriptsComponents from "./ScriptsComponents";
import MenuComponent3 from "./Menu/2026/MenuComponent3";

export default function LayoutComponent({ children }: any) {
  const router = useRouter();
  const isRegisterInterestRoute =
    router.pathname.startsWith("/register-interest");
     const isFormsRoute =
    router.pathname.startsWith("/forms");

  return (
    <React.Fragment>
      <MetaTagsComponent />
      {/* <MenuComponent /> */}

      {!isRegisterInterestRoute && !isFormsRoute && <MenuComponent3 />}
      {children}
      {!isRegisterInterestRoute && !isFormsRoute && <FooterComponent />}

      <ScriptsComponents />
    </React.Fragment>
  );
}
