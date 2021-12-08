const ENDPOINT = "https://adonis-proyect.herokuapp.com/api"

export default function loginService({email, password}) {
    return fetch(`${ENDPOINT}/login`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({email, password})
    })
    .then(res => {
        if(!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    })
    .then(res => {
        const {jwt} = res
        return jwt
    })
}
