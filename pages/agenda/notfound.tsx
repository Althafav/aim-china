// pages/index.tsx  (Next.js Pages Router)
// or app/page.tsx (App Router — remove "use client" if server component)
"use client";
import React from "react";

export default function Index() {
  return (
    <main className="">
      <div className="black-replacer-nav" />
      <div className="container py-5 d-flex justify-content-center align-items-center text-align-center text-center">
        <div>
          <HourglassIllustration className="mx-auto w-25" />
          <h1 className="text-black text-center">Full program to be announced soon</h1>
        </div>
      </div>
    </main>
  );
}

function HourglassIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Hourglass Illustration"
    >
      <defs>
        <linearGradient id="cap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6E7CF8" />
          <stop offset="1" stopColor="#4F5FE6" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.96" />
          <stop offset="1" stopColor="#EEF1FF" />
        </linearGradient>
        <linearGradient id="sand" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DADFFF" />
          <stop offset="1" stopColor="#C7CEFF" />
        </linearGradient>
        <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="10"
            floodColor="#6373f0"
            floodOpacity="0.18"
          />
        </filter>
        <clipPath id="glassClip">
          <path
            d="
            M84 54
            C84 46, 92 40, 100 40
            L156 40
            C164 40, 172 46, 172 54
            C172 75, 150 95, 128 112
            C106 95, 84 75, 84 54
            Z
            M84 202
            C84 210, 92 216, 100 216
            L156 216
            C164 216, 172 210, 172 202
            C172 181, 150 161, 128 144
            C106 161, 84 181, 84 202
            Z"
          />
        </clipPath>
      </defs>

      <g filter="url(#shadow)" shapeRendering="geometricPrecision">
        <rect x="64" y="28" width="128" height="22" rx="11" fill="url(#cap)" />
        <rect x="64" y="206" width="128" height="22" rx="11" fill="url(#cap)" />

        <path
          d="
          M84 50
          C84 43, 90 38, 98 38
          L158 38
          C166 38, 172 43, 172 50
          C172 72, 150 94, 128 110
          C106 94, 84 72, 84 50
          Z
          M84 210
          C84 217, 90 222, 98 222
          L158 222
          C166 222, 172 217, 172 210
          C172 188, 150 166, 128 150
          C106 166, 84 188, 84 210
          Z"
          fill="url(#glass)"
          stroke="#4F5FE6"
          strokeWidth="3.5"
        />

        <g clipPath="url(#glassClip)">
          <path d="M92 70 H164 L128 108 Z" fill="url(#sand)" />
          <rect
            x="126.6"
            y="108"
            width="2.8"
            height="30"
            rx="1.4"
            fill="#B8C2FF"
          />
          <path
            d="M96 184 C110 168, 146 168, 160 184 C144 194, 112 194, 96 184 Z"
            fill="url(#sand)"
          />
        </g>

        <path
          d="M102 52 C102 70, 120 88, 128 94"
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity="0.55"
          strokeWidth="3"
          strokeLinecap="round"
        />

        <rect
          x="64"
          y="28"
          width="128"
          height="22"
          rx="11"
          fill="none"
          stroke="#4F5FE6"
          strokeWidth="2"
        />
        <rect
          x="64"
          y="206"
          width="128"
          height="22"
          rx="11"
          fill="none"
          stroke="#4F5FE6"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}
