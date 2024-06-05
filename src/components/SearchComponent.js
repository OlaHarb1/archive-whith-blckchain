import React, {useState} from "react";
import {Input} from "@nextui-org/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";

const SearchComponent=({onSearch})=> {
    const [search,setSearch]=useState('')


    return (
        <div className="ml-3 w-1/4" >
            <Input
                label="Search"
                isClearable
                radius="lg"
                defaultValue={search}
                onChange={(e)=>{setSearch(e.target.value)


                }}
                classNames={{
                    label: "text-black dark:text-white/90",
                    input: [

                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-l",
                        "bg-gray-200",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-blue-200",
                        "dark:hover:bg-default/70",
                        "group-data-[focus=true]:bg-blue-200",
                        "dark:group-data-[focus=true]:bg-default/60",
                        "!cursor-text",

                    ],
                }}
                placeholder="Type to search..."
                startContent={
                    <FontAwesomeIcon onClick={()=>{
                        onSearch(search)
                    }} icon={faSearch} className="cursor-pointer px-4 text-black/50 mb-0.5 dark:text-white/90 text-slate-400 flex-shrink-0" />
                }
            />
        </div>
    );
}
export default SearchComponent;