

export async function getDashboardSummary(){
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8000/me/summary`, {method: 'GET', headers:{Authorization: `Bearer ${token}`}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    const data = await response.json()
    return data
}