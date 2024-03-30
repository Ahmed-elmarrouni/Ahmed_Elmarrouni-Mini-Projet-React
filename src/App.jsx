import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/HomePg';
import Login from './Components/Inscription/Login';
import Signup from './Components/Inscription/Signup';
import Purchases from './Components/Cart/Purchases';
import Dashboard from './Components/Admin/Dashboard';
import Costomers from './Components/Admin/Costomers';
import NewCostom from './Components/Admin/NewCostom';
import MyProd from './Components/Admin/MyProd';
import AddProd from './Components/Admin/AddProd';
import Chart from './Components/Admin/Chart';
import Orders from './Components/Admin/Orders';
import OrdersPg from './Components/Cart/OrdersPg';
import ProdDetails from './Components/Home/ProdDetails';
import CheckoutPg from './Components/Checkout/CheckoutPg';
import MainPg from './Components/Admin/MainPg';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // Inscription
  {
    path: "Login",
    element: <Login />,
  },
  {
    path: "Signup",
    element: <Signup />,
  },
  // Cart
  {
    path: "Purchases",
    element: <Purchases />,
  }, {
    path: "OrdersPg",
    element: <OrdersPg />
  },
  {
    path: "ProdDetails/:id",
    element: <ProdDetails />
  },
  {
    path: "CheckoutPg/:id",
    element: <CheckoutPg />
  },
  // DASHBOARD PAGE
  {
    path: "Dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "MainPg",
        element: <MainPg />
      },
      {
        path: "Costomers",
        element: <Costomers />,
      },
      {
        path: "NewCostom",
        element: <NewCostom />,
      },
      {
        path: "MyProd",
        element: <MyProd />,
      },
      {
        path: "AddProd",
        element: <AddProd />,
      },
      {
        path: "Chart",
        element: <Chart />,
      },
      {
        path: "Orders",
        element: <Orders />
      }
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
