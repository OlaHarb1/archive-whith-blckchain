import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashCan} from "@fortawesome/free-regular-svg-icons"
import {Link} from "react-router-dom";

const UserForAdmin = ({user, onDelete}) => {
    const admin=localStorage.getItem("role")==="admin"
    return (
        <div
            className={` mt-3  shadow  mx-14 rounded-xl  font-bold hover:text-blue-800 hover:border-2 hover:border-[#33699F] bg-blue-200 flex flex-grow  justify-between  py-4 px-3 ${admin?"":"mx-80"} `}>
            {admin&&<>
                <div className='ml-4'>
                    <FontAwesomeIcon onClick={() => {
                        onDelete(user.id)
                    }} size='xl' className='p-1 text-red-600 hover:text-red-300 ml-24' icon={faTrashCan}/>
                </div>
                <div>
                    <p className='text-lg'> {user.prof_address==="0x0000000000000000000000000000000000000000" ? "-":user.prof_address}</p>
                </div>
            </>

                }
            {!admin&&<>
                <div className="pl-24">
                    <p className='text-lg'> {user.collegeName.split("-").join(" ")}</p>
                </div>
            </>}
            <div className='pr-24 w-1/4'>
                <Link className={admin?`flex items-center`:`flex justify-center`} to={`details/${user.id}`}>
                    <p className='text-lg '>{`${user.firstName} ${user.fatherName} ${user.lastName}`}</p>
                    <p className={'text-2xl ml-7 font-bold'}>{`${user.id}`}</p>

                </Link>
            </div>


        </div>
    );
};

export default UserForAdmin;