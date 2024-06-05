import React, {useEffect, useState} from 'react';
import UserForEmployee from "../../components/UserForEmployee"
import {useParams} from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import {SCApi} from "../../tools/smartContractApi";
import SearchComponent from "../../components/SearchComponent";

const ViewUserForEmployee = () => {
    const isProfessor = useParams()?.userType === "professors";

    const [users, setUsers] = useState()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      getAllUsers();
    }, [isProfessor])
    const getAllUsers = () => {
        (isProfessor ? SCApi.getAllProfessors() : SCApi.getAllStudents()).then((r) => {
            if(r){
                setUsers(r)
            }
        }).catch((e) => {
            console.log(e)
        }).finally(() => {
            setLoading(false)
        })
    }
    const onEditInfo=()=>{
        getAllUsers()
    }

    if (loading) {
        return <LoadingPage/>
    }

    return (<div key={isProfessor ? "professorUsers" : "studentUsers"}>
           <div className="flex justify-end items-center text-white py-3 bg-[#33699F]">
                   <SearchComponent onSearch={(search)=>{
                      if(users.length===0) {
                          getAllUsers()
                      }
                     let filterUser= users?.filter((user)=>{
                         return parseInt(user.id)===parseInt(search)
                     })
                          setUsers(filterUser)
                   }}/>


               <h3 className="text-4xl p-2 text-end font-bold ">
                   {!isProfessor ? "All Students" : "All Professors"}
               </h3>

           </div>
            <div className='mt-6 overflow-y-auto'>
                {users?.map((user, i) => <UserForEmployee  onEdit={onEditInfo} isStudent={!isProfessor}
                                                          key={`${user.id} ${i}`} user={user}/>)}
            </div>
        </div>


    );
};

export default ViewUserForEmployee;