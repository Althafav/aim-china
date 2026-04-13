import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import SpinnerComponent from "@/components/UI/SpinnerComponent";
import conferenceSpeakerModel2025 from "@/sysmodels/speakers2025";
import SpeakerPopupModal from "./SpeakerPopupModal";

function normalize(s?: string) {
  return (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<conferenceSpeakerModel2025[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typedTerm, setTypedTerm] = useState(""); // for debounce
  const [loaded, setisLoaded] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);
  useEffect(() => {
    const fetchSpeakers = async () => {
      const res = await fetch("/api/speakers-2025");
      const data = await res.json();
      setSpeakers(data);
      setisLoaded(true);
    };
    fetchSpeakers();
  }, []);

  // Debounce search (200ms)
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(typedTerm), 200);
    return () => clearTimeout(id);
  }, [typedTerm]);

  const filtered = useMemo(() => {
    const q = normalize(searchTerm).trim();
    if (!q) return speakers;

    // support multi-word matching: all words must appear somewhere
    const parts = q.split(/\s+/);

    const matches = (spk: conferenceSpeakerModel2025) => {
      const blob = normalize(
        [spk.FirstName, spk.LastName, spk.Designation, spk.Company, spk.Country]
          .filter(Boolean)
          .join(" ")
      );
      return parts.every((p) => blob.includes(p));
    };

    return speakers.filter(matches);
  }, [speakers, searchTerm]);

  const filteredHigh = filtered.filter((s) => s.HighLevel);
  const filteredRegular = filtered.filter((s) => !s.HighLevel);

  if (!loaded) return <SpinnerComponent />;

  const openPopup = (speaker: any) => {
    setSelectedSpeaker(speaker);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedSpeaker(null);
    setIsPopupOpen(false);
  };
  return (
    <div className="speaker-page-wrapper speaker2025 speakers-page-wrapper-2025v2">
      <Head>
        <title>AIM Congress | Speakers</title>
        <meta name="title" content="AIM Congress | Speakers" />
        <meta name="description" content="Speakers" />
      </Head>

      <div className="black-replacer-nav"></div>

      <div className="speaker-cards-section speaker-component-wrapper-2026 pt-5 pb-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-11">
              {/* Search bar (global) */}
              <div className="row align-items-center justify-content-between mb-4 g-2">
                <div className="col-12 col-lg-6">
                  <h2 className="m-0">High Level Speakers</h2>
                </div>
                <div className="col-12 col-lg-4">
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control rounded-3xl"
                      placeholder="Search"
                      value={typedTerm}
                      onChange={(e) => setTypedTerm(e.target.value)}
                    />
                    {typedTerm && (
                      <button
                        type="button"
                        className="text-white bg-transparent"
                        onClick={() => {
                          setTypedTerm("");
                          setSearchTerm("");
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="row g-3">
                {filtered.length === 0 ? (
                  <div className="col-12">
                    <p className="mt-3 text-white">
                      No speakers found for <strong>{searchTerm}</strong>.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* High Level Speakers */}
                    {filteredHigh.length > 0 && (
                      <>
                        {filteredHigh.map((item) => (
                          <div
                            className="col-lg-3 col-6"
                            key={item.ItemID}
                            onClick={() => openPopup(item)}
                          >
                            <div className="text-white">
                              <div>
                                <div className="card-speaker-item border h-100">
                                  <div
                                    className="speaker-image-wrapper"
                                    style={{ height: "320px" }}
                                  >
                                    <img
                                      width={290}
                                      height={300}
                                      src={item.Image}
                                      alt={item.FirstName}
                                      className="speaker-image-2025"
                                      style={{
                                        objectFit: "cover",
                                        height: "100%",
                                        objectPosition: "center",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className="py-2">
                                  <p className="fw-bold">
                                    {item.FirstName} {item.LastName}
                                  </p>
                                  <p
                                    className="designation small mb-2"
                                    style={{ fontSize: 14 }}
                                  >
                                    {item.Designation}
                                  </p>
                                  <p
                                    className="text-white"
                                    style={{ fontSize: 14 }}
                                  >
                                    {item.Company}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </>
                    )}

                    {/* Regular Speakers */}
                    {filteredRegular.length > 0 && (
                      <>
                        {filteredHigh.length > 0 && (
                          <h3 className="col-12 mt-5 mb-3">Speakers</h3>
                        )}
                        {filteredRegular.map((item) => (
                          <div className="col-lg-3 col-6" key={item.ItemID}>
                            <Link href={`/speaker/${item.ItemID}`}>
                              <div className="card-speaker-item border h-100">
                                <div
                                  className="speaker-image-wrapper"
                                  style={{ height: "320px" }}
                                >
                                  <img
                                    width={290}
                                    height={300}
                                    src={
                                      item.Image ||
                                      "/assets/imgs/Generic_Speaker.png"
                                    }
                                    alt={item.FirstName}
                                    className="speaker-image-2025"
                                    style={{
                                      objectFit: "cover",
                                      height: "100%",
                                      objectPosition: "center",
                                    }}
                                  />
                                  <div className="card-body-speaker-floating">
                                    <p
                                      className="name small"
                                      style={{ fontSize: 14 }}
                                    >
                                      {item.FirstName} {item.LastName}
                                    </p>
                                    <p
                                      className="designation small"
                                      style={{ fontSize: 14 }}
                                    >
                                      {item.Designation}
                                    </p>
                                    <p
                                      className="text-black"
                                      style={{ fontSize: 14 }}
                                    >
                                      {item.Company}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <SpeakerPopupModal
        speaker={selectedSpeaker}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </div>
  );
}
