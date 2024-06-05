import React from 'react';
import SliderSection from "../sections/SliderSection";
import CollageSection from "../sections/CollageSection";
import AboutUs from "../sections/AboutUs";
import GoogleMap from "../sections/GoogleMap";
import { SCApi } from "../tools/smartContractApi"
import { Web3Functions } from "../tools/web3"
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const HomePage = () => {
    const nav=useNavigate()

    return (

        <div >

            <SliderSection/>
            <CollageSection/>
            <AboutUs/>
            <GoogleMap/>
            <div onClick={
                async () => {

                    localStorage.clear()
                    let accounts = await Web3Functions.loadWeb3()
                    if(!accounts[0]) {
                        toast("please check connection")
                        return;
                    }
                    let address= accounts[0].replace("0x",'')
                    localStorage.setItem("address",accounts[0])


                    let r = await SCApi.checkRole({address:address})
                    console.log("=================", r)
                    if (r === 1n) {
                        nav("/admin/students")
                        localStorage.setItem("role","admin")
                    }
                    if (r===2n) {
                        nav("/employee/students")
                        localStorage.setItem("role","employee")

                    }
                    if(r===3n){
                        localStorage.setItem("role","professor")

                        let professors=await SCApi.getAllProfessors()


                        if(professors) {
                            const professor= professors.filter((professor) => professor.prof_address === `0x${address}`)

                            nav(`professors/details/${professor[0]?.id}`)
                        }

                    }

                    if(r===4n){
                        localStorage.setItem("role","student")
                        let students=await SCApi.getAllStudents()
                        if(students) {
                            const student = students.filter((student) => student.student_address === `0x${address}`)
                            nav(`students/details/${student[0]?.id}`)
                        }

                    }
                    if(r===5n) {
                        localStorage.setItem("role","authorized")
                        nav("/students")
                    }

                    if(r===6n) {
                        nav("/students")
                    }

                }
            }  className='rounded-full fixed right-0 text-center p-5  text-white mb-10 mr-10 bottom-0 bg-[#33699F] hover:bg-blue-400 shadow-neutral-800'>Get Start</div>
        </div>
    );
};

export default HomePage;