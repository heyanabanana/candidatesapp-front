import {ENDPOINT} from './endpoint'

export default function registerService({name, email, password, password_confirmation}) {
    return fetch(`${ENDPOINT}/register`, {
        method: 'POST',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({name, email, password, password_confirmation})
    })
    .then(res => {
        if(!res.ok) throw new Error('Response is NOT ok')
        return res.json()
    })
    .then(res => {
        const {name} = res
        return name
    })
}
