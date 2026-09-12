import { X } from 'lucide-react';
import { useState } from 'react';
import { getGeolocation } from '../services/get-geolocation';
import { useNavigate } from 'react-router';
const LocationModal = ({ onClose }) => {
    const navigate = useNavigate()
    const [city, setCity] = useState('')
    const [error, setError] = useState('')

    const goToPage = (location) => {
        navigate("/weather", { state: { location } })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const value = city.trim()
        // console.log(value);
        if(!value){
            setError("Please enter your city name")
            return
        }

        try {
            const location = await getGeolocation(value)
            // console.log(result);
            if (!location) {
                setError("Geocoding request failed!")

            }
            goToPage(location)
        } catch (error) {
            setError(error);
        }
    }
    const handleGeoLocations = () => {

        if(! navigator.geolocation){
            setError("Geolocation not found!")
            return

        }
        navigator.geolocation.getCurrentPosition((positions) => {
            const { latitude, longitude } = positions.coords
            // console.log({latitude,longitude});
            goToPage({ name: "Your Locations", lat: latitude, lon: longitude })
        }, (error) => {
            setError(error.message)
        }, {
            timeout: 10000
        })
    }

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-950/60">
            <div className="p-5 h-[360px] rounded-2xl w-[400px] bg-gray-100 shadow-2xl ">
                <div className='flex justify-between items-center'>
                    <h2 className="text-xl font-medium text-gray-500">Where are you today?</h2>
                    <button className=' hover:bg-red-600 cursor-pointer' onClick={onClose}><X /></button>
                </div>
                <div className='pt-8'>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder='Enter City name ' className='w-full border p-1 rounded-2xl' />
                        <div className=''>
                            <button type="submit"

                                className="text-lg w-full font-medium bg-blue-500 px-5 py-1 rounded-4xl text-gray-100 cursor-pointer hover:scale-105 transition-all delay-300 ">Get Weather</button>
                        </div>
                    </form>
                </div>
                <div>
                    <div className='py-1 text-center'>or</div>
                    <div className=''>
                        <button type="button"
                            onClick={handleGeoLocations}
                            className="text-lg font-medium w-full bg-blue-500 px-5 py-1 rounded-4xl text-gray-100 cursor-pointer hover:scale-105 transition-all delay-300 ">Use My Location</button>
                    </div>
                    <div className='text-center'>
                        {error && <p className='text-red-600 text-md font-medium'>{error}</p>}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default LocationModal;