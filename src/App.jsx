import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/HomePg'
import Login from './Components/Inscription/Login'
// import tailwindConfig from '../tailwind.config'
import Signup from './Components/Inscription/Signup'
import Purchases from './Components/Cart/Purchases'
import Dashboard from './Components/Admin/Dashboard'
import Costomers from './Components/Admin/Costomers'
import NewCostom from './Components/Admin/NewCostom'
import MyProd from './Components/Admin/MyProd'
import AddProd from './Components/Admin/AddProd'
import Chart from './Components/Admin/Chart'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  // Inscription
  {
    path: "Login",
    element: <Login />
  },
  {
    path: "Signup",
    element: <Signup />
  },
  // Cart
  {
    path: "Purchases",
    element: <Purchases />
  },
  // DASHNOARD PAGE
  {
    path: "Dashboard",
    element: <Dashboard />
  },
  {
    path: "Costomers",
    element: <Costomers />
  },
  {
    path: "NewCostom",
    element: <NewCostom />
  },
  {
    path: "MyProd",
    element: <MyProd />
  },
  {
    path: "AddProd",
    element: <AddProd />
  },
  {
    path: "Chart",
    element: <Chart />
  }
])

function App() {

  return (
    <>

      <RouterProvider router={router} />
    </>
  )
}

export default App
