import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import AsideForEmployee from "../components/AsideForEmployee";

const EmployeeLayout = () => {
    return (
        <div >


            <div className='flex w-full'>
                <div className=' md:w-[25%]  min-h-[calc(100vh-68px)] '>
                    <div className='py-4  h-[80px]  bg-[#33699F] '>
                        <h1 className='lg:text-4xl md:text-2xl font-bold ml-5 text-white'>Employee Dashboard</h1>
                    </div>
                    <AsideForEmployee/>
                </div>
                <div className='w-full max-h-[calc(100vh-80px)]'>
                    <Outlet/>
                </div>
                <Link to='/' className='fixed left-0 bottom-0 m-8 p-4 rounded-full bg-[#33699F] hover:text-[#33699F] hover:bg-gray-200 items-center  text-white flex'>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </Link>


            </div>
        </div>
    );
};

export default EmployeeLayout;