```js
// JS import
import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

// SCSS import
@import 'node_modules/progressive-web-sdk/dist/components/skeleton-block/base';
```


## Why use Skeleton components?
Skeleton components are used to mimic content that may take a while to appear. The most common case of this is any content
that is loaded over the network via a parser. In these cases, the page will render faster than the actual content can display
and it's important to tell the user that content is on it's way. Skeleton components should not be used in cases where the
content their mimicking will be ready on page render or in a very short time period afterwards. Only content that can take an
indeterminate amount of time should leverage a skeleton implementation.

## SDK Uses
Currently, the SkeletonBlock is being utilized by the following SDK components: _[Image](#!/Image)_

## Potential SDK Use Cases
Places where this skeleton component may be useful, but hasn't been implemented yet:
_[Breadcrumbs](#!/Breadcrumbs)_, _[ListTile](#!/ListTile)_, _[Rating](#!/Rating)_

## Example Usage

*Defaults with custom height*

    <SkeletonBlock height="100px" />

*Custom height & width*

    <SkeletonBlock width="50%" height="50px" />

*Custom height, width & styling*

    <SkeletonBlock style={{borderRadius: '100%'}} width="100px" height="100px" />

*Custom element type*

    <SkeletonBlock type="img" width="75px" height="75px" />
