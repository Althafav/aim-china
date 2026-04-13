import { Homepage } from "@/models/homepage";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PageDataProps {
  pageData: Homepage | null;
}

const HomePagePopup: React.FC<PageDataProps> = ({ pageData }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasPopupVisited");
    if (!hasVisited) {
      setIsOpen(true);
      localStorage.setItem("hasPopupVisited", "true");
    }
  }, []);

  if (!isOpen) return null;

  if (
    !pageData?.popupbannerimage.value ||
    pageData?.popupbannerimage.value.length === 0
  ) {
    return null;
  }
  return (
    <div className="popup-overlay" onClick={() => setIsOpen(false)}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <Link href={pageData?.popuplink.value}>
          <img
            width={600}
            height={400}
            style={{ objectFit: "contain" }}
            loading="lazy"
            src={pageData?.popupbannerimage.value[0].url}
            alt="Popup"
            className="popup-image"
          />
        </Link>
      </div>
    </div>
  );
};

export default HomePagePopup;
