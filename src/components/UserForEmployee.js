import React from 'react';
import AddSubInput from "./AddSubInput";
import {Link} from "react-router-dom";


const UserForEmployee = ({user, isStudent = false, onEdit}) => {

    return (
        <div
            className=" mt-3 lg:mx-16 md:mx-8 mx-3 rounded-2xl shadow shadow-blue-500 hover:border hover:border-[#33699F]  hover:text-blue-800 bg-blue-200 flex flex-grow justify-between items-center py-4 px-3 ">
            <div className="flex gap-2">
                <div className='ml-4  pt-2'>
                    <AddSubInput onADD={onEdit} studentId={user.id} isAddress isStudent={isStudent}/>
                </div>
                {isStudent && <div className='ml-4 pt-2'>
                    <AddSubInput onADD={onEdit} studentId={user.id}/>
                </div>
                }
            </div>

            <div>
                <p className='text-lg'> {user.student_address === "0x0000000000000000000000000000000000000000" ? "-" : user[isStudent?"student_address":"prof_address"]}</p>
            </div>
            <Link to={isStudent?`details/${user.id}`:`details/${user.id}`}>
                <div className='pr-24 py-2 flex '>
                    <p className='text-lg font-bold whitespace-pre-wrap'>{`${user.firstName} ${user.fatherName} ${user.lastName}`}</p>
                    <p className='text-lg font-bold whitespace-pre-wrap ml-2'>  {`${user.id}`}</p>

                </div>


            </Link>


        </div>
    );
};

export default UserForEmployee;