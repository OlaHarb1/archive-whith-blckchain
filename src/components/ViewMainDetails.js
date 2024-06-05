import React from 'react';
import SubInfoForUser from "./SubInfoForUser";

const ViewMainDetails = ({user ,isAuth=false }) => {
    const  isAdmin=localStorage.getItem("role")==="admin"
    return (
        <div>
            <SubInfoForUser label="ID" name={`${user.id}`}/>

            <SubInfoForUser label="Name" name={`${user.firstName} ${user.fatherName} ${user.lastName}`}/>
            <SubInfoForUser label="Mother Name" name={user.motherName}/>
            {
               ( isAdmin||isAuth)&&<>
                    <SubInfoForUser label="Email" name={user.email}/>
                    <SubInfoForUser label="Phone" name={user.mobileNumber}/>
                </>
            }
            <SubInfoForUser label="Birth Date" name={`${user.dateOfBirth}`}/>
            <SubInfoForUser label="Gender" name={user.gender}/>

        </div>
    );
};

export default ViewMainDetails;