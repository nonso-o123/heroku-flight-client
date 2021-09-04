import React, { useState } from 'react'
import CustomRangeSlider from './CustomSlider/CustomRangeSlider'



export default function FlightsFilter({ flightSchedules, storageData }) {

    const dest = { ...flightSchedules }
    // console.log(departureTime, arrivalTime)
    const [min, setMin] = useState(0)
    const [max, setMax] = useState(100)

    return (
        <>
            <div className="sort-title">Sort &amp; Filter</div>
            <div className="list-group list-group-flush sort-form" >
                <div className="list-group-item list-group-item-action bg-light">
                    <h5 className="text-center">Price</h5>
                    {/* PRICE */}
                    <form className="form-control border-0">
                        <div>
                            <CustomRangeSlider type="currency" minValue={min} maxValue={max} trailingStr="$" />
                        </div>
                    </form>
                </div>

                {/* STOPS */}
                <div className="list-group-item list-group-item-action bg-light">
                    <h5 className="text-center">Stops</h5>

                    <form className="form-control border-0">
                        <div className="checkbox">
                            <label><input type="checkbox" name="stops" value="1" /> &nbsp;1 Stop</label>
                        </div>
                        <div className="checkbox">
                            <label><input type="checkbox" name="stops" value="2" />&nbsp;2+ Stops</label>
                        </div>
                    </form>
                </div>


                {/* AIRLINE */}
                <div className="list-group-item list-group-item-action bg-light">
                    <h5 className="text-center">Airlines</h5>
                    <form className="form-control border-0">
                        <label><input type="checkbox" name="selectedAirlines" value="airline" />&nbsp;airline</label>
                    </form>
                </div>

                {/* DEPARTURE TIME */}
                <div className="list-group-item list-group-item-action bg-light">
                    <h5 className="text-center">Flight Times</h5>
                    <div className="list-group-item list-group-item-action bg-light border-0">
                        <form className="form-control border-0">
                            <label>Depart from JFK </label>
                            <CustomRangeSlider minValue="360" maxValue="1439" type="time" />
                        </form>
                    </div>
                    <div className="list-group-item list-group-item-action bg-light border-0">
                        {/* ARRIVAL TIME */}
                        <form className="form-control border-0" >
                            <label>Arrival at Miami  </label>
                            <CustomRangeSlider minValue="0" maxValue="359" type="time" />
                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}
