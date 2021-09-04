import React from 'react'
import { Link } from 'react-router-dom';
import RegisterForm from './RegisterForm'



export default function PopularAirlines({ airlines }) {

    const popularAirlines = airlines.map((airline, indx) => {
        return (
            <Link to={`/airlines/${airline.name}`} key={indx}>
                <img src={airline.img} alt={`${airline.name}`} />
            </Link>
        )
    })

    return (
        <div className="row popular-airlines-row pop">
            <div className="col-sm-12 col-md-5 boxes popular-airlines">
                {popularAirlines}
            </div>
            <div className="col-sm col-md signup">
                <RegisterForm />
            </div>
        </div>
    )
}
