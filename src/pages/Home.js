import React, { useRef } from 'react'
import Banner from '../components/Banner'
import PopularAirlines from '../components/PopularAirlines'
import Offers from '../components/Offers'
import PopularDestinations from '../components/PopularDestinations'
import Overlay from '../components/Overlay'
import RegisterForm from '../components/RegisterForm'

export default function Home({
    cities,
    airlines,
    modalOpen,
    setModalOpen,
    userInfo,
    userReg }) {

    const containerRef = useRef()
    return (
        <div className="container-fluid">
            <Banner bannerStyle="home-banner">
                <iframe title="search-form" scrolling="0" className="tp-form" frameBorder="0" src="//www.travelpayouts.com/widgets/a5e0119e48a84844dd66a80aa3027844.html?v=2210"></iframe>
            </Banner>
            {modalOpen && <Overlay innerRef={containerRef} overlayOpen={modalOpen} setOverlayOpen={setModalOpen}>
                <section className="clearfix position-absolute signup-section" ref={containerRef}>
                    <RegisterForm setModalOpen={setModalOpen} modalOpen={modalOpen} userInfo={userInfo} userReg={userReg} />
                </section>
            </Overlay>}
            <section className="section clearfix">
                <PopularAirlines
                    airlines={airlines} />
            </section>
            <section className="offers-section section clearfix">
                <Offers />
            </section>
            <section className="popular-cities section clearfix">
                <PopularDestinations
                    cities={cities} />
            </section>
        </div>

    )
}

