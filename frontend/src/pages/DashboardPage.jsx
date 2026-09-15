import { getDashboardSummary } from "../api/summaryApi.js"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { createAccount, getAccounts, deleteAccount } from "../api/accountsApi.js"

export default function DashboardPage(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [dashboardData, setDashboardData] = useState(null)
    const {logout} = useAuth()
    const [accounts, setAccounts] = useState([])
    const [accountName, setAccountName] = useState("")
    const [accountType, setAccountType] = useState("")
    const [startingBalance, setStartingBalance] = useState(0)

    useEffect(()=>{
        async function loadDashboardData(){
            try{
            const dashboardInfo = await getDashboardSummary()
            setDashboardData(dashboardInfo)
            const acc = await getAccounts()
            setAccounts(acc)
            }catch(error){
                if (error.message === 'Unauthorized'){
                    logout()
                    return
                }
                console.error(error)
                setError('Unable to load dashboard')
            }finally{
                setLoading(false)
            }
        }
        loadDashboardData()
    }, [])

    async function handleCreateAccount(e) {
        try{
            e.preventDefault()
            const newAccount = await createAccount(accountName, accountType, startingBalance)
            if (!newAccount){
                setError('Account creation failed')
                return
            }
            setAccounts(prevAccount => [...prevAccount, newAccount])
            setAccountName('')
            setAccountType('')
            setStartingBalance(0)
        }catch(error){
            console.error(error)
    }
}

async function handleDeleteAccount(accountId){
    try{
        await deleteAccount(accountId)
        setAccounts(prevAccount => {
          return prevAccount.filter(account=> account.id !== accountId)
        })
    }catch(error){
        console.error(error)
    }
}


    return (
        <>
            {loading && <p>Loading dashboard...</p>}
            {error && <p>{error}</p>}
            {dashboardData && (
                <>
                <header>
                    <h1> Dashboard Page </h1>
                    <p> Welcome Back! </p>
                    <button onClick={logout}> Logout </button>
                </header>
                <main>
                    <section className="summaryContainer">
                        <p>Total Income: {dashboardData.summary.total_income}</p>
                        <p>Total Expenses: {dashboardData.summary.total_expenses}</p>
                        <p>Current Balance: {dashboardData.summary.current_balance}</p>
                    </section>
                    <section className="transactionContainer">
                        {dashboardData.recent_transactions.length === 0 ? (<p>No recent transactions</p>): (
                            <ul>
                                {dashboardData.recent_transactions.map(transaction =>{
                                  return <li key={transaction.transaction_id}>{transaction.description|| 'No description'} - {transaction.amount}</li>
                                })}
                            </ul>
                        ) }
                    </section>
                    <section className="accountsContainer">
                        {accounts.length === 0 ? (<p>No accounts found</p>): (accounts.map(account =>{
                            return  <div key={account.id}>
                                        <p>{account.account_name}</p>
                                        <p>{account.account_type}</p>
                                        <p>{account.starting_balance}</p>
                                        <button onClick={()=>handleDeleteAccount(account.id)}>Delete Account</button>
                                    </div>
                        }))}
                    </section>
                    <section className="formContainer">
                        <form className="createAccountsForm" onSubmit={handleCreateAccount}>
                            <label htmlFor="accountName">Account Name:</label>
                            <input type="text" id="accountName" placeholder="Ken's Card Game Account" name="account_name" value={accountName} onChange={(e)=>setAccountName(e.target.value)}/>
                            <label htmlFor="accountType">Account Type:</label>
                            <input type="text" id="accountType" placeholder="Checking" name="account_type" value={accountType} onChange={(e)=>setAccountType(e.target.value)}/>
                            <label htmlFor="startingBalance">Starting Balance:</label>
                            <input type="number" id="startingBalance" placeholder="100" name="starting_balance" value={startingBalance} onChange={(e)=>setStartingBalance(Number(e.target.value))}/>
                            <button type="submit">Create Account</button>
                        </form>
                    </section>
                </main>
                </>
            )}        
        </>

    )
}