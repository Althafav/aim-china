import React, { useEffect, useState } from "react";

export const CountdownTimer = ({ endDate }: { endDate: string }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endDate) - +new Date();
    if (difference <= 0) return null;

    const timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // cleanup
  }, [endDate]);

  if (!timeLeft) return <div>Event Ended</div>;

  return (
    <div>
      {`${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`}
    </div>
  );
};
