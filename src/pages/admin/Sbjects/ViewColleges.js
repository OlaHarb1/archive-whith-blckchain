import React from 'react';
import collages from "../../../constant/collages.json"
import CollageComponent from "../../../components/CollageComponent";
import {Link} from "react-router-dom";

const ViewColleges = () => {
    const role = localStorage.getItem("role")
    return (

        <>

            <div className={`h-[80px] bg-[#33699F] ${role!=="admin"&&role!=="employee" ? "flex justify-between items-center":""}  `}>
                {
                    role !== "admin" && role !== "employee" && <div>
                        <Link to="/students"
                              className="text-lg hover:text-[#33699F]  px-4 py-3 border rounded-full  ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">
                            Back
                            </Link>

                    </div>
                }

                <h2 className='text-4xl text-end  p-4 text-white '> Colleges</h2>
            </div>
            <div className='flex justify-center items-center  h-[75%]'>
                <div className="w-full flex flex-wrap justify-center gap-x-10 gap-y-4 mt-6 mx-3">
                    {collages.map((collage) => <CollageComponent key={collage.slug} collage={collage}/>)}
                </div>
            </div>
        </>


    );
};

export default ViewColleges;