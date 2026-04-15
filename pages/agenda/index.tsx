import AgendaComponent from "@/components/Agenda/AgendaComponent";

import HeaderBanner2026 from "@/components/UI/Banner/HeaderBanner2026";
import React from "react";

export default function index() {
  return (
    <div>
      <div className="black-replacer-nav"></div>
      {/* <HeaderBanner2026
        heading="Agenda"
        subheading="Explore our agenda for a comprehensive overview of conference sessions and key conversations. "
        className="col-lg-10"
      />
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <AgendaComponent eventId="2ff15d64-aa6c-4351-8b27-2828cd79ba4b" />
          </div>
        </div>
      </div> */}

      <div className="container py-5 text-center">
        <h1 className="fw-bold text-dark mb-3">
          Agenda <span className="text-primary">Coming Soon</span>
        </h1>
        <p className="text-muted fs-5">
          Get ready for insightful talks, networking opportunities, and more.
        </p>
      </div>
    </div>
  );
}
