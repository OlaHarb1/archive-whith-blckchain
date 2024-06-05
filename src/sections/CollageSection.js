import React from 'react';
import Collage from "../components/Collage";
import collages from "../constant/collages.json"
const CollageSection = () => {

    return (
        <div id="collages" className='mt-20 mb-10'>
            <h1 className="text-5xl font-bold text-center">Colleges</h1>
            <div className='mt-8 flex justify-center'>
                <div className=' flex gap-x-6 gap-y-8 flex-wrap justify-between md:w-1/2 lg:w-[75%]'>
                    {
                        collages.map((collage)=><Collage key={collage.name} name={collage.name} image={collage.image}/>)
                    }
                </div>

            </div>

        </div>
    );
};

export default CollageSection;