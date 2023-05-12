import React, { useState, useEffect } from 'react';

function CountdownTimer({ onEnd, modalOpen,reset }) {
  const [seconds, setSeconds] = useState(60);

  useEffect(() => {
    let interval = null;
    if (!modalOpen) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
      if (reset) {
        onEnd();
        setSeconds(60);
      }
      if (seconds === 0) {
        onEnd();
        setSeconds(60);
      }
      
    }
    return () => clearInterval(interval);
  }, [seconds, onEnd, modalOpen,reset]);


 

  return (
    <div>
      <h1 style={{color:'red'}}>{seconds}</h1>
    </div>
  );
}


export default CountdownTimer;
