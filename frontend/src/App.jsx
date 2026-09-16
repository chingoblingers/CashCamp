import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'
import { useEffect } from 'react'
import plant1 from './assets/plant1.jpg'
import plant2 from './assets/plant2.jpg'
import plant3 from './assets/plant3.jpg'

useEffect(() => {
     [plant1, plant2, plant3].forEach(src => {
        const img = new Image()
        img.src = src
    })
}, [])

const routesArr = [
  {path: "/", element: <HomePage/>},
  {path: "/login", element:<LoginPage/>},
  {path: "/signup", element: <SignupPage/>},
  {element: <ProtectedRoute/>, children: [{path: "/dashboard", element: <DashboardPage/>}]}
]  
const router = createBrowserRouter(routesArr)

function App() {
  return (
  <RouterProvider router ={router} />
  )
}

export default App
