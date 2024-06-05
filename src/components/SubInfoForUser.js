import React from 'react';

const SubInfoForUser = ({label,name}) => {
    return (

            <div className="flex gap-3 p-3 ">
                <h3 className="text-2xl text-[#33699F]  font-bold"> {label} :</h3>
                <h4 className="text-xl">{name}</h4>
            </div>

    );
};

export default SubInfoForUser;