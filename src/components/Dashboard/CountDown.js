import React, { useState, useEffect } from 'react';

const CountdownTimer = () => {
    const [totalTime, setTotalTime] = useState(7200); // 2 hours in seconds
    const [hours, setHours] = useState(2);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (totalTime > 0) {
                const newHours = Math.floor(totalTime / 3600);
                const newMinutes = Math.floor((totalTime % 3600) / 60);
                const newSeconds = totalTime % 60;

                setHours(newHours);
                setMinutes(newMinutes);
                setSeconds(newSeconds);
                setTotalTime(totalTime - 1);
            } else {
                clearInterval(interval);
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [totalTime]);

    return (
        <div className="countdown-timer">
            <div className="timer">
                <span className="digit">{hours.toString().padStart(2, '0')}</span>:
                <span className="digit">{minutes.toString().padStart(2, '0')}</span>:
                <span className="digit">{seconds.toString().padStart(2, '0')}</span>
            </div>
        </div>
    );
};

export default CountdownTimer;
