import {h} from 'preact'
import { useState, useEffect } from 'preact/hooks';

const Timer = () => {
    const [counter, setCounter] = useState(60);

    useEffect(() => {
        const timer =
            counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);

    return (
        <div className="App">
            <div>Countdown: {counter}</div>
        </div>
    );
}

export default Timer
