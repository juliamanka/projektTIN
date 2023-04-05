export function getCurrentUser() {
    let userJSON
    const user = localStorage.getItem('user')
    try {
        userJSON = JSON.parse(user)
    } catch (e) {
        return undefined
    }
    return userJSON
}

export function getCurrentRole() {
    let userJSON
    const user = localStorage.getItem('role')
    try {
        userJSON = JSON.parse(user)
    } catch (e) {
        return undefined
    }
    return userJSON
}

export function isAuthenticatedAdmin() {
    const role = getCurrentRole()
    if(role===null)
        return false
    else if(role==="admin") {
        return true
    }
}

export function isAuthenticated() {
    const user=getCurrentUser();
    if(user) {
        return true
    }
        return false;
}

export function isAuthenticatedUser() {
    const role = getCurrentRole()
    if(role===null)
        return false
    else if(role==="user") {
        return true
    }

}