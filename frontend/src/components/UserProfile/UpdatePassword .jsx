import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  loadUser,
  login,
  register,
  updatePassword,
  updateProfile,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../contants/userConstants";

const UpdatePassword = ({ location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

 const updatePasswordSubmit = (e) => {
   e.preventDefault();

   const myForm = new FormData();

   myForm.set("oldPassword", oldPassword);
   myForm.set("newPassword", newPassword);
   myForm.set("confirmPassword", confirmPassword);

   dispatch(updatePassword(myForm));
 };
 const history = useNavigate();

   useEffect(() => {
     if (error) {
       alert.error(error);
       dispatch(clearErrors());
     }

     if (isUpdated) {
       alert.success("Profile Updated Successfully");

       history("/account");

       dispatch({
         type: UPDATE_PASSWORD_RESET,
       });
     }
   }, [dispatch, error, alert, history, isUpdated]);

  return (
    <>
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <div className="updateProfileContainer">
              <div className="updateProfileBox">
                <form
                  className="updateProfileForm"
                  //   ref={registerTab}
                  encType="multipart/form-data"
                  onSubmit={updatePasswordSubmit}
                >
                  <input
                    className="updateProfileinput"
                    type="password"
                    name="oldPassword"
                    value={oldPassword}
                    placeholder="old Password"
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <input
                    className="updateProfileinput"
                    type="password"
                    name="newPassword"
                    value={newPassword}
                    placeholder="new Password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <input
                    className="updateProfileinput"
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    placeholder="confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <input
                    type="submit"
                    value="Change"
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

export default UpdatePassword;
