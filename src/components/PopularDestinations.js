import React from 'react'
import { Link } from 'react-router-dom';

import Slider from './Slider';

export default function PopularDestinations({ cities }) {
    const featured = cities.map((city, indx) => {
        return (
            <div className="child boxes" key={indx}>
                <Link to={`/destination/${city.name}`}>
                    <h3>{city.name}</h3>
                    <h5>{city.slug}</h5>

                    <img src={city.img} alt={city.id} className="img" />
                </Link>
            </div>
        )
    })
    return (
        <Slider>
            {featured}
        </Slider>

    )
}
