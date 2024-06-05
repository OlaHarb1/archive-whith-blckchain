import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons";
import {Link} from "react-router-dom";

const EmployeeForAdmin = ({employee ,onDeleteEmployee ,index}) => {

    return (
        <div
            className=" mt-3    mx-14 rounded-xl  hover:text-blue-800 font-bold border hover:border-[#33699F] bg-blue-200 flex flex-grow justify-between  py-4 px-3 ">
            <div className='ml-4'>
                <FontAwesomeIcon onClick={() => {
                    onDeleteEmployee(index)
                }} size='xl' className='p-1 text-red-600 hover:text-red-300 ml-24' icon={faTrashCan}/>
            </div>

            <div className='pr-24'>

                <p className='text-lg'>{employee}</p>

            </div>


        </div>
    );
};

export default EmployeeForAdmin;