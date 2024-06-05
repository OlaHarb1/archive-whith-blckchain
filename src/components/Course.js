import React from 'react';

const Course = ({subject}) => {
    return (
            <div className='pt-3 px-1 h-[75%] rounded-t-xl border-b bg-blue-100 relative'>
                <h6 className="text-xl p-2">
                    {subject?.name}
                </h6>
                <div className='flex justify-between gap-x-2 absolute bottom-0 right-0'>
                    <p className="text-sm font-light p-1 ">{subject?.weekly_hour} weekly hour</p>
                    <p className="text-sm font-light  p-1"> level {subject?.level} </p>

                </div>
            </div>

    );
};

export default Course;