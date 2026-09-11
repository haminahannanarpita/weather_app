import { useState } from "react";
import LocationModal from "../components/LocationModal";


const Home = () => {
    const [click, setClick] = useState(false)
    console.log(click);
    
    return (
        <div >
           <div className="text-center">
             <h1 className="text-6xl text-blue-400 font-extrabold">Next l
                Level <span className="text-blue-600">Weather</span>
            </h1>
            <p className="py-4 text-md text-gray-400">Check your weather todayin next level</p>
           </div>
            <div className="flex justify-center items-center">
                <button type="button" 
                onClick={()=>setClick("Clicled")}
                className="text-lg font-medium bg-blue-500 px-5 py-1 rounded-4xl text-gray-100 cursor-pointer hover:scale-105 transition-all delay-300 ">Check Weather</button>
            </div>
            {
                click && <LocationModal onClose={()=> setClick(false)}></LocationModal>
            }

        </div>
    );
};

export default Home;