import {ENDPOINT} from './endpoint'

export default function loginService({token}) {
    return fetch(`${ENDPOINT}/candidates`, {
        method: 'GET',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Bearer ${token}`
        },
    })
    .then(res => {
        if(!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    })
    .then(res => {
        const {token} = res
        return token
    })
}
