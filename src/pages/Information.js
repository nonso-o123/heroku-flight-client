import React, { useRef } from 'react'
import Banner from '../components/Banner'
import ContactUsForm from '../components/ContactUs/ContactUsForm'
import Overlay from '../components/Overlay'
import RegisterForm from '../components/RegisterForm'

export default function Information({ modalOpen, setModalOpen, userInfo, userReg }) {
    const containerRef = useRef()
    return (
        <div className="container-fluid">
            <Banner bannerStyle="home-banner">
                <iframe title="search-form" scrolling="auto" className="tp-form" frameBorder="0" src="//www.travelpayouts.com/widgets/a5e0119e48a84844dd66a80aa3027844.html?v=2210"></iframe>
            </Banner>
            {modalOpen && <Overlay innerRef={containerRef} overlayOpen={modalOpen} setOverlayOpen={setModalOpen}>
                <section className="clearfix position-absolute signup-section" ref={containerRef}>
                    <RegisterForm setModalOpen={setModalOpen} modalOpen={modalOpen} userInfo={userInfo} userReg={userReg} />
                </section>
            </Overlay>}
            <section className="offers-section section clearfix">
                <div className="info">
                    <h2 className="text-center">ABOUT US</h2>
                    <br />
                    <h3 className="text-center mb-5">IJELINKS TRAVELS AND TOUR</h3>
                    <article className="mt-5">
                        <p>We are a main online travel organization in Nigeria giving a
                            best as far as class can tell with the objective to be ‘World’s Travel Planner’.
                            Through our site, our versatile applications and our other related resources,
                            recreation and business tourists can investigate, explore,
                            analyze costs and book an extensive variety of services, taking into account their travel needs.</p>
                        <br />
                        <p>Since our origin in 2018, so many clients have utilized at least one of our exhaustive travel-related services,
                            which incorporate local and global air ticketing, lodging appointments, homestays, occasion bundles, transport ticketing,
                            rail ticketing, visa applications, documentation and processing, exercises and subordinate administrations.</p>

                        With more than 83,000 inns contracted crosswise over the world, we are topping biggest stage for residential lodgings.
                        <br />
                        <p>A solid and beloves travel brand of Nigeria, IJELINKS' qualities incorporate a vast and faithful client base,
                            a multi-channel stage for relaxation and business explorers, a powerful portable eco-framework for a range of voyagers and providers,
                            a solid innovation stage intended to convey an abnormal state of adaptability and advancement and a prepared senior supervisory
                            crew including industry officials with profound roots in the movement business in Nigeria and abroad.</p>
                    </article>

                </div>
            </section>
            <section className="offers-section section clearfix">
                <div className="info">
                    <h2 className="text-center">CONTACT US</h2>
                    <ContactUsForm />
                </div>
            </section>
        </div>
    )
}
