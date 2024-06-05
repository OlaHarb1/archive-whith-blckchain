import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import StudentMark from "../../components/StudentMark";
import AddMark from "../../components/AddMark";
import {SCApi} from "../../tools/smartContractApi";
import LoadingPage from "../../components/LoadingPage";

const ViewMarks = () => {
    const [course, setCourse] = useState()
    const [loading, setLoading] = useState(true)
    const {subjectId, collegeName} = useParams()
    const [marks, setMarks] = useState()
    const employee=localStorage.getItem('role')==="employee"

    useEffect(() => {
        getCourseSubjects().then()
    }, [])

    const getCourseSubjects = async () => {
        const r = await SCApi.getSubject({id: subjectId})
        const marks = await SCApi.getMarks({id: subjectId})

        if (r ) {
            setCourse(r)
            if (marks){
                setMarks(marks)
            }
            setLoading(false)
        }
    }


    const onAdd=()=>{
        getCourseSubjects().then()
    }

    if (loading) {
        return <LoadingPage/>
    }
    return (
        <div>
            <div className="h-[80px] bg-[#33699F]">

                <h2 className='text-4xl text-end  p-3 text-white '> marks</h2>
            </div>
            <h1 className='text-7xl text-center pt-4 px-4'>   {course?.name}</h1>
            <p className=' text-center text-sm p-4'>
              level :{course?.level}  weekly hour:{course?.weekly_hour}
            </p>
            <div className='flex justify-center'>
                <div className="container lg:px-64 md:px-40 px-10 overflow-auto">
                    {
                       marks?.map((grade) => <StudentMark grade={grade}/>)
                    }
                </div>
            </div>
            {
                employee&&<AddMark onAdd={onAdd} collegeName={collegeName} course={course}/>

            }
        </div>
    )
};

export default ViewMarks;