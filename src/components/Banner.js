import React from 'react'

export default function Banner({ bannerStyle, children }) {
    return (
        <div className="row banner-row">
            <div className={`${bannerStyle} col`}>
                {children}
            </div>
        </div>

    )
}
Banner.defaultProps = { banner: "defaultBanner" }