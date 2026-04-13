
import { useEffect } from "react";

export default function Fireworks() {
  useEffect(() => {
    // Import dynamically to avoid SSR issues
    import("canvas-confetti").then((module) => {
      const confetti = module.default;
      // Launch several fireworks bursts
      const duration = 2 * 1000; // 2 seconds
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          return;
        }

        confetti({
          ...defaults,
          particleCount: randomInRange(30, 60),
          origin: {
            x: Math.random(),
            // since they fall down, start a bit higher
            y: Math.random() * 0.5,
          },
          colors: ["#ffd700", "#ff355e", "#099ffc", "#00ff99", "#ffffff"],
        });
      }, 300);
    });
  }, []);

  return null;
}
