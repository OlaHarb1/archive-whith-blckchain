import React, {useEffect, useState} from 'react';
import {Link, useLocation, useParams} from "react-router-dom";
import SubInfoForUser from "../../../components/SubInfoForUser";
import ViewMainDetails from "../../../components/ViewMainDetails";
import EditProfessor from "./EditProfessor";
import {SCApi} from "../../../tools/smartContractApi";
import LoadingPage from "../../../components/LoadingPage";
import {isAddress} from "ethers";
import SearchComponent from "../../../components/SearchComponent";

const DetailsStudent = () => {
    const pathname = useLocation().pathname
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const isAdmin=localStorage.getItem("role")==="admin"
    const isEmployee=localStorage.getItem("role")==="employee"

    const {id} = useParams()

    useEffect(() => {
        getUserDetails().then()
    }, [])

   const onEditUser=()=>{
       getUserDetails().then()
    }

    const getUserDetails = async () => {
        const r = await SCApi.getProfessor({id: id})
        if (r) {
            setUser(r)
            setLoading(false)
        }
    }
    if (loading) {
        return <LoadingPage/>
    }

    return (<>
        <div className={ `flex ${!isAdmin&&!isEmployee?"justify-between":"justify-end"} p-4 text-white bg-[#33699F] h-[80px]` }>
            {(!isAdmin&&!isEmployee)&& <div>
                <Link to="/students"
                      className="text-lg hover:text-[#33699F] px-4 py-3 border rounded-full mt-3 ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">Other
                    Students </Link>

            </div>
            }

            <h1 className="text-3xl font-bold">
                professor Details
            </h1>

        </div>


        <div className="flex pt-4 px-4 w-full mt-3 ">
            <div className="p-4 mx-10 w-1/2">
                <ViewMainDetails user={user}/>
                <SubInfoForUser label="Specialization" name={user.specialization}/>
                <SubInfoForUser label="Specialization" name={user.collegeName.split("-").join(" ")}/>
                {
                    isAdmin&&<SubInfoForUser label="Address" name={user.prof_address}/>
                }
            </div>
        </div>
        <div>
        </div>
        {isAdmin && <EditProfessor user={user} onEdit={onEditUser}/>}

    </>);
};

export default DetailsStudent;