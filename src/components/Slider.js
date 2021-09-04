import React, { useState, useEffect, useRef } from 'react'


export default function Slider({ children }) {

    const leftRef = useRef(null)
    const rightRef = useRef(null)

    const leftRefValue = rightRef.current && rightRef.current.scrollRight >= 0 ? true : false

    const [prevDisabled, setPrevDisabled] = useState(true)
    const [nextDisabled, setNextDisabled] = useState(leftRefValue)

    const offsetWidthValue = leftRef.current && leftRef.current.offsetWidth,
        scrollWidthValue = leftRef.current && leftRef.current.scrollWidth;

    useEffect(() => {
        leftRef.current.scrollLeft -= offsetWidthValue / 2;
        checkButtons(offsetWidthValue, scrollWidthValue);
    });


    const checkButtons = (offsetWidthValue, scrollWidthValue) => {
        setPrevDisabled(() => leftRef.current.scrollLeft <= 0 ? true : false)
        setNextDisabled(() => leftRef.current.scrollLeft + offsetWidthValue >= scrollWidthValue ? true : false)
    };

    return (
        <div className="slider-container" ref={leftRef}>
            <div className="slider-wrapper">
                <div
                    className={prevDisabled ? "disable btn btn-slide prev" : "btn btn-slide prev"}
                    disabled={prevDisabled}
                    onClick={() => {
                        leftRef.current.scrollLeft -= offsetWidthValue / 2;
                        checkButtons(offsetWidthValue, scrollWidthValue);
                    }}>
                    {"<"}
                </div>

                {children}
                <div ref={rightRef}
                    className={nextDisabled ? "disable btn btn-slide next" : "btn btn-slide next"}
                    disabled={nextDisabled}
                    onClick={() => {
                        leftRef.current.scrollLeft += offsetWidthValue / 2;
                        checkButtons(offsetWidthValue, scrollWidthValue);
                    }}
                >
                    {">"}
                </div>

            </div>


        </div>
    );

}









