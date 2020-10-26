import { h, FunctionalComponent } from "preact"
import TimeForm from "../components/TimeForm/TimeForm";

const Home: FunctionalComponent<{path: string}> = () => (
    <div>
        <h1>Input time</h1>
        <TimeForm />
    </div>
);

export default Home
