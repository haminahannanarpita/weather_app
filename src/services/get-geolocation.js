export const getGeolocation = async (city)=>{
    // console.log("City:", city);
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
    const result = await fetch (url);
    // console.log(await result.json());
    if(!result){
        throw new Error("Geocoding request failed!");
    }
    const data = await result.json();
    const palce= data.results[0];
    // console.log(palce);
    return{
        name:palce.name,
        lat:palce.latitude,
        lon:palce.longitude
    };
}