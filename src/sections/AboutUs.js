import React from 'react';
import {useParams} from "react-router-dom";

const AboutUs = () => {

    return (<div id="aboutus" className='mt-20 '>

               <h2 className='text-center text-4xl font-bold  p-3'> About us</h2>
               <p className='text-center text-xl font-light'>  The archive system platform offers you all transportation services
                   in one place, </p>
               <div className='flex w-full justify-center'>
                   <div className='flex-wrap md:w-1/2 lg:w-[75%] flex justify-center'>
                       <div className='w-1/2'>
                           <h4 className="pt-14 text-xl " >Our Story</h4>
                           <p className='text-xl font-medium  tracking-wider text-start pt-10'>
                               We are not just software developers, Our integrated team in multiple
                               fields will reveal to you the opportunities and possibilities. We
                               design our website in an engineering manner so that it is
                               maintainable, and we provide all the appropriate software solutions
                               and systems for your company, including mobile applications and
                               websites, using the latest international technologies.
                           </p>
                       </div>
                       <div className='w-1/2'>
                           <img className='w-full' src='/images/4569774.jpg' alt='archive'/>
                       </div>

                   </div>


           </div>
    </div>

    );
};

export default AboutUs;