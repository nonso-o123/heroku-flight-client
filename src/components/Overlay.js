import React, { useEffect } from 'react'

export default function Overlay({ children, innerRef, overlayOpen, setOverlayOpen }) {


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    })
    const handleClickOutside = e => {
        if (overlayOpen) {
            if (!innerRef.current.contains(e.target)) {
                setOverlayOpen(!overlayOpen)

            }
        }
    }
    return (
        <div className={overlayOpen ? "overlay" : "hidden"}>
            {children}
        </div>
    )
}
