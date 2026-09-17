const apiBaseUrl = import.meta.env.VITE_API_URL


export async function getAccounts(){
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBaseUrl}/me/accounts`, {method: 'GET', headers:{Authorization: `Bearer ${token}`}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    return data.account

}

export async function createAccount(account_name, account_type, starting_balance){
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBaseUrl}/me/accounts`, 
        {method: 'POST', headers:{Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}, body: JSON.stringify({
            account_name, account_type, starting_balance
            })})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    return data.account
}

export async function deleteAccount(account_id){
    const token = localStorage.getItem('token')
    const response = await fetch(`${apiBaseUrl}/me/accounts/${account_id}`,{method: 'DELETE', headers:{Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}})
    if (response.status === 401){
        throw new Error('Unauthorized')
    }
    if (!response.ok){
        throw new Error('Unable to complete request.')
    }
    const data = await response.json()
    console.log(data.message)
}