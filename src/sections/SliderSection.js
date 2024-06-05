import React from 'react';
import {Splide, SplideSlide} from "@splidejs/react-splide";

const SliderSection = () => {
    return (
        <Splide options={{
            padding:"1px",

            cover:true,
            height:"90vh",
            width:"100%",
            type:"loop",
            rewind:"true",
            drag   : 'free',
            perPage: 1,
            autoScroll: {
                speed: 1,
            },
        }} aria-label="My Favorite Images">
            <SplideSlide>
                <img className='object-center ' src="images/first-image.jpg" alt="Image 3"/>
            </SplideSlide>
            <SplideSlide>
                <img src="images/third_imagge.jpg" alt="Image 1"/>
            </SplideSlide>
            <SplideSlide>
                <img src="images/second-image.jpg" alt="Image 2"/>
            </SplideSlide>

        </Splide>
    );
};

export default SliderSection;