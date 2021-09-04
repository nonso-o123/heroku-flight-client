import React from "react";
import { RiCustomerService2Line, RiSecurePaymentLine } from "react-icons/ri";
import { IoIosFlash } from "react-icons/io";
import { BsFillTagFill } from "react-icons/bs";


export default function Offers() {

    const offers = [
        {
            icon: <IoIosFlash />,
            title: "Instant Booking",
            info: "lorem ipsum dolor sit",
        },
        {
            icon: <RiCustomerService2Line />,
            title: "Prompt Customer Support",
            info: "lorem ipsum dolor sit",
        },
        {
            icon: <BsFillTagFill />,
            title: "Best Deals",
            info: "lorem ipsum dolor sit",
        },
        {
            icon: <RiSecurePaymentLine />,
            title: "Secure Payment",
            info: "lorem ipsum dolor sit",
        },
    ]

    return (
        <div className="row offers boxes col-section">
            {offers.map((item, index) => {
                return (
                    <article key={index} className="service">
                        <span>{item.icon}</span>
                        <h4>{item.title}</h4>
                        <p>{item.info}</p>
                    </article>
                );
            })}
        </div>

    );

}
