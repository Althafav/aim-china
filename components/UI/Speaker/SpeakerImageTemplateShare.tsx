import React, { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import conferenceSpeakerModel2025 from "@/sysmodels/speakers2025";
import Image from "next/image";

interface SpeakerDetailProps {
  speaker: conferenceSpeakerModel2025;
}

const SpeakerImageTemplateShare = ({ speaker }: SpeakerDetailProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const generateImage = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    setLoading(true);

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        setImageUrl(dataUrl);
      })
      .catch((err) => {
        console.error("Error generating image:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const shareToLinkedIn = () => {
    if (!imageUrl) return;

    // Open LinkedIn's Share URL with a pre-filled caption
    const caption = `🎤 I'm excited to share that I'll be speaking at the AIM Congress 2025!`;
    const linkedInShareUrl = `https://www.linkedin.com/shareArticle?&url=${encodeURIComponent(
        imageUrl
    )}&title=${encodeURIComponent("AIM Congress 2025")}&summary=${encodeURIComponent(
      caption
    )}`;

    window.open(linkedInShareUrl, '_blank', 'noopener,noreferrer,width=600,height=600');
  };

  return (
    <div>
      <div className="speakerImageTemplate-wrapper">
        <div className="container">
          {imageUrl ? (
            <div className="row">
              <div style={{ marginTop: "20px" }}>
                <h3>Preview:</h3>
                <img
                  src={imageUrl}
                  alt="Generated Speaker Image"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    marginBottom: "20px",
                  }}
                />
                <button
                  onClick={shareToLinkedIn}
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    backgroundColor: "#0077b5",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Share to LinkedIn
                </button>
              </div>
            </div>
          ) : (
            <>
              <div

                ref={ref}
                className="speaker-image-template-card"
                style={{
                  backgroundImage: `url('/assets/imgs/Gradient.png')`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  
                }}
              >
                <div className="row">
                  <div className="col-lg-6">
                    <Image
                      className="mb-5"
                      width={100}
                      height={100}
                      src="/assets/imgs/AIM-logo.png"
                      alt=""
                      style={{ width: "100px", objectFit: "contain" }}
                    />
                    <h1>
                      I’m excited to share that I’ll be speaking at the AIM
                      Congress 2025!
                    </h1>
                  </div>
                  <div className="col-lg-6">
                    <div className="speaker-card">
                      <Image
                        width={200}
                        height={200}
                        className="mb-3"
                        src={speaker.Image}
                        alt=""
                        style={{
                          width: "200px",
                          objectFit: "cover",
                          borderRadius: "50%",
                          objectPosition: "top",
                          border: "2px solid white",
                        }}
                      />
                      <h1>
                        {speaker.FirstName}
                        {speaker.LastName}
                      </h1>
                      <p className="text-white">{speaker.Designation}</p>
                      <p className="text-white">{speaker.Company}</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <p className="text-white">
                      7 - 9 April 2025 | ADNEC, Abu Dhabi, United Arab Emirates
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={generateImage}
                disabled={loading}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#0077b5",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Generating Image..." : "Generate Image"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakerImageTemplateShare;
