import { useState } from "react";
import { IoMdMic } from "react-icons/io";
import { FaHandshake } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

import HomeSpeakersComponentCurrent from "./HomeSpeakersComponentCurrent";
import PartnersComponentCurrent from "./PartnersComponentCurrent";
import ExhibitorsComponent from "./ExhibitorsComponent";

export default function HomeSPETabsResponsive() {
  const [active, setActive] = useState<"speakers" | "partners" | "exhibitors">(
    "speakers"
  );

  const tabs = [
    {
      key: "speakers",
      label: "Speakers",
      Icon: IoMdMic,
      content: <HomeSpeakersComponentCurrent />,
    },
    {
      key: "partners",
      label: "Partners",
      Icon: FaHandshake,
      content: <PartnersComponentCurrent />,
    },
    {
      key: "exhibitors",
      label: "Exhibitors",
      Icon: MdStorefront,
      content: <ExhibitorsComponent />,
    },
  ] as const;

  const activeTab = tabs.find((tab) => tab.key === active);

  return (
    <div className="spe-tabs-wrapper container">
      <div className="tab-list-wrapper">
        {tabs.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActive(key)}
            className={`tab-btn ${active === key ? "active" : ""}`}
          >
            <Icon className="tab-icon" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      <div className="tab-content-area">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab?.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
