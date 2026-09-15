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