import { Basiccontentpage } from "@/models/basiccontentpage";
import Globals from "@/modules/Globals";
import Head from "next/head";
import React from "react";
import { motion, useInView } from "framer-motion";
import Banner2026 from "@/components/UI/Banner/Banner2026";

export async function getStaticProps() {
  const datasourceStr: string = await Globals.KontentClient.item(
    "annual_investment_meeting_privacy_policy"
  )
    .languageParameter(Globals.CURRENT_LANG_CODENAME)
    .toObservable()
    .toPromise()
    .then((r: any) => {
      return JSON.stringify(r.item);
    });

  const data: Basiccontentpage = JSON.parse(datasourceStr);

  return {
    props: {
      data,
    },
    revalidate: 120,
  };
}

function ListPage({ data }: { data: Basiccontentpage }) {
  return (
    <React.Fragment>
      <Head>
        <title>{`${Globals.SITE_NAME} | ${data.pageTitle.value}`}</title>
        <meta name="title" content={data.metaTitle.value} />
        <meta name="description" content={data.metaDescription.value} />
        <meta name="keywords" content={data.metaTitle.value} />

        <meta property="og:title" content={data.metaTitle.value} />
        <meta property="og:type" content="article" />
        <meta
          property="og:image"
          content={`${Globals.BASE_URL}assets/imgs/aim-logo-thumbnail.png`}
        />
        <meta property="og:url" content={`${Globals.BASE_URL}privacy-policy`} />
        <meta
          name="twitter:card"
          content={`${Globals.BASE_URL}assets/imgs/aim-logo-thumbnail.png`}
        />

        <meta property="og:description" content={data.metaDescription.value} />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta name="twitter:image:alt" content={data.metaTitle.value} />
        <link href={`${Globals.BASE_URL}privacy-policy`} rel="canonical" />
      </Head>

      <div className="black-replacer-nav"></div>
      <Banner2026 heading={data.heading.value} className="col-lg-10" />

      <div className="privacy-policy-page ">
        <div className="container mt-5 mb-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <span
                className="text-justify "
                dangerouslySetInnerHTML={{ __html: data.content.value }}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ListPage;
