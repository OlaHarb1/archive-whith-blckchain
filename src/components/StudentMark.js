import React, {useEffect, useState} from 'react';
import {SCApi} from "../tools/smartContractApi";

const StudentMark = ({grade}) => {
    const [student,setStudent]=useState()
    console.log(student)
    console.log(grade)
    useEffect(() => {
        getStudent()

    }, []);

    const getStudent= ()=>{
     SCApi.viewDetailsStudent({id:grade?.student_id}).then((r)=>{
            setStudent(r)
        }).catch((e)=>{
            console.log(e)

     })
    }
    return (
        <div className='flex justify-between'>
         <h4 className='p-4 text-2xl text-black'>{`${grade?.mark}`}</h4>
           <h4  className='p-4 text-2xl'>{`${student?.firstName} ${student?.fatherName} ${student?.lastName}`}</h4>

            
        </div>
    );
};

export default StudentMark;