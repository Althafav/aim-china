import Globals from "@/modules/Globals";
import Head from "next/head";

export default function HeaderComponent() {
  const version = Date.now(); // unique version for each refresh/deploy

  return (
    <>
      <link
        href={`${Globals.BASE_URL}assets/css/owl.carousel.min.css`}
        rel="stylesheet"
      />
      <link
        href={`/assets/css/main.min.css?v=${version}`}
        rel="stylesheet"
      />
    </>
  );
}
