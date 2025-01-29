'use client';
import Text from '../components/ui/textual/Text';
import React, { useState, useEffect } from 'react';

const DynamicHour = () => {
  const [time, setTime] = useState(null);
  const [showColon, setShowColon] = useState(true);

  useEffect(() => {
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
      setShowColon(prev => !prev);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (!time) {
    return null;
  }

  const formatTime = () => {
    const options = {
      timeZone: 'Europe/Paris',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    };
    const timeString = new Intl.DateTimeFormat('en-US', options).format(time);
    const [timePart, amPm] = timeString.split(' ');
    const [hours, minutes] = timePart.split(':');
    return { hours, minutes, amPm: amPm.toLowerCase() };
  };

  const { hours, minutes, amPm } = formatTime();

  return (
    <Text className={"step--2"}>Nantes, {' '}
      {hours.toLowerCase()}
      <span style={{ opacity: showColon ? 1 : 0 }}>:</span>
      {minutes.toLowerCase()} {amPm}
    </Text>
  );
};

export default DynamicHour;
