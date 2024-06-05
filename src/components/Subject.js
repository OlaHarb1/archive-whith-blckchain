import React, {useEffect, useState} from 'react';
import Course from "./Course";
import {SCApi} from "../tools/smartContractApi";

const Subject = ({subject}) => {
    const [mainSubject, setMainSubject] = useState()

    useEffect(() => {
        getSubject().then()
    }, [])
    console.log(subject)
    const getSubject = async () => {
        const r = await SCApi.getSubject({id: subject.couse_id})
        setMainSubject(r)
    }

    return (
        <div className="border w-full lg:w-[20%] md:w-[40%] h-[150px]  rounded-xl">
            <Course subject={mainSubject}/>
            <div className="text-center text-lg">
                <h4>{`${subject?.mark}`}</h4>
            </div>

        </div>
    );
};

export default Subject;