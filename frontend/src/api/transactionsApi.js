export async function createTransaction(accountId, categoryId, amount, description){
    const token = localStorage.getItem(token)
    const response = await fetch(`http://localhost:8000/me/accounts/:accountId/transactions`, 
        {method: 'POST', headers:{Authorization: `Bearer ${token}`, "Content-Type": "application/json"}, body: JSON.stringify({accountId,categoryId,amount,description})})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    return data.transaction
}