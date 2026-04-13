import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import SpeakerPopupBannerBS5 from "./SpeakerPopupBannerBS5";
import Image from "next/image";

interface PageDataProps {
  eventId: string;
  colorCode?: string;
}

type Day = {
  ItemID: number;
  Name: string;
  ArabicName: string;
  Date: string;
  ItemOrder: number;
  EventId: string;
};

type Speaker = {
  Id: string;
  Name: string;
  JobTitle: string;
  Organization: string;
  Image: string;
  Role: string;
  Description: string;
  FacebookProfileURL: string;
  InstagramProfileURL: string;
  TwitterProfileURL: string;
  LinkedInProfileURL: string;
};

type Session = {
  SessionName: string;
  SessionNameArabic: string;
  StartTime: string;
  EndTime: string;
  Description: string;
  DescriptionArabic: string;
  Room: string;
  SessionType: string;
  Track: string;
  SessionPartners: any[];
  Speakers: Speaker[];
};

type FiltersResponse = {
  Days: Day[];
};

function to12h(t: string) {
  const [hh, mm] = t.split(":").map(Number);
  const date = new Date();
  date.setHours(hh, mm || 0, 0, 0);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

const AgendaComponent: React.FC<PageDataProps> = ({ eventId }) => {
  const { locale } = useRouter();
  const [days, setDays] = useState<Day[] | null>(null);
  const [selectedDayId, setSelectedDayId] = useState<number | null>(null);

  const [sessionsCache, setSessionsCache] = useState<Record<number, Session[]>>(
    {}
  );
  const [loadingSessions, setLoadingSessions] = useState<boolean>(false);
  const [errorSessions, setErrorSessions] = useState<string | null>(null);

  const [selectedType, setSelectedType] = useState<string>("All");

  const abortRef = useRef<AbortController | null>(null);

  const [selectedSpeaker, setSelectedSpeaker] = useState<any | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // Load days
  useEffect(() => {
    const loadDays = async () => {
      try {
        const res = await fetch(
          `https://speakers.aimcongress.com/api/website/AgendaFilters?EventId=${encodeURIComponent(
            eventId
          )}`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`Failed to load days (${res.status})`);
        const data: FiltersResponse = await res.json();
        const sorted = [...data.Days].sort((a, b) => a.ItemOrder - b.ItemOrder);
        setDays(sorted);
        if (sorted.length > 0) setSelectedDayId(sorted[0].ItemID);
      } catch (err: any) {
        console.log(err);
      }
    };
    loadDays();
  }, [eventId]);

  // Load sessions for selected day
  useEffect(() => {
    if (!selectedDayId) return;
    if (sessionsCache[selectedDayId]) return;

    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;

    const loadSessions = async () => {
      setLoadingSessions(true);
      setErrorSessions(null);
      try {
        const url = `https://speakers.aimcongress.com/api/website/agenda?EventId=${encodeURIComponent(
          eventId
        )}&DayId=${selectedDayId}`;
        const res = await fetch(url, {
          signal: ctrl.signal,
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`Failed to load sessions (${res.status})`);
        const data: Session[] = await res.json();
        setSessionsCache((prev) => ({ ...prev, [selectedDayId]: data }));
      } catch (err: any) {
        if (err.name === "AbortError") return;
        setErrorSessions(err.message || "Failed to load sessions");
      } finally {
        setLoadingSessions(false);
      }
    };

    loadSessions();
    return () => ctrl.abort();
  }, [eventId, selectedDayId, sessionsCache]);

  const sessions: Session[] = useMemo(
    () => (selectedDayId ? sessionsCache[selectedDayId] || [] : []),
    [selectedDayId, sessionsCache]
  );

  // Extract unique session types
  const sessionTypes = useMemo(() => {
    const types = Array.from(new Set(sessions.map((s) => s.SessionType)));
    return ["All", ...types.filter(Boolean)];
  }, [sessions]);

  // Filter by type
  const filteredSessions = useMemo(() => {
    if (selectedType === "All") return sessions;
    return sessions.filter((s) => s.SessionType === selectedType);
  }, [sessions, selectedType]);

  const isChina = locale === "cn";

  const openPopup = (speaker: any) => {
    setSelectedSpeaker(speaker);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setSelectedSpeaker(null);
    setIsPopupOpen(false);
  };
  return (
    <section className="px-3" id="agenda">
      <div className="">
        <div className="">
          {/* Day filter */}
          <div className="mb-4 overflow-auto">
            <div className="d-flex flex-row">
              {days?.map((d) => (
                <button
                  key={d.ItemID}
                  type="button"
                  onClick={() => {
                    setSelectedDayId(d.ItemID);
                    setSelectedType("All"); // reset type on day change
                  }}
                  className={`btn btn-sm mr-2 ${
                    selectedDayId === d.ItemID
                      ? "btn-primary text-white"
                      : "btn-outline-secondary"
                  }`}
                >
                  {isChina ? d.ArabicName : d.Name}
                </button>
              ))}
            </div>
          </div>

          {/* SessionType filter */}
          {sessionTypes.length > 1 && (
            <div className="mb-4">
              <div className="d-flex flex-wrap">
                {sessionTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`btn btn-sm mr-2 mb-2 ${
                      selectedType === type
                        ? "btn-primary text-white"
                        : "btn-outline-primary"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sessions */}
          <div>
            {errorSessions && (
              <div className="text-danger small">Error: {errorSessions}</div>
            )}

            {!loadingSessions &&
              !errorSessions &&
              filteredSessions.length > 0 && (
                <ul className="list-unstyled">
                  {filteredSessions.map((s, idx) => (
                    <li
                      key={`${s.SessionName}-${idx}`}
                      className="border-bottom pb-3 mb-3"
                    >
                      <div className="row">
                        <div className="col-sm-3 mb-2">
                          <p className="mb-0 font-weight-medium">
                            {to12h(s.StartTime)} – {to12h(s.EndTime)}
                          </p>
                          <small className="text-muted">{s.SessionType}</small>
                        </div>

                        <div className="col-sm-9">
                          <h3 className="text-primary mb-2">
                            {" "}
                            {isChina ? s.SessionNameArabic : s.SessionName}
                          </h3>

                          {s.Description && (
                            <div
                              className=" mb-3"
                              dangerouslySetInnerHTML={{
                                __html: isChina
                                  ? s.DescriptionArabic
                                  : s.Description,
                              }}
                            ></div>
                          )}

                          {s.Speakers?.length > 0 && (
                            <>
                              {[
                                "Moderator",
                                "Panelist",
                                "Keynote Speaker",
                                "Speaker",
                                "Interviewer",
                                "Interviewee",
                                "Host",
                              ].map((role) => {
                                const roleSpeakers = s.Speakers.filter(
                                  (speaker) => speaker.Role === role
                                );
                                if (roleSpeakers.length === 0) return null; // skip if no speakers for that role

                                return (
                                  <div key={role} className="mt-3">
                                    <p className="small font-weight-bold text-muted mb-2">
                                      {role}
                                    </p>
                                    <div className="row g-3">
                                      {roleSpeakers.map((sp) => (
                                        <div key={sp.Id} className="col-lg-6">
                                          <div
                                            onClick={() => openPopup(sp)}
                                            className="d-flex align-items-start mr-3 mb-2 gap-2 cursor-pointer"
                                          >
                                            <Image
                                              width={60}
                                              height={60}
                                              src={sp.Image}
                                              alt={sp.Name}
                                              className="rounded-circle mr-2"
                                              style={{
                                                width: "60px",
                                                height: "60px",
                                                objectFit: "cover",
                                                objectPosition: "center",
                                              }}
                                              loading="lazy"
                                            />
                                            <div>
                                              <p className="mb-0 small font-weight-medium">
                                                {sp.Name}
                                              </p>
                                              <p
                                                className="mb-0 text-muted small"
                                                style={{ maxWidth: "300px" }}
                                              >
                                                {[sp.JobTitle, sp.Organization]
                                                  .filter(Boolean)
                                                  .join(" • ")}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </div>
        </div>
      </div>

      <SpeakerPopupBannerBS5
        speaker={selectedSpeaker}
        isOpen={isPopupOpen}
        onClose={closePopup}
      />
    </section>
  );
};

export default AgendaComponent;
