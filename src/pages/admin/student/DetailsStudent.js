import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import SubInfoForUser from "../../../components/SubInfoForUser";
import Subject from "../../../components/Subject";
import EditStudent from "./EditStudent";
import ViewMainDetails from "../../../components/ViewMainDetails";
import {SCApi} from "../../../tools/smartContractApi";
import LoadingPage from "../../../components/LoadingPage";


const DetailsStudent = () => {
    const [user, setUser] = useState()
    const [warnings, setWarnings] = useState()
    const [courses, setCourses] = useState()
    const admin = localStorage.getItem("role") === "admin"
    const employee = localStorage.getItem("role") === "employee"
    const authorized = localStorage.getItem("role") === "authorized"
    const [isAuth, setIsAuth] = useState(false)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    useEffect(() => {
        getUserDetails().then()
    }, [])
    const getUserDetails = async () => {

        const student = await SCApi.viewDetailsStudent({id: id})
        const warnings = await SCApi.getWarnings({id: id})
        const courses = await SCApi.getStudentCourses({id: id})
        if (student && warnings && courses) {
            setUser(student)
            setIsAuth(student.student_address === localStorage.getItem("address"))
            setWarnings(warnings)
            setCourses(courses)
            console.log(warnings)
            setLoading(false)
        }

    }


    const onEditStudent = () => {
        getUserDetails().then()
    }
    if (loading) {
        return <LoadingPage/>
    }

    return (<>

        <div>
            <div className={ `flex ${!admin&&!employee?"justify-between":"justify-end"} p-4 text-white bg-[#33699F] h-[80px]` }>
                {!admin && !employee && <div className="p-2">
                    <Link to="/"
                          className="text-lg hover:text-[#33699F] px-4 py-3 border rounded-full mt-3 ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">Go
                        Home </Link>
                    <Link to="/students"
                          className="text-lg hover:text-[#33699F] px-4 py-3 border rounded-full mt-3 ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">Other
                        Info </Link>


                </div>}
                <h1 className="text-3xl font-bold">
                    Student Details
                </h1>

            </div>
            <div
                className={ `flex justify-center pt-4 px-4 w-full mt-3 `}>
                <div className="p-4 mx-10 w-1/2 flex justify-center">
                    <ViewMainDetails isAuth={isAuth} user={user}/>
                </div>
                <div className="w-1/2 flex justify-center">
                   <div>
                       <SubInfoForUser label="Collage" name={user.collegeName.split("-").join(" ")}/>
                       <SubInfoForUser label="Cumulative Average" name={`${user.cumulative_averge}`}/>
                       {(admin || employee || isAuth||authorized) && <>
                           <SubInfoForUser label="Address" name={user.student_address==="0x0000000000000000000000000000000000000000"? "":user.student_address}/>
                           <div className="p-2 ">
                               <h3 className="text-2xl text-[#33699F]  font-bold "> warnnings:</h3>
                               <div className="w-full lg:w-[80%] border h-[150px] mt-2 overflow-y-auto px-2 pt-1 ">
                                   {warnings?.map((w, index) => {
                                       return <li key={`warnning-${index}`}
                                                  className='text-lg list-decimal p-1'> {w}</li>
                                   })}
                               </div>
                           </div>
                       </>}</div>
                </div>
            </div>
            <div>
            </div>

            {(admin || employee||isAuth ||authorized) && <div className="flex justify-center">
                <div className="w-full">
                    <div className=" w-full min-h-[35vh] flex flex-wrap   gap-x-2 gap-y-2 p-2">

                        {courses?.map((subject) => <Subject key={`${subject.mark}-${subject.couse_id}`}
                                                            subject={subject}/>)}
                    </div>

                </div>


            </div>}
            {admin && <EditStudent onEdit={onEditStudent} user={user}/>}

        </div>
    </>);
};

export default DetailsStudent;