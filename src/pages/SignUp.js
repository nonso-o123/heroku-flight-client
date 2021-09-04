import React, { useRef } from 'react'
import Banner from '../components/Banner'
import Overlay from '../components/Overlay'
import RegisterForm from '../components/RegisterForm'


export default function SignUp() {

    const containerRef = useRef()
    return (
        <div className="container-fluid position-relative">

            <Banner bannerStyle="home-banner airline-banner">
                <iframe scrolling="auto" className="tp-form" scrolling="no" frameBorder="0" src="//www.travelpayouts.com/widgets/f57c304a26442527ab0763aaeffda12c.html?v=2055"></iframe>
            </Banner>
            <Overlay innerRef={containerRef}>
                <section className="clearfix position-absolute signup-section" ref={containerRef}>
                    <RegisterForm />
                </section>
            </Overlay>
        </div>
    )
}
