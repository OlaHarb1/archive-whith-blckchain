import React, {useEffect, useState} from 'react';
import UserForAdmin from "../../../components/admin/UserForAdmin";
import AddStudent from "./AddStudent";
import {SCApi} from "../../../tools/smartContractApi";
import LoadingPage from "../../../components/LoadingPage";
import {Link} from "react-router-dom";
import SearchComponent from "../../../components/SearchComponent";
import CheckAddressIfEmployee from "../../../components/CheckAddressIfEmployee";
import {toast} from "react-toastify";
const ViewStudents = () => {
    const [users,setUsers]=useState()
    const isAdmin=localStorage.getItem("role")==="admin"
  const [loading,setLoading]=useState(true)
    const deleteStudent=  (userId) => {
        SCApi.deleteStudent({id:userId}).then((r)=>{
            if(r){
                getStudents()
            }
        }).catch((err)=>{
            toast("you are canceled the operation")
        })

    }
    useEffect(()=>{
        getStudents()
    },[])
    const getStudents= () => {
       SCApi.getAllStudents().then((r)=>{
           setUsers(r)
       }).catch((er)=>{
           console.log(er)
       }).finally(()=>{
           setLoading(false)

       });

    }
    const onAddStudent=()=>{
        getStudents()
    }
    if(loading){
        return <LoadingPage/>
    }
    return (
        <>

            <div className={`flex ${isAdmin?"justify-end":"justify-between"} items-center w-full  py-2 bg-[#33699F]`}>
                {!isAdmin && <div className="flex items-center justify-center w-full">
                    <CheckAddressIfEmployee/>

                    <Link to="/"
                          className="text-lg hover:text-[#33699F]  px-4 py-3 border rounded-full  ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">Go to Home </Link>
                    <Link to="/colleges"
                          className="text-lg hover:text-[#33699F] px-4 py-3 border rounded-full  ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F] ">Other
                        Colleges </Link>
                    <Link to="/professors"
                          className="text-lg hover:text-[#33699F] px-4 py-3 border rounded-full ml-2 text-white bg-[#33699F] hover:bg-white hover:border-[#33699F]">
                        Professors </Link>
                </div>
                }
               <div className="flex justify-end items-center w-[80%]">
                   <SearchComponent onSearch={(search)=>{
                   if(users.length===0|| search==="") {
                       getStudents()
                   }
                   let filterUser= users?.filter((user)=>{
                       return parseInt(user.id)===parseInt(search)
                   })
                   setUsers(filterUser)
               }}/>

                   <h3 className="text-4xl font-bold  text-white text-end p-3"> All Student</h3>
               </div>
            </div>
            < div className="flex justify-center  ">

                <div className={`mt-6 overflow-y-auto ${isAdmin?"w-full":"w-[70%]"}`}>
                    {
                        users?.map((user,i)=><UserForAdmin  onDelete={deleteStudent} key={`${user.firstName}-${i}-${user.id}`} user={user}/>)
                    }
                </div>
                {
                    isAdmin&&<AddStudent onAdd={onAddStudent} />

                }
            </div></>

    );
};

export default ViewStudents;