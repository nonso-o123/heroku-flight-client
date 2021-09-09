import React, { useRef } from 'react'
import Banner from '../components/Banner'
import { useParams } from 'react-router-dom'
import Overlay from '../components/Overlay'
import RegisterForm from '../components/RegisterForm'


export default function FeaturedDestination({ cities, modalOpen, setModalOpen }) {
    const { slug } = useParams()
    const city = { ...cities.find(x => x.name === slug) }
    const { extras } = city
    const containerRef = useRef()

    return (
        <div className="container-fluid">
            <Banner bannerStyle="home-banner dest-banner">
                <iframe title="search-form" scrolling="no" className="tp-form" frameBorder="0" src="//www.travelpayouts.com/widgets/a5e0119e48a84844dd66a80aa3027844.html?v=2210"></iframe>
            </Banner>
            {modalOpen && <Overlay innerRef={containerRef} modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <section className="clearfix position-absolute signup-section" ref={containerRef}>
                    <RegisterForm />
                </section>
            </Overlay>}
            <div className="container featured-city">

                <div className="row city-row">
                    <div className="col-12 col-lg-4 boxes img-row">
                        <img src={city.img} alt={city.name} />
                    </div>
                    <div className="col-12 col-lg-7 boxes">
                        <h3>{city.name}</h3>
                        <p>{city.description}</p>
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="row featured-facts boxes" >
                    <h4>Here are some interesting facts about {city.name}</h4>
                    <article className="desc">
                        <ul>
                            {extras && extras.map((listItem, index) => {
                                return <li key={index}>{listItem}</li>
                            })}
                        </ul>
                    </article>
                </div>

            </div>
        </div>

    )
}

