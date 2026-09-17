const apiBaseUrl = import.meta.env.VITE_API_URL

export async function signupUser(name, email, password){
const res = await fetch(`${apiBaseUrl}/auth/signup`, {method: "POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({name, email, password})})
const data = res.json()
return data
}

export async function loginUser(email, password){
    const response = await fetch(`${apiBaseUrl}/auth/login`, {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({email, password})})
    const data = await response.json()
    return data
}