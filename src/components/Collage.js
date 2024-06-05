import React from 'react';

const Collage = ({image, name}) => {
    return (<div
            className='relative group w-[90%] ease-in-out  transition hover:overflow-hidden  md:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)]'>
            <img className='hover:scale-125  duration-1000  h-[25vh] w-full overflow-x-hidden  object-cover"' src={image}
                 alt={name}/>
            <div
                className='absolute -top-2 group-hover:top-10 group-hover:left-0 -left-2 p-2  h-15 opacity-90  text-center bg-[#33699F]'>
                <h1 className='text-white   text-2xl font-light text-center block '>{name}</h1>
            </div>

        </div>);
};

export default Collage;