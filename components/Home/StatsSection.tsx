"use client";

import React, { useEffect, useRef, useState } from "react";

type StatsSectionProps = {
  statsheading: string;
  statscontent: string;
  statsitems: any[];
  downloadreportname?: string;
  downloadreportlink: string;
};

function CountUp({
  value,
  suffix = "",
  duration = 1500,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let observer: IntersectionObserver | null = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(element);

    return () => {
      if (observer && element) observer.unobserve(element);
      observer = null;
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    let start: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = Math.floor(progress * value);
      setDisplayValue(current);
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [hasAnimated, value, duration]);

  return (
    <div ref={ref}>
      {displayValue.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsSection({
  statsheading,
  statscontent,
  statsitems,
  downloadreportname,
  downloadreportlink,
}: StatsSectionProps) {
  return (
    <section className="py-5">
      <div className="container">
        <div
          className="bg-white rounded-4 p-4 p-sm-5"
          style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}
        >
          {/* Heading + content row */}
          <div className="row g-4 mb-5">
            <div className="col-12 col-sm-6">
              <h2
                className="fs-2 fw-normal text-black"
                style={{ maxWidth: "22rem" }}
              >
                {statsheading}
              </h2>
            </div>
            <div className="col-12 col-sm-6">
              <div
                className="text-muted mb-3"
                dangerouslySetInnerHTML={{ __html: statscontent }}
              />
              {downloadreportlink && (
                <a
                  href={downloadreportlink}
                  className="btn btn-dark rounded-pill px-4"
                >
                  {downloadreportname}
                </a>
              )}
            </div>
          </div>

          {/* Stats grid */}
          <div className="row row-cols-2 row-cols-sm-4 g-4">
            {statsitems.map((item: any) => {
              const rawValue = String(item.count.value ?? "");
              const match = rawValue.match(/^(\d[\d,.]*)(.*)$/);
              let numericValue = 0;
              let suffix = "";

              if (match) {
                numericValue = Number(match[1].replace(/,/g, "")) || 0;
                suffix = match[2];
              } else {
                suffix = rawValue;
              }

              return (
                <div key={item.system.id} className="col">
                  <p className="text-muted small mb-1">{item.name.value}</p>
                  <div
                    className="fw-semibold"
                    style={{
                      fontSize: "clamp(2rem, 4vw, 3.5rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1,
                    }}
                  >
                    <CountUp value={numericValue} suffix={suffix} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
