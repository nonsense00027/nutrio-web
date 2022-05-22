import React, { useEffect, useState } from "react";
import moment from "moment";

function Time() {
  const [time, setTime] = useState(moment().format("h:mm:ss a"));

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(moment().format("h:mm:ss A"));
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);
  return <p className="py-4 opacity-70 text-lg">{time}</p>;
}

export default Time;
