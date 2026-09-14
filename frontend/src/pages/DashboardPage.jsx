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
            <h1> Dashboard Page </h1>
            {loading && <p>Loading dashboard...</p>}
            {error && <p>{error}</p>}
            {dashboardData && <pre>{JSON.stringify(dashboardData, null, 2)}</pre>}        
        </>

    )
}