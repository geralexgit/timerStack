import { createStoreon } from 'storeon';
import { storeonDevtools } from 'storeon/devtools';

import { posts as postsStore } from './posts';
import { timers as timersStore } from './timers';
import {PostsStore, PostsEvents, TimersStore} from "./types";

const initDevTools = process.env.NODE_ENV !== 'production' && storeonDevtools;

// interface State extends PostsStore {}
interface Timers extends TimersStore {}
interface Events extends PostsEvents {}


// @ts-ignore
export const store = createStoreon([postsStore, timersStore, initDevTools]);
