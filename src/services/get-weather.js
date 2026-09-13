const WMO_CODES = {
    0: {
        condition: "Clear",
        description: "Clear Sky",
        label: "clear_sky",
        icon: "clear"
    },

    1: {
        condition: "Mainly Clear",
        description: "Mainly Clear",
        label: "mainly_clear",
        icon: "partly_cloudy"
    },

    2: {
        condition: "Partly Cloudy",
        description: "Partly Cloudy",
        label: "partly_cloudy",
        icon: "partly_cloudy"
    },

    3: {
        condition: "Overcast",
        description: "Overcast",
        label: "overcast",
        icon: "cloudy"
    },

    45: {
        condition: "Fog",
        description: "Fog",
        label: "fog",
        icon: "fog"
    },

    48: {
        condition: "Rime Fog",
        description: "Depositing Rime Fog",
        label: "rime_fog",
        icon: "fog"
    },

    51: {
        condition: "Drizzle",
        description: "Light Drizzle",
        label: "light_drizzle",
        icon: "drizzle"
    },

    53: {
        condition: "Drizzle",
        description: "Moderate Drizzle",
        label: "moderate_drizzle",
        icon: "drizzle"
    },

    55: {
        condition: "Drizzle",
        description: "Dense Drizzle",
        label: "dense_drizzle",
        icon: "drizzle"
    },

    56: {
        condition: "Freezing Drizzle",
        description: "Light Freezing Drizzle",
        label: "light_freezing_drizzle",
        icon: "freezing_drizzle"
    },

    57: {
        condition: "Freezing Drizzle",
        description: "Dense Freezing Drizzle",
        label: "dense_freezing_drizzle",
        icon: "freezing_drizzle"
    },

    61: {
        condition: "Rain",
        description: "Slight Rain",
        label: "light_rain",
        icon: "rain"
    },

    63: {
        condition: "Rain",
        description: "Moderate Rain",
        label: "moderate_rain",
        icon: "rain"
    },

    65: {
        condition: "Rain",
        description: "Heavy Rain",
        label: "heavy_rain",
        icon: "heavy_rain"
    },

    66: {
        condition: "Freezing Rain",
        description: "Light Freezing Rain",
        label: "light_freezing_rain",
        icon: "freezing_rain"
    },

    67: {
        condition: "Freezing Rain",
        description: "Heavy Freezing Rain",
        label: "heavy_freezing_rain",
        icon: "freezing_rain"
    },

    71: {
        condition: "Snow",
        description: "Slight Snow Fall",
        label: "light_snow",
        icon: "snow"
    },

    73: {
        condition: "Snow",
        description: "Moderate Snow Fall",
        label: "moderate_snow",
        icon: "snow"
    },

    75: {
        condition: "Snow",
        description: "Heavy Snow Fall",
        label: "heavy_snow",
        icon: "heavy_snow"
    },

    77: {
        condition: "Snow Grains",
        description: "Snow Grains",
        label: "snow_grains",
        icon: "snow"
    },

    80: {
        condition: "Rain Showers",
        description: "Slight Rain Showers",
        label: "light_rain_showers",
        icon: "rain_showers"
    },

    81: {
        condition: "Rain Showers",
        description: "Moderate Rain Showers",
        label: "moderate_rain_showers",
        icon: "rain_showers"
    },

    82: {
        condition: "Rain Showers",
        description: "Violent Rain Showers",
        label: "heavy_rain_showers",
        icon: "rain_showers"
    },

    85: {
        condition: "Snow Showers",
        description: "Slight Snow Showers",
        label: "light_snow_showers",
        icon: "snow_showers"
    },

    86: {
        condition: "Snow Showers",
        description: "Heavy Snow Showers",
        label: "heavy_snow_showers",
        icon: "snow_showers"
    },

    95: {
        condition: "Thunderstorm",
        description: "Thunderstorm",
        label: "thunderstorm",
        icon: "thunderstorm"
    },

    96: {
        condition: "Thunderstorm",
        description: "Thunderstorm with Slight Hail",
        label: "thunderstorm_hail",
        icon: "thunderstorm"
    },

    99: {
        condition: "Thunderstorm",
        description: "Thunderstorm with Heavy Hail",
        label: "heavy_thunderstorm_hail",
        icon: "thunderstorm"
    }
};



export const getWeather = async(place)=>{
    console.log("function",place);
    const {lat, lon}= place
    const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current=temperature_2m,precipitation,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,is_day,rain`;

    const result = await fetch(url);
    // console.log(await result.json());
    const data =await result.json();
    const now = data.current;
    console.log(now.weather_code);
    if(!now){
        throw new Error ("Weather detils et failed")
    }

    const weather = WMO_CODES[now.weather_code]
    // console.log(weather);
    const icon = weather.icon === "clear" && now.is_day=== 0? "clear_night":weather.icon
    return{
       
        temperature : Math.round(now.temperature_2m),
        humidity : now.relative_humidity_2m,
        windSpeed:now.wind_speed_10m,
        feelsLike:Math.round(now.apparent_temperature),
        condition:weather.condition,
        description:weather.description,
        conditionLabel:weather.label,
        icon

       
    }

}