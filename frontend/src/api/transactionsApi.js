const apiBaseUrl = import.meta.env.VITE_API_URL

export async function createTransaction(accountId, categoryId, amount, description){
    const token = localStorage.getItem("token")
    const response = await fetch(`${apiBaseUrl}/me/accounts/${accountId}/transactions`, 
        {method: 'POST', headers:{Authorization: `Bearer ${token}`, "Content-Type": "application/json"}, body: JSON.stringify({categoryId,amount,description})})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    return data.transaction
}

export async function deleteTransaction(accountId, transactionId){
    const token = localStorage.getItem("token")
    const response = await fetch(`${apiBaseUrl}/me/accounts/${accountId}/transactions/${transactionId}`, {method: 'DELETE', headers:{Authorization: `Bearer ${token}`}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    console.log(data.deleted)
}