import React from 'react';
import {useParams} from "react-router-dom";

const Footer = () => {
    const {id}=useParams()
    return (
        <div id="contact" className='w-full flex bg-gray-100 mt-10 justify-center pb-7'>
            <div className='flex-wrap w-[70%] flex justify-center'>
                <div className='w-1/2 pt-10' >
                    <h2 className='text-3xl font-bold pt-10'>Contact us</h2>
                    <p className='text-lg whitespace-break-spaces p-4'>
                        We are here to assist you every step of the way. <br />
                        Whether you have questions about the system features, need technical
                        support, or want to explore integration possibilities, our team is
                        ready to help..                    </p>
                </div>
                <div className='w-1/2 flex justify-center '>
                    <div className='flex justify-center items-center'>
                        <h1>bla@gmail.com</h1>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Footer;