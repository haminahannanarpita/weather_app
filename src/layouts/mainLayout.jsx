import { Outlet } from "react-router";

const mainLayout = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div></div>
            <div>
                <Outlet></Outlet>
            </div>
            <div></div>
            
            
        </div>
    );
};

export default mainLayout;