import { useState } from "react";
import "./layout.css";
import { Outlet, Link } from "react-router-dom";
import logo from "./images/my logo2.png"

function Layout() {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
      setIsActive((prevState)=> !prevState);
    }

    return <>
    <div className="navbar">
        <img src={logo} alt="" className="logo-img"/>
        <ul className={!isActive ? "nav-list" : "active"}>
            <li  onClick={toggle}>
                <Link to="/" className="nav-links">Home</Link>
            </li>
            <li onClick={toggle}>
                <Link className="nav-links" to="/About">About</Link>
            </li>
            <li  onClick={toggle}>
                <Link className="nav-links" to="/Projects">Projects</Link>
            </li>
            <li onClick={toggle}>
                <Link className="nav-links" to="/Contact">
                    Contact
                </Link>
            </li>
        </ul>
        <span className="menu" ><i className="fa-solid fa-bars" onClick={toggle}></i></span>
    </div>
    <Outlet/>
    </>
}    

export default Layout;