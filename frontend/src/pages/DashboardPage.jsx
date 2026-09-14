import { getDashboardSummary } from "../api/summaryApi.js"
import { useState, useEffect } from "react"

export default function DashboardPage(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [dashboardData, setDashboardData] = useState(null)

    useEffect(()=>{
        async function loadDashboard(){
            try{
            const dashboardInfo = await getDashboardSummary()
            setDashboardData(dashboardInfo)
            }catch(error){
                console.error(error)
                setError('Unable to load dashboard')
            }finally{
                setLoading(false)
            }
        }
        loadDashboard()
    }, [])


    return (
        <>
            {loading && <p>Loading dashboard...</p>}
            {error && <p>{error}</p>}
            {dashboardData && (
                <>
                <header>
                    <h1> Dashboard Page </h1>
                    <h3> Welcome Back! </h3>
                </header>
                <main>
                    <p> Your Total Income is: {dashboardData.summary.total_income}</p>
                    <p> Your Total Expenses are: {dashboardData.summary.total_expenses}</p>
                    <p> Your Current Balance is: {dashboardData.summary.current_balance}</p>
                </main>
                </>
            )}        
        </>

    )
}