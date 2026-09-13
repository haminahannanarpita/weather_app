import { useLocation } from "react-router";
import { getWeather } from "../services/get-weather";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";


const Weather = () => {
    const value = useLocation()
    const place = value.state.location
    const[weather, setWeather]=useState(null)
    console.log("weather", weather);
    // console.log(palce);
    // const fetchWeather = async()=>{
    //     try {
    //         const result = await getWeather(place)
    //         console.log(result);
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }
    // fetchWeather()
    // getWeather(place)
    useEffect(() => {
        if(!place){
            return
        }
        const fetchWeather = async () => {
            try {
                const result = await getWeather(place)
                // console.log(result);
                setWeather(result)
            } catch (error) {
                console.log(error);

            }
        }
        fetchWeather()
    },[place])
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5">
                <div className="shadow-2xl rounded-2xl p-5">
                    <div className="space-y-3">
                        <h1 className="text-2xl text-blue-500 font-semibold">Today's Weather Details</h1>
                        <div className="flex items-center gap-3">
                            <MapPin size={30}></MapPin>
                           <h2 className="text-4xl text-purple-400 font-semibold">{place.name}</h2> 
                        </div>
                        <div className="flex items-center gap-16">
                            <h3 className="text-6xl text-violet-700 font-extrabold">{weather?.temperature} C </h3>
                            <p className="text-6xl text-violet-500 font-semibold"> {weather?.description} </p>
                        </div>
                        <div className="flex justify-between items-center text-center gap-2">
                            <div className="shadow-2xl rounded-2xl p-4">
                               <h3 className="text-lg text-red-500 font-bold">Feels Like</h3>
                            <p className="text-xl text-orange-500 font-semibold"> {weather?.feelsLike} </p>
                            </div>
                            <div className="shadow-2xl rounded-2xl p-4">
                               <h3 className="text-lg text-red-500 font-bold">Huimidity</h3>
                            <p className="text-xl text-orange-500 font-semibold"> {weather?.humidity} </p>
                            </div>
                            <div className="shadow-2xl rounded-2xl p-4">
                               <h3 className="text-lg text-red-500 font-bold">Wind Speed</h3>
                            <p className="text-xl text-orange-500 font-semibold"> {weather?.windSpeed} </p>
                            </div>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Weather;