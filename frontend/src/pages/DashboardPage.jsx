import { getDashboardSummary } from "../api/summaryApi.js"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { getAccounts } from "../api/accountsApi.js"

export default function DashboardPage(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [dashboardData, setDashboardData] = useState(null)
    const {logout} = useAuth()
    const [accounts, setAccounts] = useState([])

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


                </main>
                </>
            )}        
        </>

    )
}