import {StoreonModule} from 'storeon'

import {
    addTimer,
    deleteTimer, disableActiveTimer, resetActiveTimer, setActiveTimer,
} from '../actions'

import {Timer, TimersStore} from './types'

const initialState: TimersStore = {
    timers: [{id: 123, minutes: 0, seconds: 5}, {id: 153, minutes: 0, seconds: 14}]
};

export const timers: StoreonModule<TimersStore> = store => {
    store.on('@init', () => (initialState));
    store.on(addTimer, (state, payload: Timer) => {
        const date = new Date();
        const dateMs = date.getTime();
        const currentTimer = Object.assign({}, payload);
        const minutes = currentTimer.minutes.toString().replace(/^0+/, '');
        const seconds = currentTimer.seconds.toString().replace(/^0+/, '');
        const newTimer = {
            id: dateMs,
            minutes: parseInt(minutes, 10),
            seconds: parseInt(seconds, 10),
        }
        const newTimers = [...state.timers, newTimer];
        return {
            ...state,
            timers: newTimers
        }
    });
    store.on(deleteTimer, (state, payload: number) => {
        const newTimers = state.timers.filter(timer => timer.id !== payload);
        return {
            ...state,
            timers: newTimers
        }
    });
    store.on(setActiveTimer, (state, payload: number) => {
        const newTimers = state.timers.map(timer => {
            timer.isActive = false;
            if (timer.id === payload) {
                timer.isActive = true;
            }
            return timer;
        })
        return {
            ...state,
            timers: newTimers
        }
    });
    store.on(disableActiveTimer, (state, payload: number) => {
        const newTimers = state.timers.map(timer => {
            if (timer.id === payload) {
                timer.isActive = false;
            }
            return timer;
        })
        return {
            ...state,
            timers: newTimers
        }
    });
    store.on(resetActiveTimer, (state => {
        const newTimers = state.timers.map(timer => {
            timer.isActive = false;
            return timer;
        })
        return {
            ...state,
            timers: newTimers
        }
    }))
};
