// pages/matchmaking.tsx

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Globals from "@/modules/Globals";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import { Matchmakingpage2026 } from "@/models/matchmakingpage2026";
import { Matchmakingitem } from "@/models/matchmakingitem";
import Link from "next/link";
import Banner2026Component from "@/components/UI/Banner/Banner2026";
import CTABlockComponent from "@/components/UI/CTABlock/CTABlockComponent";
import { Ctablock } from "@/models/ctablock";
import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";

type Entity = "Business" | "Government" | "Investor" | "Project";

export default function MatchmakingPage({
  pageData,
}: {
  pageData: Matchmakingpage2026;
}) {
  // 1) Entities & their 1-letter codes
  const entities: Entity[] = ["Business", "Government", "Investor", "Project"];
  const codeMap: Record<Entity, string> = {
    Business: "B",
    Government: "G",
    Investor: "I",
    Project: "P",
  };

  const [selectedFrom, setSelectedFrom] = useState<Entity | "">("");
  const [selectedTo, setSelectedTo] = useState<Entity | "">("");

  const filteredItems = useMemo(() => {
    if (!selectedFrom && !selectedTo) {
      return pageData.matchmakingitems.value as Matchmakingitem[];
    }

    if (selectedFrom && selectedTo) {
      const desiredCode = `${codeMap[selectedFrom]}2${codeMap[selectedTo]}`;
      return (pageData.matchmakingitems.value as Matchmakingitem[]).filter(
        (item) => {
          const raw = item.code.value[0];
          const codeString =
            typeof raw === "string" ? raw : (raw as any).name || "";
          return codeString === desiredCode;
        }
      );
    }

    return [];
  }, [selectedFrom, selectedTo, pageData.matchmakingitems.value]);

  if (!pageData) {
    return <SpinnerComponent />;
  }

  return (
    <>
      <Head>
        <title>Matchmaking</title>
      </Head>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="matchmaking-page-wrapper"
      >
        <div className="black-replacer-nav"></div>
        <HeaderBanner2026
          heading={pageData.bannerheading.value}
          subheading={pageData.bannersubheading.value}
          className="col-lg-10"
        />

        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row ">
                <div className="col-md-6 mb-3">
                  <label htmlFor="fromSelect" className="form-label">
                    Your Entity
                  </label>
                  <select
                    id="fromSelect"
                    className="form-select"
                    value={selectedFrom}
                    onChange={(e) => {
                      setSelectedFrom(e.target.value as Entity);
                      setSelectedTo("");
                    }}
                  >
                    <option value="">— select —</option>
                    {entities.map((ent) => (
                      <option key={ent} value={ent}>
                        {ent}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6 mb-3">
                  <label htmlFor="toSelect" className="form-label">
                    Your Preferred Entity
                  </label>
                  <select
                    id="toSelect"
                    className="form-select"
                    value={selectedTo}
                    onChange={(e) => setSelectedTo(e.target.value as Entity)}
                    disabled={!selectedFrom}
                  >
                    <option value="">— select —</option>
                    {entities.map((ent) => (
                      <option key={ent} value={ent}>
                        {ent}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredItems.length > 0 ? (
                <div className="row g-5 py-5">
                  {filteredItems.map((item) => (
                    <div key={item.system.id} className="col-12">
                      <h3 className="text-black mb-2">{item.name.value}</h3>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: item.content.value,
                        }}
                      />
                      <div className="mt-4">
                        <Link
                          href={item.link.value}
                          className="px-4 py-2 bg-black text-white rounded-pill"
                        >
                          {item.buttonname.value}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : selectedFrom && selectedTo ? (
                <p>
                  No items found for “{selectedFrom} → {selectedTo}.”
                </p>
              ) : (
                <p>
                  Pick both “Your Entity” and “Your Preferred Entity” to filter,
                  or leave blank to see all.
                </p>
              )}
            </div>
          </div>
        </div>
        {pageData.ctablock.value &&
          pageData.ctablock.value.map((m: any, index: number) => {
            const item: Ctablock = m;
            return (
              <div className="cta-block-wrapper container" key={index}>
                <CTABlockComponent
                  heading={item.name.value}
                  buttonName={item.ctabuttonname.value}
                  buttonLink={item.ctabuttonlink.value}
                  buttonTarget={
                    item.isexternal.value[0]?.name === "yes"
                      ? "_blank"
                      : "_self"
                  }
                />
              </div>
            );
          })}
      </motion.div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const { locale } = context;
  const languageCode = locale === "cn" ? "China" : "default";

  const datasourceStr = await Globals.KontentClient.item(
    "match_making_page___china"
  )
    .languageParameter(languageCode)
    .withParameter("depth", "4")
    .toObservable()
    .toPromise()
    .then((r: any) => JSON.stringify(r.item));

  const pageData: Matchmakingpage2026 = JSON.parse(datasourceStr);

  return {
    props: { pageData },
    revalidate: 120,
  };
}
