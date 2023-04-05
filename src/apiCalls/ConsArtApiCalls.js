const artConsBaseUrl = 'http://localhost:3000/api/artcons'

export function getConsArtApiCall() {
    const promise = fetch(artConsBaseUrl)
    return promise;
}

export function getConsArtByIdApiCall(artConsId){
    const url = `${artConsBaseUrl}/${artConsId}`;
    const promise = fetch(url);
    return promise;
}

export function addArtConsApiCall(artCons) {
    const artConsString = JSON.stringify(artCons)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: artConsString
    }
    const promise = fetch(artConsBaseUrl, options);
    return promise;
}

export function updateArtConsApiCall(consId, cons) {
    const url = `${artConsBaseUrl}/${consId}`
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