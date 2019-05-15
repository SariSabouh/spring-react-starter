const cacheHashManifest = {
    hashes: {},
    buildDate(path) {
        const date = Date.now()
        this.hashes[path.replace(/\.\.\//g, '')] = date
        return date
    }
}

export const getAssetUrl = (path) => { // eslint-disable-line import/prefer-default-export
    const hash = cacheHashManifest.hashes[path]
    const cacheBreaker = hash || cacheHashManifest.buildDate(path)
    return `${path}?${cacheBreaker}`
}
// There will be other exports usually
