import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { contactUsMessage } from '../../redux/actionCreators/ContactUsActionCreator'



function ContactUsForm() {

    const [email, setEmail] = useState('')
    const [c_message, setC_Message] = useState('')

    const dispatch = useDispatch()
    const contactMessage = useSelector(state => state.contactMessage)

    const err = ({ cMessage }) => { return cMessage && cMessage.error }
    const e_text = useRef(null)
    const m_text = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(contactUsMessage(email, c_message))
        e_text.current.value = ''
        m_text.current.value = ''
    }


    return (
        <div className="card mx-xl-5 boxes">
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <li className="list-unstyled text-center mb-3" style={{ color: "red" }}>{err({ cMessage: contactMessage }) && (<div>{err({ cMessage: contactMessage })}</div>)}</li>
                    <div className="signup-div">
                        <label htmlFor="email" className="grey-text font-weight-light">Your email</label>
                        <input ref={e_text} type="email" id="email" className="form-control signup-input" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="signup-div">
                        <label htmlFor="message" className="grey-text font-weight-light">Your Message</label>
                        <textarea ref={m_text} type="text" id="messsage" className="form-control signup-input" onChange={(e) => setC_Message(e.target.value)} />
                    </div>
                    <div className="text-center py-4 mt-3">
                        <button className="btn btn-outline-purple" type="submit">Send Message<i
                            className="fa fa-paper-plane-o ml-2"></i></button>
                    </div>
                </form>
            </div>

        </div>

    )
}
export default withRouter(ContactUsForm)