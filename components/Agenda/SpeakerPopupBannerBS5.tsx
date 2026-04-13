import React, { useEffect, useCallback } from "react";

import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Helper from "@/modules/Helper";

interface Props {
  speaker: any | null;
  onClose: () => void;
  isOpen: boolean;
}

const SpeakerPopupBannerBS5: React.FC<Props> = ({
  speaker,
  onClose,
  isOpen,
}) => {
  if (!isOpen || !speaker) return null;

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

  // Backdrop click handler (only if user clicks outside dialog)
  const onBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="modal fade show d-block" // d-block to render (Bootstrap usually does this via JS)
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaker-popup-title"
      onClick={onBackdropClick}
      style={{ backgroundColor: "rgba(0,0,0,.5)" }} // Bootstrap backdrop effect
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content shadow">
          {/* Header */}
          <div className="modal-header border-0 pb-0">
            <h5
              className="modal-title visually-hidden"
              id="speaker-popup-title"
            >
              {speaker.Name}
            </h5>
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
            <div className="text-center mb-3">
              <div className="mx-auto mb-3" style={{ width: 128, height: 128 }}>
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

              <h2 className="h4 fw-bold mb-1 text-black">
                {speaker.Name}
              </h2>

              {speaker.JobTitle && (
                <p className="mb-0">{speaker.JobTitle}</p>
              )}
              {speaker.Organization && (
                <p className="text-muted mb-0">{speaker.Organization}</p>
              )}
            </div>

            {/* Profile (scrolls with modal-dialog-scrollable) */}
            {speaker.Description && (
              <div
                className="small text-body"
                style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
              >
                {speaker.Description}
              </div>
            )}

            {/* Socials */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              {has(speaker.Linkedin) && (
                <Link
                  href={Helper.formatUrl(speaker.Linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-secondary link-underline-opacity-0 link-underline"
                >
                  <FaLinkedinIn size={20} />
                </Link>
              )}
              {has(speaker.Facebook) && (
                <Link
                  href={Helper.formatUrl(speaker.Facebook)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-secondary link-underline-opacity-0 link-underline"
                >
                  <FaFacebook size={20} />
                </Link>
              )}
              {has(speaker.Instagram) && (
                <Link
                  href={Helper.formatUrl(speaker.Instagram)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-secondary link-underline-opacity-0 link-underline"
                >
                  <FaInstagram size={20} />
                </Link>
              )}
            </div>
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

export default SpeakerPopupBannerBS5;
