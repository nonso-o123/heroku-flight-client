import React, { useRef } from 'react'
import Banner from '../components/Banner'
import Overlay from '../components/Overlay'
import RegisterForm from '../components/RegisterForm'


export default function SignUp() {

    const containerRef = useRef()
    return (
        <div className="container-fluid position-relative">

            <Banner bannerStyle="home-banner airline-banner">
                <iframe title="search-form" scrolling="auto" className="tp-form" frameBorder="0" src="//www.travelpayouts.com/widgets/a5e0119e48a84844dd66a80aa3027844.html?v=2210"></iframe>
            </Banner>
            <Overlay innerRef={containerRef}>
                <section className="clearfix position-absolute signup-section" ref={containerRef}>
                    <RegisterForm />
                </section>
            </Overlay>
        </div>
    )
}
