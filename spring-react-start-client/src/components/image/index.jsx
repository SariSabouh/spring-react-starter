import React, {PropTypes} from 'react'
import classNames from 'classnames'

import SkeletonBlock from '../skeleton-block'

/**
 * An image component with placeholder functionality baked-in.
 * You can review the documentation for the [placeholder component here](#!/SkeletonBlock).
 * Note: The Image must have an explicit height for placeholder to appear.
 */
class Image extends React.Component {
    constructor() {
        super()

        this.state = {
            loaded: false,
            transitioningImageProps: null
        }

        this.imageLoaded = this.imageLoaded.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.src !== nextProps.src) {
            const {alt, height, src, width} = this.props
            const tagClasses = classNames('c-image__tag', 'c--is-transitioning')
            const imageProps = {
                src,
                className: tagClasses,
                alt,
                height,
                width
            }
            this.setState({loaded: false, transitioningImageProps: imageProps})
        }
    }

    componentWillUnmount() {
        // Clear the loading timeout so we don't call setState on an unmounted component
        if (this.timeout) {
            window.clearTimeout(this.timeout)
        }
    }

    imageLoaded() {
        this.timeout = setTimeout(() => {
            this.setState({loaded: true, transitioningImageProps: null}, this.props.onImageLoaded)
        }, this.props.artificialLoadingDelay || 0)
    }

    render() {
        const {
            alt,
            className,
            height,
            hidePlaceholder,
            loadingIndicator,
            placeholderStyle,
            src,
            width,
            useLoaderDuringTransitions,
            itemProp
        } = this.props

        const classes = classNames('c-image', {
            'c--is-loaded': this.state.loaded
        }, className)

        const skeletonStyle = {
            ...placeholderStyle,
            height,
            width
        }

        const imageProps = {
            src,
            className: 'c-image__tag',
            alt,
            height,
            width,
            itemProp
        }

        const loaderNode = (
            <span>
                {loadingIndicator}
                {!hidePlaceholder &&
                    <SkeletonBlock
                        type="div"
                        className="c--image"
                        style={skeletonStyle}
                    />
                }
            </span>
        )

        // alt is in imageProps
        /* eslint-disable jsx-a11y/img-has-alt */
        const image = this.state.loaded ? (
            <img {...imageProps} />
        ) : (
            <span>
                {useLoaderDuringTransitions || this.state.transitioningImageProps === null ?
                    loaderNode
                :
                    // Image src is changing but we will continue displaying the previous image
                    // until the new one is finished loading, to allow for instant swap
                    <img {...this.state.transitioningImageProps} />
                }
                <img {...imageProps} onLoad={this.imageLoaded} style={{display: 'none'}} />
            </span>
        )

        /* eslint-enable jsx-a11y/img-has-alt */

        return (
            <div className={classes}>
                {image}
            </div>
        )
    }
}

Image.defaultProps = {
    alt: '',
    src: '',
    placeholderStyle: {},
    onImageLoaded: () => {},
    useLoaderDuringTransitions: true
}

Image.propTypes = {
    /**
     * This attribute defines the alternative text describing the image.
     */
    alt: PropTypes.string.isRequired,

    /**
     * This is the image URL.
     */
    src: PropTypes.string.isRequired,

    /**
     * This attribute defines an artificial delay (ms) that slows down when the image is considered loaded.
     */
    artificialLoadingDelay: PropTypes.number,

    /**
     * A CSS class name to be applied to the <img /> element.
     */
    className: PropTypes.string,

    /**
     * The intrinsic height of the image in HTML5 CSS pixels, or HTML 4 in pixels or as a percentage.
     */
    height: PropTypes.string,

    /**
    * Used to determine if the image placeholder should be shown while the image loads.
    */
    hidePlaceholder: PropTypes.bool,

    /**
     * A value for the itemprop attribute
     * used to provide microdata to a page for SEO
     * https://www.w3.org/TR/microdata/
     */
    itemProp: PropTypes.string,

    /**
    * Additional content to show with the placeholder while the image loads.
    */
    loadingIndicator: PropTypes.node,

    /**
     * An object whose key is the camelCased version of the style name, and whose value is the style's value, usually a string.
     */
    placeholderStyle: PropTypes.object,

    /**
     * Props for a Ratio component. See the [Ratio](#!/Ratio) component for more details.
     * Example: `{aspect: '4:3'}`
     */
    ratio: PropTypes.object,

    /**
     * Indicates whether to display the loaderNode or the old image when src is changed (while the new image loads)
     */
    useLoaderDuringTransitions: PropTypes.bool,

    /**
     * The intrinsic width of the image in HTML5 CSS pixels, or HTML 4 in pixels or as a percentage.
     */
    width: PropTypes.string,

    /**
     * A callback that gets called when the image is loaded and displayed.
     */
    onImageLoaded: PropTypes.func
}

export default Image
