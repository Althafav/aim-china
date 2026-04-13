import React, { useEffect, useCallback, useState } from "react";

import {
  FaClock,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import Helper from "@/modules/Helper";

const formatTime = (timeString: string) => {
  if (!timeString) return "";
  const [h, m] = timeString.split(":");
  const hour = Number(h);
  const suffix = hour >= 12 ? "PM" : "AM";
  const hr = hour % 12 || 12;
  return `${hr}:${m} ${suffix}`;
};

interface Props {
  speaker: any | null;
  onClose: () => void;
  isOpen: boolean;
}

const SpeakerPopupModal: React.FC<Props> = ({ speaker, onClose, isOpen }) => {
  if (!isOpen || !speaker) return null;
  const [sessionData, setSessionData] = useState<any[]>([]);
  const has = (v?: string) => typeof v === "string" && v.trim().length > 1;

  // Close on ESC like Bootstrap modal
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while open (Bootstrap adds .modal-open)
  useEffect(() => {
    document.body.classList.add("modal-open");
    // Create backdrop blur parity if you wish; here we just keep Bootstrap look
    const originalPaddingRight = document.body.style.paddingRight;
    // Optional: handle scrollbar compensation if your app needs it
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadSessions = async () => {
      if (speaker?.Sessions && speaker.Sessions.length > 0) {
        const sessionPromises = speaker.Sessions.map(async (sessionId: any) => {
          const sessionApi = `https://speakers.aimcongress.com/api/website/Session?SessionId=${sessionId}`;
          try {
            const res = await fetch(sessionApi);
            if (!res.ok) return null;
            return await res.json();
          } catch {
            return null;
          }
        });

        const sessions = await Promise.all(sessionPromises);
        const filteredSessions = sessions.filter((s) => s !== null) as any[];
        if (mounted) setSessionData(filteredSessions);
      } else {
        if (mounted) setSessionData([]);
      }
    };

    loadSessions();

    return () => {
      mounted = false;
    };
  }, [speaker]);

  // Backdrop click handler (only if user clicks outside dialog)
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="modal fade show d-block speaker-popup-modal-wrapper" // d-block to render (Bootstrap usually does this via JS)
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-popup-title"
      onClick={onBackdropClick}
      style={{ backgroundColor: "rgba(0,0,0,.5)" }} // Bootstrap backdrop effect
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content bg-transparent border-0">
          {/* Header */}
          <div className="modal-header border-0 pb-0">
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>

          {/* Body */}
          <div className="modal-body pt-0">
            {/* Image + basic info */}
            <div className="row g-3">
              <div className="col-lg-6">
                <div className="row g-3 align-items-center">
                  <div className="col-4">
                    {speaker.Image?.endsWith(".pdf") ? (
                      <div className="w-100 h-100 border rounded bg-light" />
                    ) : (
                      // Using plain img for simplicity; you can swap to next/image if desired
                      <img
                        src={speaker.Image || "/default-avatar.jpg"}
                        alt={`${speaker.Name}`}
                        className="w-100 h-100 object-fit-cover border rounded"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.src = "/default-avatar.jpg";
                        }}
                      />
                    )}
                  </div>

                  <div className="col-6">
                    <h2 className="h4 fw-bold mb-1 text-black">
                      {speaker.FirstName} {speaker.LastName}
                    </h2>

                    {speaker.Designation && (
                      <p className="mb-0">{speaker.Designation}</p>
                    )}
                    {speaker.Company && (
                      <p className="text-muted mb-0">{speaker.Company}</p>
                    )}

                    <div className="d-flex gap-2 flex-wrap mt-3">
                      {speaker.Linkedin &&
                        /^https?:\/\/(www\.)?linkedin\.com/i.test(
                          speaker.Linkedin
                        ) && (
                          <Link
                            href={speaker.Linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div
                              className="b text-white p-2 rounded-pill inline-flex items-center justify-center"
                              style={{ backgroundColor: "#1B3966" }}
                            >
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
                            <div
                              className="b text-white p-2 rounded-pill inline-flex items-center justify-center"
                              style={{ backgroundColor: "#1B3966" }}
                            >
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
                            <div
                              className="b text-white p-2 rounded-pill inline-flex items-center justify-center"
                              style={{ backgroundColor: "#1B3966" }}
                            >
                              <FaFacebook size={24} />
                            </div>
                          </Link>
                        )}
                    </div>
                  </div>

                  <div className="col-lg-12">
                    {speaker.Profile && (
                      <div
                        className="small text-body"
                        style={{
                          whiteSpace: "pre-wrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {speaker.Profile}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                {sessionData.length > 0 && (
                  <>
                    <div className="session-header-bg">
                      <div className="">
                        <h4 className="text-white p-3 m-0">Sessions</h4>
                      </div>
                      {/*  */}
                    </div>

                    <div className="">
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

                                <h4 className="text-black mb-4">
                                  {item.SessionName}
                                </h4>

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

            {/* Profile (scrolls with modal-dialog-scrollable) */}
          </div>

          {/* Footer (optional): add buttons if needed */}
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SpeakerPopupModal;
