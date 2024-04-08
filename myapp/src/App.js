
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Personage from "./pages/Personage";
import Bottom from "./components/Bottom";
import Top from "./components/Top";

import './index.scss';


const Layout = () => {
  return (
    <div>
      <Top />
      <Outlet />
      <Bottom />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },{
        path: "/personage",
        element: <Personage />,
      }
    ]
  },{
      path: "/write",
      element: <Write />
  },{
    path: "/detail/:id",
    element: <Detail />
  },{
    path: "/login",
    element: <Login />
  },{
    path: "/register",
    element: <Register />
  }

])
function App() {
  return (
    <div className="App">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
