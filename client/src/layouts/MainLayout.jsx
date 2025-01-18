import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../sheard/Footer";
 

 

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="min-h-[330px]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;