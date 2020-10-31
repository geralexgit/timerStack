import {h} from 'preact'
import { useState, useEffect } from 'preact/hooks';
import {useStoreon} from "storeon/preact";
import {disableActiveTimer, setActiveTimer} from "../../actions";
import {Timer} from "../../store/types";

const Timer = () => {
    const {dispatch, timers} = useStoreon('timers');
    const [currentTimer, setCurrentTimer] = useState(null);
    const [counter, setCounter] = useState(60);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isStarted, setStarted] = useState(false);

    useEffect(() => {
        const activeTimer = timers.find((timer: Timer) => timer.isActive === true);
        setCurrentTimer(activeTimer);
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        setMinutes(Math.floor(counter / 60));
        setSeconds(counter - minutes * 60);
        const currentTimerIndex = timers.indexOf(activeTimer);
        console.log(currentTimerIndex)
        if (counter === 0) {
            dispatch(disableActiveTimer, timers[currentTimerIndex]);
            if (timers[currentTimerIndex + 1]) {
                dispatch(setActiveTimer, timers[currentTimerIndex + 1].id);
                startTimers();
            }
        }
        return () => clearInterval(timer);
    }, [counter]);

    function startTimers() {
        if (!timers.length) return;
        if (!currentTimer) {
            dispatch(setActiveTimer, timers[0].id);
        }
        const totalSeconds = (currentTimer.minutes * 60) + currentTimer.seconds;
        console.log('currentTimer: ', currentTimer.id)
        setCounter(totalSeconds);
        setStarted(true);
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
