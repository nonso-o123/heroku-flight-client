import React, { useState, useEffect } from 'react'
import Accordion from './Accordion'

export default function FlightsList({ flightSchedules, storageData }) {


    const dest = { ...flightSchedules }
    console.log(dest)


    const results = Object.values(dest).map((match, i) => {
        const inner = Object.values(match).map((item, j) => {
            let deprt = new Intl.DateTimeFormat('en-us',
                { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' })
                .format(new Date(Date.parse(item.departure_at)))
            let ret = new Intl.DateTimeFormat('en-us',
                { year: 'numeric', month: 'short', day: '2-digit', hour: 'numeric', minute: '2-digit' })
                .format(new Date(Date.parse(item.return_at)))
            return (
                <div className="row mb-5" key={j}>
                    <Accordion
                        content={`
            <ul class="d-flex p-3">
                      <li class="accordion-content">Adults: ${storageData.adults}</li>
                      <li class="accordion-content">Children: ${storageData.children}</li>
                      <li class="accordion-content">Infants: ${storageData.infants}</li>
                    </ul>
            `}>
                        <ul>
                            <li><div>From: {storageData.origin}</div></li>
                            <li><div>To: {storageData.destination}</div></li>
                            <li className="accordMobile"><div>Airline: {item.airline} &nbsp;</div></li>
                            <li className="accordMobile"><div>Departure: {deprt}</div></li>
                            <li className="accordMobile"><div>Return: {ret}</div></li>
                            <li className="accordMobile"><div>Flight Number: {item.flight_number}</div></li>
                            <li className="accordMobile"><div>Price: ${item.price}.00</div></li>
                        </ul>
                        <button type="submit" className="btn btn-info float-right">Select</button>
                    </Accordion>
                </div>
            )
        })
        return inner


    })

    return (
        <div className="accordion-row">
            {results}
        </div>
    )
}
