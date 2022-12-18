import React, { Fragment, useRef, useState, useEffect } from "react";
import "./Signup.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const LoginSignup = ({ location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("/images/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/images/Profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  const redirect = location?.search ? location?.search.split("=")[1] : "/account";
  let history = useNavigate();

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="outerloginsignupdiv">
              <div className="LoginSignUpContainer">
                <div className="signup_right ">
                  <img
                    className="signup_image"
                    src="images/login_image.svg"
                    alt="signup_image"
                  />
                </div>
                <div className="LoginSignUpBox">
                  <div>
                    <div
                      className="login_signUp_toggle"
                      style={{ display: "flex" }}
                    >
                      <h2
                        onClick={(e) => switchTabs(e, "login")}
                        style={{ fontSize: "250%" }}
                      >
                        Login
                      </h2>
                      <h2
                        onClick={(e) => switchTabs(e, "register")}
                        style={{ fontSize: "250%" }}
                      >
                        Sign Up
                      </h2>
                    </div>
                    <button ref={switcherTab}></button>
                  </div>
                  <div>
                    <form
                      className="loginForm"
                      ref={loginTab}
                      onSubmit={loginSubmit}
                    >
                      <input
                        className="signup_input"
                        type="email"
                        name="email"
                        value={loginEmail}
                        placeholder="Email"
                        onChange={(e) => setLoginEmail(e.target.value)}
                        required
                      />
                      <input
                        className="signup_input"
                        type="password"
                        name="password"
                        value={loginPassword}
                        placeholder="Password"
                        onChange={(e) => setLoginPassword(e.target.value)}
                        required
                      />
                      <Link to="/password/forget">Forget Password ?</Link>
                      <input type="submit" value="Login" className="loginBtn" />
                    </form>
                    <form
                      className="signUpForm"
                      ref={registerTab}
                      onSubmit={registerSubmit}
                    >
                      <input
                        className="signup_input"
                        type="text"
                        name="name"
                        value={name}
                        placeholder="Name"
                        required
                        onChange={registerDataChange}
                      />
                      {/* <input
                    className="signup_input"
                    type="text"
                    name="userid"
                    id="signup"
                    value={userid}
                    placeholder="User Id"
                    onChange={registerDataChange}
                    required
                  /> */}
                      <input
                        className="signup_input"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        onChange={registerDataChange}
                        required
                      />
                      <input
                        className="signup_input"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={registerDataChange}
                        required
                      />
                      <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={registerDataChange}
                        />
                      </div>
                      <input
                        type="submit"
                        value="Register"
                        className="signUpBtn"
                      />
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

export default LoginSignup;

