
const artworkBaseUrl = 'http://localhost:3000/api/artworks'

export function getArtworkApiCall() {
    const promise = fetch(artworkBaseUrl)
    return promise;}

export function getArtworkByIdApiCall(artworkId) {
    const url = `${artworkBaseUrl}/${artworkId}`;
    const promise = fetch(url);
    return promise;
}
export function addArtApiCall(cons) {
    const consString = JSON.stringify(cons)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: consString
    }
    const url = `${artworkBaseUrl}/add`
    const promise = fetch(url, options);
    return promise;
}

export function updateArtApiCall(consId, cons) {
    const url = `${artworkBaseUrl}/${consId}`
    const empString = JSON.stringify(cons)
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: empString
    }
    const promise = fetch(url, options);
    return promise;
}