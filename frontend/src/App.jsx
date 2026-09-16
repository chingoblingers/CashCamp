import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import HomePage from './pages/HomePage.jsx'

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
