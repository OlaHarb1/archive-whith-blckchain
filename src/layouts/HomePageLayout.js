import React from 'react';
import NavBar from "../components/NavBar";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";

const HomePageLayout = () => {
    return (
        <div>
            <NavBar/>
            <div style={{
                minHeight:"100vh"
            }}>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default HomePageLayout;