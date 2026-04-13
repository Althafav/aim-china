import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Custom404() {
  const text = `Sorry, we could’nt find the page you are looking for`;
  return (
    <div className="page-not-found-wrapper">
      <div className="black-replacer-nav" />

      <section>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="d-flex  flex-column justify-content-center align-items-center">
                <h1 className="error-code text-center mb-4">404</h1>
                <h4 className="text-center mb-3 text-black">Page Not Found</h4>
                <p className="mb-4 text-center">{text}</p>

                <div>
                  <Link href="/" className="cta-btn bg-primary">
                    Back To Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
