import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  login,
  register,
  updatePassword,
  updateProfile,
  resetPassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../contants/userConstants";

const ResetPassword = ({ location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let match = useMatch("/password/reset/:token");
  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(match?.params?.token, myForm));
  };

  const history = useNavigate();

 useEffect(() => {
   if (error) {
     alert.error(error);
     dispatch(clearErrors());
   }

   if (success) {
     alert.success("Password Updated Successfully");

     history("/login");
   }
 }, [dispatch, error, alert, history, success]);

  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <h2 className="resetPasswordHeading">Reset Password</h2>
                <form
                  className="updateProfileForm"
                  //   ref={registerTab}
                  onSubmit={resetPasswordSubmit}
                >
                  <input
                    className="updateProfileinput"
                    type="password"
                    placeholder="New Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <input
                    className="updateProfileinput"
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  
                  <input
                    type="submit"
                    value="Reset"
                    className="updateProfileBtn"
                  />
                </form>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    </>
  );
};

export default ResetPassword;
