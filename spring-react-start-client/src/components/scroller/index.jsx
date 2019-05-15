import React, { PropTypes } from 'react'
import Slider from 'react-slick'

const Scroller = ({ children }) => {
    const settings = {
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 1,
        swipeToSlide: true,
        variableWidth: true
    }

    return (
        <div className="c-scroller u-text-align-center">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}

Scroller.propTypes = {
    children: PropTypes.array
}

export default Scroller
