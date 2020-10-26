import { h, FunctionalComponent } from "preact"
import TimeForm from "../components/TimeForm/TimeForm";
import TimersList from "../components/TimersList/TimersList";
import Timer from "../components/Timer/Timer";

const Home: FunctionalComponent<{path: string}> = () => (
    <div>
        <h1>Input time</h1>
        <TimeForm />
        <TimersList />
        <Timer />
    </div>
);

export default Home
