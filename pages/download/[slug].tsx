import React, { useEffect, useState } from "react";

import Globals from "@/modules/Globals";
import { GetStaticPaths, GetStaticProps } from "next";

import SpinnerComponent from "@/components/UI/SpinnerComponent";

import { useRouter } from "next/router";
import Head from "next/head";
import { Downloadpage } from "@/models/downloadpage";

interface SlugModel {
  slug: string;
}

function DetailPage({ pageData, slug }: { pageData: any; slug: string }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <div className="download-page-wrapper">
      <Head>
        <title>{pageData.metadataPagetitle.value}</title>
        <meta name="title" content={pageData.metadataMetatitle.value} />
        <meta
          name="description"
          content={pageData.metadataMetadescription.value}
        />

        <meta property="og:title" content={pageData.metadataPagetitle.value} />
        <meta
          property="og:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          property="og:url"
          content={`https://aimcongress.cn/download${slug}`}
        />
        <meta property="og:site_name" content={Globals.SITE_NAME} />
        <meta
          property="og:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="article" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageData.metadataMetatitle.value} />
        <meta
          name="twitter:description"
          content={pageData.metadataMetadescription.value}
        />
        <meta
          name="twitter:image"
          content="https://aimcongress.cn/assets/logos/AIM Logo Vertical Blue in White.png"
        />

        <link
          rel="canonical"
          href={`https://aimcongress.cn/download${slug}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {loading && (
        <div className="">
          <SpinnerComponent />
        </div>
      )}
      <div className="black-replacer-nav" />

      <iframe
        src={pageData.pdflink.value}
        width="100%"
        height="1000px"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const datasourceStr: string = await Globals.KontentClient.items()
      .type("downloadpage")
      .withParameter("depth", "4")
      .toObservable()
      .toPromise()
      .then((r: any) => {
        return JSON.stringify(r.items);
      });

    const data: Array<Downloadpage> = JSON.parse(datasourceStr);
    const allSlugs = data.map((item) => item.slug.value?.trim());

    // 2. remove empty or undefined slugs
    const validSlugs = allSlugs.filter((s): s is string => s.length > 0);

    // 3. dedupe in case your CMS has duplicates
    const uniqueSlugs = Array.from(new Set(validSlugs));

    // 4. build your paths
    const paths = uniqueSlugs.map((slug) => ({
      params: { slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   try {
//     const datasourceStr: string = await Globals.KontentClient.items()
//       .type("downloadpage")
//       .toObservable()
//       .toPromise()
//       .then((r: any) => {
//         return JSON.stringify(r.items);
//       });

//     const data: Array<any> = JSON.parse(datasourceStr);
//     const allSlugs = data.map((item) => item.slug.value?.trim());

//     // 2. remove empty or undefined slugs
//     const validSlugs = allSlugs.filter((s): s is string => s.length > 0);

//     // 3. dedupe in case your CMS has duplicates
//     const uniqueSlugs = Array.from(new Set(validSlugs));

//     // 4. build your paths
//     const paths = uniqueSlugs.map((slug) => ({
//       params: { slug },
//     }));

//     return {
//       paths,
//       fallback: "blocking",
//     };
//   } catch (error) {
//     console.error("Error generating paths:", error);
//     return {
//       paths: [],
//       fallback: "blocking",
//     };
//   }
// };

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const { slug } = params as { slug: string };

    const response = await Globals.KontentClient.items()
      .type("downloadpage")
      .equalsFilter("elements.slug", slug)
      .withParameter("depth", "4")
      .toPromise();

    if (!response.items.length) {
      return { notFound: true };
    }

    const pageData = JSON.parse(JSON.stringify(response.items[0]));
    const pdfUrl = pageData.pdflink?.value;

    return {
      props: {
        pageData: JSON.parse(JSON.stringify(response.items[0])),
        slug,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching project data:", error);
    return { notFound: true };
  }
};

export default DetailPage;
