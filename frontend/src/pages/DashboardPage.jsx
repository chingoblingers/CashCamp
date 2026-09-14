import { getDashboardSummary } from "../api/summaryApi.js"
import { useState } from "react"

export default function DashboardPage(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [dashboardData, setDashboardData] = useState(null)



    return (
        <h1> Dashboard Page </h1>
    )
}