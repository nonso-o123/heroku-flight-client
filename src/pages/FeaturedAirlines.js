import React, { useRef } from 'react'
import Banner from '../components/Banner'
import { useParams } from 'react-router-dom'
import Overlay from '../components/Overlay'
import RegisterForm from '../components/RegisterForm'


export default function FeaturedAirlines({ airlines, modalOpen, setModalOpen }) {
    const { slug } = useParams()
    let airline = { ...airlines.find(x => x.name === slug) }
    const { extras } = airline
    console.log(extras + " ," + airline.description)

    const containerRef = useRef()
    return (
        <div className="container-fluid">
            <Banner bannerStyle="home-banner airline-banner">
                <iframe title="search-form" scrolling="auto" className="tp-form" frameBorder="0" src="//www.travelpayouts.com/widgets/a5e0119e48a84844dd66a80aa3027844.html?v=2210"></iframe>
            </Banner>
            {modalOpen && <Overlay innerRef={containerRef} modalOpen={modalOpen} setModalOpen={setModalOpen}>
                <section className="clearfix position-absolute signup-section" ref={containerRef}>
                    <RegisterForm />
                </section>
            </Overlay>}

            <div className="container featured-city">

                <div className="row city-row">
                    <div className="col-12 col-lg-4 boxes img-row">
                        <img src={airline.img} alt={airline.name} />
                    </div>
                    <div className="col-12 col-lg-7 boxes">
                        <h3>{airline.name} Airline</h3>
                        <p>{airline.description}</p>
                    </div>
                    <div className="clearfix" />
                </div>
                <div className="row featured-facts boxes" >
                    <h4>Here are some interesting facts about {airline.name}</h4>
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

