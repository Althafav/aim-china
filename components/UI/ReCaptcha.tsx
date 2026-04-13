// components/ReCaptcha.tsx

import React, { useEffect, useRef } from 'react';

// Extend the Window interface so TypeScript knows about grecaptcha
declare global {
  interface Window {
    grecaptcha?: {
      render: (
        container: HTMLElement,
        params: {
          sitekey: string;
          theme?: 'light' | 'dark';
          size?: 'normal' | 'compact';
          callback: (token: string) => void;
          'expired-callback': () => void;
        }
      ) => number;
      reset: (widgetId: number) => void;
    };
  }
}

interface ReCaptchaProps {
  siteKey: string;
  onChange: (token: string | null) => void;
  theme?: 'light' | 'dark';
  size?: 'normal' | 'compact';
}

const SCRIPT_ID = 'recaptcha-script';

export default function ReCaptcha({
  siteKey,
  onChange,
  theme = 'light',
  size = 'normal',
}: ReCaptchaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    let interval: number;
    let rendered = false;

    const renderCaptcha = () => {
      if (
        containerRef.current &&
        window.grecaptcha?.render &&
        !rendered
      ) {
        widgetIdRef.current = window.grecaptcha!.render(
          containerRef.current,
          {
            sitekey: siteKey,
            theme,
            size,
            callback: onChange,
            'expired-callback': () => onChange(null),
          }
        );
        rendered = true;
      }
    };

    // Inject the API script once
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    // If already loaded, render immediately
    if (window.grecaptcha?.render) {
      renderCaptcha();
    } else {
      // Otherwise poll until available
      interval = window.setInterval(() => {
        if (window.grecaptcha?.render) {
          clearInterval(interval);
          renderCaptcha();
        }
      }, 500);
    }

    return () => {
      clearInterval(interval);
      if (
        widgetIdRef.current !== null &&
        window.grecaptcha?.reset
      ) {
        window.grecaptcha.reset(widgetIdRef.current);
      }
    };
  }, [siteKey, theme, size, onChange]);

  return <div ref={containerRef} />;
}
