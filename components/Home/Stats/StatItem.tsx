"use client";

import React from "react";
import CountUp from "react-countup";

type StatItemProps = {
  label: string;
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
};

const StatItem: React.FC<StatItemProps> = ({
  label,
  value,
  duration = 2,
  suffix = "+",
  className = "",
}) => {
  return (
    <div className={`text-start d-flex flex-column justify-content-start align-items-start ${className}`}>
      <span className="d-block text-muted small">{label}</span>
      <h4 className="count text-dark m-0">
        <CountUp
          end={value}
          duration={duration}
          suffix={suffix}
          enableScrollSpy
          scrollSpyOnce
          // optional: if you have a fixed header, start a bit earlier
          scrollSpyDelay={50}
        />
      </h4>
    </div>
  );
};

export default StatItem;
