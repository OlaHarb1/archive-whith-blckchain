import React from 'react';
import {Spinner} from "@nextui-org/react";

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <Spinner label="loading.." color="default" labelColor="foreground"/>
        </div>
    );
};

export default LoadingPage;