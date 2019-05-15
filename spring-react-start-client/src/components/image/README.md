```js
// JS import
import Image from 'progressive-web-sdk/dist/components/image'

// SCSS import
@import 'node_modules/progressive-web-sdk/dist/components/image/base';
```


## Example Usage

    <Image src="http://internetretailing.net/files/2015/11/logo_mobify-print_full-color-1.jpg" width="300px" height="93px" alt="Mobify Logo" />

## Example With Loading Indicator

    <Image src="http://www.example.com/does-not-exist.jpg" width="441px" height="291px" alt="Mobify Logo" hidePlaceholder={true} loadingIndicator={<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>} />

## Example With `ratio`

    <Image src="https://unsplash.it/800/600" alt="" ratio={{aspect: "4:3"}} />

## Example With `useLoaderDuringTransitions`
    initialState = {
        src: "https://unsplash.it/400/300",
        useLoaderDuringTransitions: true
    }
    var transitionImage = function() {
        if (/300/.test(state.src)) {
            setState({src: "https://unsplash.it/400/200"})
        } else {
            setState({src: "https://unsplash.it/400/300"})
        }
    }
    var changeUseLoaderDuringTransitions = function() {
        setState({useLoaderDuringTransitions: !state.useLoaderDuringTransitions})
    }
    <span>
        <Image src={state.src} useLoaderDuringTransitions={state.useLoaderDuringTransitions} artificialLoadingDelay={1000} loadingIndicator={<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>} />
        <button onClick={changeUseLoaderDuringTransitions}>{"useLoaderDuringTransitions=" + state.useLoaderDuringTransitions}</button>
        <button onClick={transitionImage}>Change image src (simulates image load delay of 1000ms)</button>
    </span>
