import React, {useEffect, useState} from 'react';
import ProfForAdmin from "../../../components/admin/ProfForAdmin";
import EmployeeForAdmin from "../../../components/admin/EmployeeForAdmin";
import AddEmployee from "./AddEmployee";
import {SCApi} from "../../../tools/smartContractApi";
import LoadingPage from "../../../components/LoadingPage";
import SearchComponent from "../../../components/SearchComponent";
import {useLocation} from "react-router-dom";
import {toast} from "react-toastify";

const ViewEmployees = () => {
    const [employees,setEmployees]=useState([])
    const [loading,setLoading]=useState(true)
    const isAuth=useLocation().pathname.startsWith("/employee/authorized")

    const deleteEmployee= (index)=>{

       const r=SCApi.deleteEmployee({id:index}).then((r)=>{
           if(r){
               getAllEmployee().then()
           }
       }).catch((err)=>{
           toast("you are canceled the operation")
       })

    }
    useEffect(()=>{
        getAllEmployee().then()

    },[])
    const getAllEmployee=async ()=>{
        if(!isAuth){
            SCApi.getAllEmployee().then((r)=>{
                setEmployees(r)

            }).catch((err)=>{
                console.log(err)
            }).finally(()=>{
                setLoading(false)
            })
            return;
        }
        const r=await SCApi.getAllAuth()
        if(r){
            setEmployees(r)
            setLoading(false)
        }

    }
    const onAddEmployee=()=>{
        getAllEmployee().then()
    }
    if(loading){
        return <LoadingPage/>
    }

    return (

        <div>

            {
                !employees? <div className="flex justify-center items-center h-full">not found</div>:<>
                    <div className="flex justify-end items-center  py-2 bg-[#33699F]">
                        <h3 className="text-4xl font-bold  text-white text-end p-3"> {isAuth?"Authorised":"All Employees"}</h3>

                    </div>
                    {
                        !employees?<div className="text-lg flex justify-center items-center h-[calc(100vh-64px)]  ">
                            not found
                        </div>:  <div className='mt-6 overflow-y-auto '>
                            {
                                employees.map((employee,i)=><EmployeeForAdmin onDeleteEmployee={deleteEmployee} key={`${employee}-${i}`} index={i} employee={employee}/>)
                            }
                        </div>
                    }
                </>
            }

            <AddEmployee isAuthorized={isAuth} onAdd={onAddEmployee}/>

        </div>
    );
};

export default ViewEmployees;