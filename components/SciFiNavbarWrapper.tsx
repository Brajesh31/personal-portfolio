'use client';

import React, { useEffect, useState } from 'react';
import { SciFiNavbar } from './SciFiNavbar';

export function SciFiNavbarWrapper() {
  const [timestamp, setTimestamp] = useState('00:00:00');

  // Update timestamp
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toTimeString().split(' ')[0];
      setTimestamp(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return <SciFiNavbar timestamp={timestamp} />;
}
