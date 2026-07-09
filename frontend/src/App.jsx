import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'

const routesArr = [
  {path: "/", element: <LoginPage/>},
  {path: "/login", element:<LoginPage/>},
  {path: "/signup", element: <SignupPage/>},
  {path: "/dashboard", element: <DashboardPage/>}
]  
const router = createBrowserRouter(routesArr)

function App() {
  return (
  <RouterProvider router ={router} />
  )
}

export default App
