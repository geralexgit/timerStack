import {h} from 'preact'
import { useState, useEffect } from 'preact/hooks';
import {useStoreon} from "storeon/preact";
import {disableActiveTimer, resetActiveTimer, setActiveTimer} from "../../actions";
import {Timer} from "../../store/types";

const Timer = () => {
    const {dispatch, timers} = useStoreon('timers');
    const [counter, setCounter] = useState(60);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isStarted, setStarted] = useState(false);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        let activeTimer = timers.find((timer: Timer) => timer.isActive === true);
        setMinutes(Math.floor(counter / 60));
        setSeconds(counter - minutes * 60);
        const currentTimerIndex = timers.indexOf(activeTimer);
        if (counter === 0) {
            console.log('counter === 0', currentTimerIndex);
            if (timers[currentTimerIndex + 1]) {
                dispatch(setActiveTimer, timers[currentTimerIndex + 1].id);
                startTimers();
            } else {
                dispatch(resetActiveTimer)
            }
        }
    }, [counter]);

    function startTimers() {
        const activeTimer = timers.find((timer: Timer) => timer.isActive === true)
        if (!timers.length) return;
        if (!activeTimer) {
            dispatch(setActiveTimer, timers[0].id);
        }
        if (activeTimer) {
            const totalSeconds = (activeTimer.minutes * 60) + activeTimer.seconds;
            console.log('currentTimer: ', activeTimer.id)
            setCounter(totalSeconds);
            setStarted(true);
        }
    }

    return (
        <div className="Timer">
            <button onClick={startTimers}>start</button>
            {isStarted && <div>
                <span>minutes: {minutes}</span>
                <span>seconds: {seconds}</span>
            </div>}
        </div>
    );
}

export default Timer
