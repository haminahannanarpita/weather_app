import { useLocation } from "react-router";
import { getWeather } from "../services/get-weather";


const Weather = () => {
    const value = useLocation()
    const place = value.state.location
    // console.log(palce);
    const fetchWeather = async()=>{
        try {
            const result = await getWeather(place)
            console.log(result);
        } catch (error) {
            console.log(error);
            
        }
    }
    fetchWeather()
    getWeather(place)
    return (
        <div>
            <h1>this is weather page</h1>
        </div>
    );
};

export default Weather;