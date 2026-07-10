
function aync signupUser(name, email, password){
const res = await fetch("http://localhost:8000/auth/signup", {method: "POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({name, email, password})})
const data = res.json()
return data
}

