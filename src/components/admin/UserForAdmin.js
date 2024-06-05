import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons"
import {Link} from "react-router-dom";

const UserForAdmin = ({user, onDelete}) => {
    const isAdmin=localStorage.getItem("role")==="admin"
    const className=isAdmin?"justify-between":"justify-between px-20"

    return (
        <div
            className={` mt-3  shadow shadow-blue-200 ${isAdmin?" mx-14":""} rounded-2xl hover:border-2 hover:border-[#33699F]  hover:text-blue-800 bg-blue-200 flex flex-grow  py-4 px-3 ${className}`}>
            {
                isAdmin&&<>
                    <div className='ml-4'>
                        <FontAwesomeIcon  onClick={() => {

                            onDelete(user.id)
                        }} size='xl' className='p-1 cursor-pointer text-red-600 hover:text-red-300 ml-24' icon={faTrashCan}/>
                    </div>
                    <div>
                        <p className='font-bold text-lg'> {user.student_address=== "0x0000000000000000000000000000000000000000" ? "-":user.student_address}</p>
                    </div></>
            }
            {!isAdmin&&<>
                <div>
                    <p className='font-bold text-lg'>{ user.collegeName.split("-").join(" ")}</p>
                </div>
            </>}
            <div className='pr-14 '>
                <Link to={`details/${user.id}`} className="flex items-center">
                    <p className={'text-2xl font-bold '}>{`${user.firstName} ${user.fatherName} ${user.lastName}`}</p>
                    <p className={'text-2xl ml-7 font-bold'}>{`${user.id}`}</p>
                </Link>
            </div>


        </div>
    );
};

export default UserForAdmin;