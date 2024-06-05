import React, {useEffect, useState} from 'react';

import ProfForAdmin from "../../../components/admin/ProfForAdmin";
import AddProfessor from "./AddProfessor";
import LoadingPage from "../../../components/LoadingPage";
import {SCApi} from "../../../tools/smartContractApi";
import SearchComponent from "../../../components/SearchComponent";
import {toast} from "react-toastify";


const ViewProfessors = () => {
    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)
    const admin=localStorage.getItem("role")==="admin"

    const deleteStudent = (userId) => {
       SCApi.deleteProfessor({id:userId}).then((r)=>{
          getProfessors().then()
        }).catch(()=>{
            toast("you are canceled the operation")
       })

    }
    useEffect(() => {
        getProfessors().then()
    }, [])
    const getProfessors = async () => {
       const r=await SCApi.getAllProfessors()
        console.log(r)
            setUsers(r)
            setLoading(false)

    }
    const onAddProfessor = () => {
        getProfessors().then()
    }
    if (loading) {
        return <LoadingPage/>
    }


    return (
        <>
        <div className="flex justify-end items-center  py-2 bg-[#33699F]">
            <SearchComponent onSearch={(search)=>{
                if(users.length===0) {
                    getProfessors()
                }
                let filterUser= users?.filter((user)=>{
                    return parseInt(user.id)===parseInt(search)
                })
                setUsers(filterUser)
            }}/>
            <h3 className="text-4xl font-bold  text-white text-end p-3"> All Professors</h3>

        </div>
            {
                !users?<div className="text-lg flex justify-center items-center h-full">not fount</div>:<>
                    <div className='mt-6 overflow-y-auto'>
                        {

                            users?.map((user) => <ProfForAdmin onDelete={deleteStudent} key={`${user.id}-${user.lastName}`}
                                                               user={user}/>)
                        }
                    </div></>
            }
            {
                admin&&<AddProfessor onAdd={onAddProfessor}/>

            }
        </>
    );
};

export default ViewProfessors;