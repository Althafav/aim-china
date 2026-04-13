import React from 'react';

const SpinnerComponent = () => {
  return (
    <div className="loader-container">
      <div className="logo-wrapper">
        <img src="/assets/imgs/AIM-logo.png" alt="Company Logo" className="logo" />
      </div>
      <style jsx>{`
        .loader-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: black;
        }

        .logo-wrapper {
          position: relative;
          width: 200px;
          height: auto;
        }

        .logo {
          width: 100%;
          height: auto;
          filter: grayscale(100%);
          mask-image: linear-gradient(to right, black, transparent);
          mask-size: 200% 100%;
          mask-position: 0 0;
          animation: reveal 2s infinite;
        }

        @keyframes reveal {
          0% {
            mask-position: 0 0;
            filter: grayscale(100%);
          }
          100% {
            mask-position: 100% 0;
            filter: grayscale(0%);
          }
        }
      `}</style>
    </div>
  );
};

export default SpinnerComponent;
