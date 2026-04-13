import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Featuresandactivitiespage } from "@/models/featuresandactivitiespage";

import Globals from "@/modules/Globals";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";

type PageProps = {
  pageData: Featuresandactivitiespage | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <div className="black-replacer-nav"></div>
      <div className="features-activities-page py-5">
        <div className="container">
          <div className="mb-4 col-lg-8">
            <h1 className="display-4 text-black mb-3">
              {pageData.bannerheading.value}
            </h1>
            <p className="lead">{pageData.bannersubheading.value}</p>
          </div>

          {pageData.featuresitems.value.length > 0 && (
            <div className="d-flex flex-column gap-4">
              {pageData.featuresitems.value.map((item: any, index: number) => {
                return (
                  <Link
                    href={`/features-activities/${item.slug.value}`}
                    key={index}
                    className="feature-cta-item"
                  >
                    <img
                      src={item.ctacardimage.value[0]?.url}
                      alt=""
                      style={{ objectFit: "contain" }}
                    />
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item(
      "features_and_activities_page"
    )
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
