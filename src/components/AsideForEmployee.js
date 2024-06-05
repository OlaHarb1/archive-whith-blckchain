import React from 'react';
import {Link, useLocation} from "react-router-dom";

const AsideForEmployee = () => {


    const links = [
        {
            label: "Students",
            to: "students"
        },
        {
            label: "Colleges",
            to: "colleges"
        },
        {
            label: "Professors",
            to: "professors"
        }, {
            label: "Authorized",
            to: "authorized"
        },

    ]

    const path = useLocation().pathname

    return (
        <>
            <ul className='py-8 border-r-1 min-h-[calc(100%-80px)] '>
                {
                    links.map((l) => <Link to={l.to} key={l.label}>
                        <li className={`hover:bg-gray-200 text-xl py-4 w-full text-center hover:text-[#33699F] font-bold ${path === `/employee/${l.to}` ? "text-[#33699F] bg-gray-200" : ""}`}>{l.label}</li>
                    </Link>)
                }
            </ul>
        </>
    );


};

export default AsideForEmployee;