import { useLocation } from "react-router";


const Weather = () => {
    const value = useLocation()
    const palce = value.state.location
    console.log(palce);
    return (
        <div>
            <h1>this is weather page</h1>
        </div>
    );
};

export default Weather;