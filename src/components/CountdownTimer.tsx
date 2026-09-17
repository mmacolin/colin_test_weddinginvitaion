import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface CountdownTimerProps {
  targetDateString: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDateString }) => {
  const calculateTime = (): TimeRemaining => {
    const target = new Date(targetDateString).getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isPast: false };
  };

  const [time, setTime] = useState<TimeRemaining>(calculateTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(calculateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [targetDateString]);

  const units = [
    { label: 'Days', labelKhmer: 'ថ្ងៃ', value: time.days },
    { label: 'Hours', labelKhmer: 'ម៉ោង', value: time.hours },
    { label: 'Mins', labelKhmer: 'នាទី', value: time.minutes },
    { label: 'Secs', labelKhmer: 'វិនាទី', value: time.seconds },
  ];

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center gap-2 mb-3 text-[#d2be92] text-xs uppercase tracking-widest">
        <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
        <span>ចំនួនថ្ងៃរាប់ថយក្រោយ • Countdown to the Big Day</span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-sm">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="flex flex-col items-center justify-center p-2.5 sm:p-3.5 rounded-xl bg-gradient-to-b from-[#263e3e]/90 to-[#1b2b2b]/90 border border-[#c5a059]/30 shadow-lg backdrop-blur-md text-center"
          >
            <span className="text-xl sm:text-3xl font-serif font-semibold text-[#f4e6c3] tracking-tight">
              {String(unit.value).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-stone-300 font-medium mt-0.5">
              {unit.labelKhmer}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-stone-400">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {time.isPast && (
        <p className="text-xs text-[#c5a059] mt-3 font-medium">
          The Wedding Celebration is here! Best wishes to Suyhong &amp; Vinaya!
        </p>
      )}
    </div>
  );
};
