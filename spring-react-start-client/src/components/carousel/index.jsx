import React, { PropTypes } from 'react'
import Slider from 'react-slick'

const Carousel = ({ children }) => {
    const settings = {
        arrows: false,
        customPaging: () => <button className="c-react-slick__dot"><span /></button>,
        dots: true
    }

    return (
        <div className="c-carousel">
            <Slider {...settings}>
                {children}
            </Slider>
        </div>
    )
}

Carousel.propTypes = {
    children: PropTypes.array
}

export default Carousel
