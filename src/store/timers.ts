import {StoreonModule} from 'storeon'

import {
    addTimer,
    deleteTimer,
} from '../actions'

import {Timer, TimersStore} from './types'

const initialState: TimersStore = {
    timers: []
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
    /*
    store.on(getPostsSuccess, (state, payload) => {
        const newPosts = payload.reduce((acc, next) => {
            return {
                ...acc,
                [next.id]: next
            }
        }, {});
        return ({
            ...state,
            posts: {
                postsStatus: 'success',
                postsContent: newPosts
            }
        });
    });
     */
};
