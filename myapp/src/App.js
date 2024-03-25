
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Personage from "./pages/Personage";
import Bottom from "./components/Bottom";
import Card from "./components/Card";
import Top from "./components/Top";

import './App.css';


const Layout = () => {
  return (
    <div>
      <Top />
      <Outlet />
      <Bottom />
    </div>
  );
}

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
