import {h} from "preact";
import useForm from '../../utils/useForm'
import {addTimer} from "../../actions";
import {useStoreon} from "storeon/preact";
import {isNumber} from "../../utils/validators";

import style from "./TimeForm.css";

const TimeForm = () => {
    const {dispatch, timers} = useStoreon('timers');
    let stateSchema: { seconds: { error: string; value: null }; minutes: { error: string; value: null } };
    stateSchema = {
        minutes: {value: null, error: ''},
        seconds: {value: null, error: ''},
    };
    const stateValidatorSchema = {
        minutes: {
            required: false,
            validator: {
                func: (value: string) => {
                    return isNumber(value)
                },
                error: 'Invalid title format.',
            },
        },
        seconds: {
            required: true,
            validator: {
                func: (value: string) => isNumber(value),
                error: 'Invalid body format.',
            },
        },
    };

    const {
        values,
        errors,
        dirty,
        handleOnChange,
        handleOnSubmit,
        setFieldValue
    } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);
    const {minutes, seconds} = values;
    function onSubmitForm(state: any) {
        dispatch(addTimer, state);
        setFieldValue({ name: 'minutes', value: null });
        setFieldValue({ name: 'seconds', value: null });
    }
    return (
        <div className={style.timerForm}>
            <form onSubmit={handleOnSubmit}>
                <div className={style.formInputs}>
                <input value={minutes} name='minutes' type="text" onChange={handleOnChange}/>
                {errors.minutes && dirty.minutes && (
                    <span className="error">{errors.minutes}</span>
                )}
                <input value={seconds} name='seconds' type="text" onChange={handleOnChange}/>
                {errors.seconds && dirty.seconds && (
                    <span className="error">{errors.seconds}</span>
                )}
                <button class="button-primary" type="submit">Send</button>
                </div>
            </form>
            {/*<div><pre>{JSON.stringify(timers, null, 2) }</pre></div>*/}
        </div>
    )
}

export default TimeForm
