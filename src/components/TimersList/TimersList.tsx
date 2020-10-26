import {h} from "preact";
import {useStoreon} from "storeon/preact";
import {Timer} from "../../store/types";

import style from './TimersList.css';
import {deleteTimer} from "../../actions";

const TimersList = () => {
    const {dispatch, timers} = useStoreon('timers');
    function removeTimer(id: number) {
        dispatch(deleteTimer, id);
    }
    return (
        <div>
            {timers.map((timer: Timer) => {
                const {minutes, seconds, id} = timer;
                return (
                    <div className={style.timersListItem}>
                        <div>{minutes}</div><div>{seconds}</div>
                        <button onClick={() => removeTimer(id)}>x</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TimersList;
