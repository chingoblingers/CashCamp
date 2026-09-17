const apiBaseUrl = import.meta.env.VITE_API_URL

export async function getDashboardSummary(){
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBaseUrl}/me/summary`, {method: 'GET', headers:{Authorization: `Bearer ${token}`}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    const data = await response.json()
    return data
}