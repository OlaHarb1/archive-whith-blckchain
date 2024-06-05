import React, {useEffect, useState} from 'react';
import Course from "../../../components/Course";
import {Link, useParams} from "react-router-dom";
import colleges from "../../../constant/collages.json"
import AddSubject from "./AddSubject";
import {SCApi} from "../../../tools/smartContractApi";
import LoadingPage from "../../../components/LoadingPage";

const ViewSubjects = () => {
    const {subjectName} = useParams()
    const isAdmin = localStorage.getItem("role") === "admin"
    const isEmployee = localStorage.getItem("role") === "employee"
    const [subjects, setSubjects] = useState()
    const college = colleges.find((college) => college.slug === subjectName)
    const filterSubjects = subjects?.filter((subject) => subject.college === subjectName)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSubjects()
    })
    const getSubjects = () => {

        SCApi.getAllSubjects().then((r) => {
            if(r){
                setSubjects(r)
            }
        }).catch((err) => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })


    }
    const onAddSubjects=()=>{
        getSubjects()
    }

    if (loading) {
        return <LoadingPage/>
    }

    return (<>


            {
                !subjects ? <div className="flex justify-center items-center h-full"> not found
                </div> : <>
                    <div className="h-[80px] bg-[#33699F]">

                        <h2 className='text-5xl text-end  pt-5 text-white '> Colleges</h2>
                    </div>
                    <div className='flex justify-end items-center p-3'>
                        <h2 className="text-lg">{college.name}</h2>
                        <img className="h-[50px] w-[50px]" src={college.avatar} alt={college.name}/>
                    </div>

                    <div className='flex flex-wrap gap-x-5 gap-y-5  mx-8  p-4 mt-10'>
                        {filterSubjects?.map((subject, i) => <div key={i}
                                                                  className="w-[30%] h-[150px]  border-1 rounded-xl ">
                            <Course subject={subject}/>
                            {(isEmployee ||isAdmin )&& <Link to={`marks/${subject.id}`}>
                                <h3 className="text-xl text-start m hover:bg-[#33699F] text-[#33699F] hover:text-white px-3 h-[calc(150px-111px)]  rounded-b-xl">
                                    marks..</h3>
                            </Link>}
                        </div>)}
                    </div>
                </>

            }


            {isAdmin && <AddSubject onAdd={onAddSubjects} subjectName={subjectName}/>}

        </>

    );
};

export default ViewSubjects;