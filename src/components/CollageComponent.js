import React from 'react';
import {Link} from "react-router-dom";

const CollageComponent = ({collage}) => {
    return (
      <div className="w-1/4 border rounded-3xl hover:opacity-50  pt-5 shadow shadow-blue-200  ">
          <Link to={`subjects/${collage.slug}`}>   <img className='w-full h-[200px]    rounded-t-3xl' src={collage.avatar} alt={collage.name}/>
          <h3
                className='p-3 text-center text-lg font-bold bg-blue-200 rounded-b-3xl '>{collage.name}</h3>
          </Link> </div>
    );
};

export default CollageComponent;