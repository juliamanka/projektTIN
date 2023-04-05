const baseUrl = 'http://localhost:3000/api/auth'

export function loginApiCall(user) {

    const url = `${baseUrl}/login`
    let options;
    const userString = JSON.stringify(user)
    console.log(userString);
    const email = user["email"];
    const password = user["password"];
    let role;
    if(email.toLowerCase()==="admin@email.pl"){
        role="admin"
    }else{
        role="user"
    }
    const body = JSON.stringify({
        email: email,
        password: password,
        role: "user"
    })

    //     options = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: {
    //            body
    //
    //
    //     }
    // }
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                userString


    }
    const promise = fetch(url, options);
    return promise;
}