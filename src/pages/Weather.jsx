import { useLocation } from "react-router";
import { getWeather } from "../services/get-weather";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";


const Weather = () => {
    const value = useLocation()
    const place = value.state.location
    const [weather, setWeather] = useState(null)
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
        if (!place) {
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
    }, [place])
    const Rain = ["drizzle","rain", "freezing-rain"]
    const getRecommandations = (weather)=>{
        if(!weather){
            return null;
        }
        if(weather.condition === "snow" ){
          return{type : "snow", label:"Snow", text:"It's snow outside today, Drive safely"}
        }
        if(Rain.includes(weather.condition)){
            return{type : "rain", label:"Rain", text:"It's rain today, Take umbrellay with you"}
        }
        if(weather.condition === "fog"){
            return{type : "fog", label:"Fog Alert", text:"It's foggy. Drive cearfully and keep some istance from other vehicles."}
        }
        // temperatures worth warning about (in C)
         if(weather.temperature >= 32){
            return{type : "hot", label:"Hot Day", text:"It's quite hot today. Take water bottle with you."}
        }
         if(weather.temperature <= 15){
            return{type : "cold", label:"Cold Day", text:"It's Cold today. wear warm clothes before heading out."}
        }
         if(weather.temperature >= 28){
            return{type : "warm", label:"warm Day", text:"It's warm today. Take some water  with you."}
        }
        // comfortable temperature, so just describe the sky.
         if(weather.condition === "clear"){
            return{type : "sunny", label:"Sunny Day", text:"Sunny skies ahead. Take water and consider and carrying sunglasses."}
        }
         if(weather.condition === "partly_cloudy" || weather.condition === "cloudy" ){
            return{type : "cloudy", label:"Cloudy Day", text:"Mostly cloudy today. A light jacket might come in handy."}
        }
        // Nothing special to report.
        return{type : "pleasant", label:"Perfect Day", text:"The weather looks comfortable today. Enjoy your day!."}
        
    }
    return (
        <div>
            <div className="grid md:grid-cols-2 gap-5">
                <div>
                    <div className="shadow-2xl rounded-2xl p-5">
                        <div className="space-y-3">
                            <h1 className="text-2xl text-blue-500 font-semibold">Today's Weather Details</h1>
                            <div className="flex items-center gap-3">
                                <MapPin size={30}></MapPin>
                                <h2 className="text-4xl text-purple-400 font-semibold">{place.name}</h2>
                            </div>
                            <div className="flex items-center gap-16">
                                <h3 className="text-6xl text-violet-700 font-extrabold">{weather?.temperature} C </h3>
                                <p className="text-4xl text-violet-700 font-semibold"> {weather?.description} </p>
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
                    <div className="shadow-2xl rounded-2xl p-5">
                        <h2 className="text-xl text-blue-700 font-bold">Smart Recommandations </h2>
                        <div className="text-lg text-green-600">
                            {getRecommandations(weather)?.text}
                        </div>
                    </div>

                </div>

                <div className="shadow-2xl flex flex-col items-center justify-between rounded-2xl p-5">
                    <div className="">
                        <h2 className="text-xl text-blue-700 font-bold">Live in {place.name} </h2>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className="text-6xl text-blue-800 font-semibold">{weather?.description}</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <span className="rounded-full border-3 border-purple-700 font-medium text-lg p-2">Feel's Like:{weather?.feelsLike}</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Weather;