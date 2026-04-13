// MinimalStickyStackDemo.tsx
import React from 'react';

const items = [
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=800&q=80',
    name: 'Track 1',
    content: '<p>This is the content for track 1.</p>'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=800&q=80',
    name: 'Track 2',
    content: '<p>This is the content for track 2.</p>'
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=800&q=80',
    name: 'Track 3',
    content: '<p>This is the content for track 3.</p>'
  },
];

export default function MinimalStickyStackDemo() {
  return (
    <div
      className="tracks-section-wrapper"
      style={{
        minHeight: `${items.length * 100}vh`,
        width: "100vw",
        position: "relative",
        background: "#f7f8fa",
      }}
    >
      {items.map((item, idx) => (
        <div
          key={idx}
          className="sticky-stack-section bg-white shadow rounded-4 border"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            zIndex: idx + 1,
            overflow: "hidden",
            marginBottom: 0,
          }}
        >
          <div className="h-100 d-flex align-items-center justify-content-center">
            <div className="row justify-content-center w-100">
              <div className="col-lg-10">
                <div className="row g-3">
                  <div className="col-12 text-center">
                    <img
                      src={item.image}
                      alt=""
                      className="rounded-4 mb-4 img-fluid"
                      style={{ maxHeight: "320px", objectFit: "cover", width: "100%" }}
                    />
                  </div>
                  <div className="col-12 text-center">
                    <h2 className="display-4 text-dark mb-2">{item.name}</h2>
                  </div>
                  <div className="col-12 text-center">
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
