"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaClock,
  FaCalendar,
} from "react-icons/fa6";
import Globals from "@/modules/Globals";
import Helper from "@/modules/Helper";
import SpinnerComponent from "@/components/UI/SpinnerComponent";

interface Speaker {
  ItemID: string;
  FirstName: string;
  LastName: string;
  Designation: string;
  Company: string;
  Profile: string;
  Image?: string;
  Linkedin?: string;
  Facebook?: string;
  Instagram?: string;
  Sessions?: string[];
}

export default function SpeakerDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [speaker, setSpeaker] = useState<Speaker | null>(null);
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Helper to format time
  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const [h, m] = timeString.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const hr = hour % 12 || 12;
    return `${hr}:${m} ${suffix}`;
  };

  useEffect(() => {
    if (!id) return;

    const fetchSpeakerData = async () => {
      try {
        const apiUrl = `https://speakers.aimcongress.com/api/website/GetApprovedSpeakers?eventid=2ff15d64-aa6c-4351-8b27-2828cd79ba4b`;
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Failed to fetch speakers");

        const speakers: Speaker[] = await response.json();
        const foundSpeaker = speakers.find(
          (item) => item.ItemID.toString() === id
        );

        if (foundSpeaker) {
          setSpeaker(foundSpeaker);

          // Fetch related sessions
          if (foundSpeaker.Sessions && foundSpeaker.Sessions.length > 0) {
            const sessionPromises = foundSpeaker.Sessions.map(
              async (sessionId) => {
                const sessionApi = `https://speakers.aimcongress.com/api/website/Session?SessionId=${sessionId}`;
                const res = await fetch(sessionApi);
                if (!res.ok) return null;
                return await res.json();
              }
            );

            const sessions = await Promise.all(sessionPromises);
            const filteredSessions = sessions.filter(
              (s) => s !== null
            ) as any[];
            setSessionData(filteredSessions);
          }
        } else {
          setSpeaker(null);
        }
      } catch (err) {
        console.error("Error fetching speaker:", err);
        setSpeaker(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSpeakerData();
  }, [id]);

  if (loading) return <SpinnerComponent />;

  if (!speaker)
    return (
      <div>
        <div className="black-replacer-nav" />
        <div className="container py-5">Speaker not found</div>
      </div>
    );

  return (
    <div>
      <Head>
        <title>{`AIM Congress Speaker | ${speaker.FirstName} ${speaker.LastName}`}</title>
        <meta
          name="title"
          content={`${Globals.SITE_NAME} ${speaker.FirstName} ${speaker.LastName}`}
        />
        <meta name="description" content={speaker.Profile} />
      </Head>

      <div className="black-replacer-nav" />
      <div className="speaker-detail-page pt-5 pb-5">
        <div className="container content-section-wrapper">
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/speakers-2025" className="text-primary">
                  All Speakers
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {speaker.FirstName} {speaker.LastName}
              </li>
            </ol>
          </nav>

          <div className="row g-4">
            {/* Left Column */}
            <div className="col-lg-3 col-8">
              <Image
                width={300}
                height={400}
                src={speaker.Image || "/assets/imgs/Generic_Speaker.png"}
                alt={`${speaker.FirstName} ${speaker.LastName}`}
                className="speaker-detail-img rounded mb-3"
              />

              <div className="d-flex gap-2 flex-wrap">
                {speaker.Linkedin &&
                  /^https?:\/\/(www\.)?linkedin\.com/i.test(
                    speaker.Linkedin
                  ) && (
                    <Link
                      href={speaker.Linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-black text-white p-2 rounded inline-flex items-center justify-center">
                        <FaLinkedin size={24} />
                      </div>
                    </Link>
                  )}

                {speaker.Instagram &&
                  /^https?:\/\/(www\.)?instagram\.com/i.test(
                    speaker.Instagram
                  ) && (
                    <Link
                      href={speaker.Instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-black text-white p-2 rounded inline-flex items-center justify-center">
                        <FaInstagram size={24} />
                      </div>
                    </Link>
                  )}

                {speaker.Facebook &&
                  /^https?:\/\/(www\.)?facebook\.com/i.test(
                    speaker.Facebook
                  ) && (
                    <Link
                      href={speaker.Facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="bg-black text-white p-2 rounded inline-flex items-center justify-center">
                        <FaFacebook size={24} />
                      </div>
                    </Link>
                  )}
              </div>
            </div>

            {/* Right Column */}
            <div className="col-lg-9">
              <h1 className="text-black name">
                {Helper.capitalizeString(speaker.FirstName)}{" "}
                {Helper.capitalizeString(speaker.LastName)}
              </h1>
              <p className="designation text-primary">{speaker.Designation}</p>
              <p className="company mb-3">{speaker.Company}</p>
              <p className="bio content-wrapper text-secondary">
                {speaker.Profile}
              </p>
            </div>
          </div>
        </div>

        {/* Sessions */}
        {sessionData.length > 0 && (
          <>
            <div className="bg-primary mb-3 mt-5">
              <div className="container">
                <h2 className="text-white py-2 m-0">Sessions</h2>
              </div>
            </div>

            <div className="container">
              <div className="row g-3">
                {sessionData.map((item, index) => (
                  <div className="col-12" key={index}>
                    <div className="card rounded">
                      <div className="card-body">
                        <div className="d-flex flex-wrap gap-4 mb-3">
                          <div className="d-flex align-items-center gap-2">
                            <FaClock />
                            <span>{formatTime(item.StartTime)}</span>
                          </div>
                        </div>

                        <h4 className="text-black mb-4">{item.SessionName}</h4>

                        <div
                          className="content-wrapper text-secondary"
                          dangerouslySetInnerHTML={{
                            __html: item.Description || "",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
