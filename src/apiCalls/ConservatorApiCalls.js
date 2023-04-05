import {getCurrentUser} from "../helpers/authHelper";

const conservatorsBaseUrl='http://localhost:3000/api/conservators'

export function getConservatorsApiCall() {
    const promise=fetch(conservatorsBaseUrl);
    return promise;
}

export function getConservatorByIdApiCall(consId){
    const url = `${conservatorsBaseUrl}/${consId}`;
    const promise = fetch(url);
    return promise;
}

export function addConsApiCall(cons) {
    const consString = JSON.stringify(cons)
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: consString
    }
    const url = `${conservatorsBaseUrl}/add`
    const promise = fetch(url, options);
    return promise;
}

export function updateConsApiCall(consId, cons) {
    const url = `${conservatorsBaseUrl}/${consId}`
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
export function deleteConsApiCall(consId){
    const user=getCurrentUser();
    const url = `${conservatorsBaseUrl}/delete/${consId}`
    let token
    if (user && user.token) {
        token = user.token
    }
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
    }
    const promise = fetch(url,options);
    return promise;
}