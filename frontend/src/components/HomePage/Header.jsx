import React, { useEffect, useState } from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const Header = () => {

    const [toggleMenu, setToggleMenu] = useState (false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const toggleNav = () => {
      setToggleMenu(!toggleMenu);
    };

    useEffect(() => {
      const changeWidth = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", changeWidth);

      return () => {
        window.removeEventListener("resize", changeWidth);
      };
    }, []);

  return (
    <div className="header-bg">
      <div className="navbar">
        <div className="logo_div">
          <NavLink style={({ isActive }) => ({})} to="/">
            <img src="/images/logo.png" alt="logo" className="logo_img" />
          </NavLink>
        </div>
        {(toggleMenu || screenWidth > 801) && (
          <div className="menu">
            <div className="links_div">
              <ul className="navlinks">
                <li className="navlink">
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "rgb(19, 125, 170)" : "#fff",
                    })}
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="navlink">
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "rgb(19, 125, 170)" : "#fff",
                    })}
                    to="/experience"
                  >
                    Experience
                  </NavLink>
                </li>
                <li className="navlink">
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "rgb(19, 125, 170)" : "#fff",
                    })}
                    to="/videos"
                  >
                    Videos
                  </NavLink>
                </li>
                <li className="navlink">
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "rgb(19, 125, 170)" : "#fff",
                    })}
                    to="/images"
                  >
                    Images
                  </NavLink>
                </li>
                <li className="navlink">
                  <NavLink
                    style={({ isActive }) => ({
                      color: isActive ? "rgb(19, 125, 170)" : "#fff",
                    })}
                    to="/create"
                  >
                    Create
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        )}
        <div className="search_div">
          <NavLink
            style={{
              color: "#fff",
            }}
            to="/search"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </NavLink>
        </div>

        <div className="login_div">
          <i className="login_icon fa-solid fa-user"></i>
          <NavLink
            style={({ isActive }) => ({
              color: isActive ? "rgb(19, 125, 170)" : "#fff",
            })}
            to="/login"
          >
            <p>Login/Signup</p>
          </NavLink>
        </div>
        {toggleMenu && (
          <div className="extra_icons">
            <NavLink
              style={{
                color: "#fff",
              }}
              to="/search"
            >
              <i className="fa-solid fa-magnifying-glass extra_icon"></i>
            </NavLink>
            {/* <i className="fa-solid fa-magnifying-glass extra_icon"></i> */}
            {/* <i className="fa-solid fa-user extra_icon"></i> */}
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? "rgb(19, 125, 170)" : "#fff",
              })}
              to="/login"
            >
              <i className="login_icon fa-solid fa-user"></i>
            </NavLink>
          </div>
        )}
        <button onClick={toggleNav} className="btn">
          <i class="fa-solid fa-bars"></i>
        </button>
      </div>
    </div>
  );
}

export default Header