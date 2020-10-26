import {h, JSX } from "preact";
import useForm from '../../utils/useForm'
import {addTimer, createPost} from "../../actions";
import {useStoreon} from "storeon/preact";
import {isNumber} from "../../utils/validators";

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
                func: (value: string) => isNumber(value),
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
    function onSubmitForm(state: any) {
        dispatch(addTimer, state);
    }
    const {
        values,
        errors,
        dirty,
        handleOnChange,
        handleOnSubmit
    } = useForm(stateSchema, stateValidatorSchema, onSubmitForm);
    const {minutes, seconds} = values;
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input value={minutes} name='minutes' type="text" onChange={handleOnChange}/>
                {errors.minutes && dirty.minutes && (
                    <span className="error">{errors.minutes}</span>
                )}
                <input value={seconds} name='seconds' type="text" onChange={handleOnChange}/>
                {errors.seconds && dirty.seconds && (
                    <span className="error">{errors.seconds}</span>
                )}
                <input class="button-primary" type="submit" value="Send" />
            </form>
            <div><pre>{JSON.stringify(timers, null, 2) }</pre></div>
        </div>
    )
}

export default TimeForm
