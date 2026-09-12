export const getWeather = async(place)=>{
    console.log("function",place);
    const {lat, lon, name}= place
    const url= `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m&current=temperature_2m,precipitation,weather_code,wind_speed_10m,relative_humidity_2m,apparent_temperature,is_day,rain`;

    const result = await fetch(url);
    // console.log(await result.json());
    const data =await result.json();
    const now = data.current
    // console.log(now);
    if(!now){
        throw new Error ("Weather detils et failed")
    }
    return{
        location:name,
        temperature : Math.round(now.temperature_2m),
        humidity : now.relative_humidity_2m,
        wind:now.wind_speed_10m
    }

}