export async function getCategories(){
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/me/categories`, {method: 'GET', headers:{Authorization: `Bearer ${token}`}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    return data.categories
}

export async function createCategory(name, kind, group){
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/me/categories`,
        {method: 'POST', headers:{Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}, body: JSON.stringify({name, kind, group})})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    return data.created
}

export async function deleteCategory(categoryId){
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/me/categories/${categoryId}`, {method: 'DELETE', headers:{Authorization: `Bearer ${token}`}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    console.log(data.message)
}