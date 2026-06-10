import { Wifi, Battery } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StatusBarProps {
  dark?: boolean;
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    const h = date.getHours().toString().padStart(2, '0');
    const m = date.getMinutes().toString().padStart(2, '0');
    return `${h}:${m}`;
  };

  const color = dark ? 'rgba(255,255,255,0.85)' : '#78350f';

  return (
    <div className="flex-shrink-0 px-5 pt-2 pb-1" style={{ color }}>
      <div className="flex items-center justify-between">
        <span style={{ fontSize: 13, fontWeight: 600 }}>{formatTime(currentTime)}</span>
        {/* ノッチ風センサーエリア */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-1 rounded-full" style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(120,53,15,0.15)' }} />
          <div className="w-2 h-2 rounded-full" style={{ background: dark ? 'rgba(255,255,255,0.15)' : 'rgba(120,53,15,0.15)' }} />
        </div>
        <div className="flex items-center gap-1.5">
          <Wifi style={{ width: 14, height: 14 }} />
          <Battery style={{ width: 16, height: 16 }} />
        </div>
      </div>
    </div>
  );
}
