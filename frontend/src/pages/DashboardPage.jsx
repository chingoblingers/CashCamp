import { getDashboardSummary } from "../api/summaryApi.js"
import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext.jsx"
import { createAccount, getAccounts, deleteAccount } from "../api/accountsApi.js"
import { getCategories } from '../api/categoriesApi.js'
import { createTransaction, deleteTransaction } from "../api/transactionsApi.js"
import { createCategory, deleteCategory } from "../api/categoriesApi.js"

export default function DashboardPage(){
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [dashboardData, setDashboardData] = useState(null)
    const {logout} = useAuth()
    const [accounts, setAccounts] = useState([])
    const [accountName, setAccountName] = useState("")
    const [accountType, setAccountType] = useState("")
    const [startingBalance, setStartingBalance] = useState(0)
    const [categories, setCategories] = useState([])
    const [accountId, setAccountId] = useState("")
    const [categoryId, setCategoryId] = useState("")
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState("")
    const [categoryName, setCategoryName] = useState("")
    const [categoryKind, setCategoryKind] = useState('expense')
    const [categoryGroup, setCategoryGroup] = useState('')


    useEffect(()=>{
        async function loadDashboardData(){
            try{
            const dashboardInfo = await getDashboardSummary()
            setDashboardData(dashboardInfo)
            const acc = await getAccounts()
            setAccounts(acc)
            const cat = await getCategories()
            setCategories(cat)
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
            if (error.message === "Unauthorized") {
            logout()
            return
            }
            console.error(error)
            setError(error.message)
    }
}

async function handleDeleteAccount(accountId){
    try{
        await deleteAccount(accountId)
        setAccounts(prevAccount => {
          return prevAccount.filter(account=> account.id !== accountId)
        })
    }catch(error){
    if (error.message === "Unauthorized") {
    logout()
    return
    }
    console.error(error)
    setError(error.message)
    }
}

async function handleCreateTransaction(e){
    try{
        e.preventDefault()
        if (!accountId || !categoryId || !amount) {
        setError("Please complete the required transaction fields.")
        return
        }
        const newTransaction = await createTransaction(accountId, categoryId, amount, description)
        if(!newTransaction){
            setError("Unable to create transaction")
            return
        }
        const updatedDashboard = await getDashboardSummary()
        setDashboardData(updatedDashboard)
        setAmount(0)
        setDescription('')
        setAccountId('')
        setCategoryId('')
        
    }catch(error){
    if (error.message === "Unauthorized") {
    logout()
    return
    }
    console.error(error)
    setError(error.message)
    }
}

async function handleCreateCategory(e){
    try{
        e.preventDefault()
        const newCategory = await createCategory(categoryName, categoryKind, categoryGroup)
        if(!newCategory){
            setError('Unable to create category')
            return
        }
        setCategories(prevCategory=> [...prevCategory, newCategory])
        setCategoryGroup('')
        setCategoryKind('expense')
        setCategoryName('')
    }catch(error){
    if (error.message === "Unauthorized") {
    logout()
    return
    }
    console.error(error)
    setError(error.message)
    }

}

async function handleDeleteCategory(categoryId){
    try{
        await deleteCategory(categoryId)
        setCategories(prevCat => prevCat.filter(cat => {
            return cat.id !== categoryId
        }))
    }catch(error){
    if (error.message === "Unauthorized") {
    logout()
    return
    }
    console.error(error)
    setError(error.message) 
    }
}

async function handleDeleteTransaction(accountId, transactionId){
    try {
        await deleteTransaction(accountId, transactionId)
        const updatedDashboard = await getDashboardSummary()
        setDashboardData(updatedDashboard)
    } catch (error) {
    if (error.message === "Unauthorized") {
    logout()
    return
    }
    console.error(error)
    setError(error.message) 
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
                        <div className="summaryCard">
                            <p className="cardLabel"> Total Income:</p>
                            <p className="cardValue">{dashboardData.summary.total_income}$</p>
                        </div>
                        <div className="summaryCard">
                            <p className="cardLabel"> Total Expenses:</p>
                            <p className="cardValue">{dashboardData.summary.total_expenses}$</p>   
                        </div>
                        <div className="summaryCard">
                            <p className="cardLabel"> Current Balance:</p>
                            <p className="cardValue">{dashboardData.summary.current_balance}$</p>
                        </div>
                    </section>
                    <div className="dashboardGrid">
                        <section className="accountsContainer dashboardContainer">
                            {accounts.length === 0 ? (<p>No accounts found</p>): (accounts.map(account =>{
                                return  <div key={account.id} className="subCard">
                                            <p>{account.account_name}</p>
                                            <p>{account.account_type}</p>
                                            <p>Current Balance: {account.starting_balance}$</p>
                                            <button onClick={()=>handleDeleteAccount(account.id)}>Delete Account</button>
                                        </div>
                            }))}
                        </section>    
                        <section className="transactionContainer">
                            {dashboardData.recent_transactions.length === 0 ? (<p>No recent transactions</p>): (
                                <div>
                                    {dashboardData.recent_transactions.map(transaction =>{
                                    return <div key={transaction.transaction_id}>
                                                <p>{transaction.description|| 'No description'} - {transaction.amount}</p>
                                                <button onClick={()=>handleDeleteTransaction(transaction.account_id, transaction.transaction_id)}> Delete Transaction </button>
                                            </div>
                                    })}
                                </div>
                            ) }
                        </section>
                    </div>
                    <section className="formContainer">
                        <form className="createAccountsForm" onSubmit={handleCreateAccount}>
                            <label htmlFor="accountName">Account Name:</label>
                            <input type="text" id="accountName" placeholder="Ken's Card Game Account" name="account_name" value={accountName} onChange={(e)=>setAccountName(e.target.value)} required/>
                            <label htmlFor="accountType">Account Type:</label>
                            <input type="text" id="accountType" placeholder="Checking" name="account_type" value={accountType} onChange={(e)=>setAccountType(e.target.value)} required/>
                            <label htmlFor="startingBalance">Starting Balance:</label>
                            <input type="number" id="startingBalance" name="starting_balance" value={startingBalance} onChange={(e)=>setStartingBalance(Number(e.target.value))} required/>
                            <button type="submit">Create Account</button>
                        </form>
                        <form className="categoryForm" onSubmit={handleCreateCategory}>
                            <label htmlFor="catName">Category Name:</label>
                            <input type="text" id="catName" placeholder="Fast Food.." name="catName" value={categoryName} onChange={(e)=>setCategoryName(e.target.value)} required/>
                            <label htmlFor="catGroup">Category Group:</label>
                            <input type="text" id="catGroup" placeholder="Expenses.." name="catGroup" value={categoryGroup} onChange={(e)=>setCategoryGroup(e.target.value)} required/>
                            <select value={categoryKind} onChange={(e)=>setCategoryKind(e.target.value)}>
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                            <button type="submit">Create Category</button>  
                        </form>
                        <form className="transactionForm" onSubmit={handleCreateTransaction}>
                            <select value={accountId} onChange={(e)=>setAccountId(e.target.value)} required>
                                <option value=""> Choose Account </option>
                                {accounts.map(account => {
                                    return <option key={account.id} value={account.id}>{account.account_name}</option>
                                })}
                            </select>
                            <select value={categoryId} onChange={(e)=>setCategoryId(e.target.value)}required>
                                <option value="">Choose Category</option>
                                {categories.map(category =>{
                                    return <option key={category.id} value={category.id}>{category.name}</option>
                                })}
                            </select>
                            <label htmlFor="transactionAmount">Transaction Amount:</label>
                            <input type="number" id="transactionAmount" name="transaction_amount" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} required/>
                            <label htmlFor="description">Description:</label>
                            <input type="text" id="description" placeholder="Purchase from Kroger" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
                            <button type="submit"> Add Transaction </button>
                    </form>
                    </section>
                    <section className="categoriesList">
                            {categories.map(category => <div key={category.id}> <p>{category.name}</p> <button onClick={()=>handleDeleteCategory(category.id)}>Delete Category</button> </div>)}   
                    </section>
                </main>
                </>
            )}        
        </>

    )
}