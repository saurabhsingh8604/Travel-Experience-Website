import React, { Fragment, useRef, useState, useEffect } from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, loadUser, login, register, updatePassword, updateProfile } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "../../contants/userConstants"

const UpdateProfile = ({ location }) => {
const dispatch = useDispatch();
const alert = useAlert();
const { user } = useSelector((state) => state.user);
const { error, isUpdated, loading } = useSelector((state) => state.profile);
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [avatar, setAvatar] = useState();
const [avatarPreview, setAvatarPreview] = useState("/profile.png");
const updateProfileSubmit = (e) => {
  e.preventDefault();

  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("email", email);
  myForm.set("avatar", avatar);
  dispatch(updateProfile(myForm));
};
const updateProfileDataChange = (e) => {
  const reader = new FileReader();

  reader.onload = () => {
    if (reader.readyState === 2) {
      setAvatarPreview(reader.result);
      setAvatar(reader.result);
    }
  };

  reader.readAsDataURL(e.target.files[0]);
};

const history = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user?.avatar?.url);
    }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Profile Updated Successfully");
      dispatch(loadUser());

      history("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, history, user, isUpdated]);

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
                onSubmit={updateProfileSubmit}
              >
                <input
                  className="updateProfileinput"
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  required
                  onChange={(e) => setName(e.target.value)}
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
                  className="updateProfileinput"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {/* <input
                  className="signup_input"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={registerDataChange}
                  required
                /> */}
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
                  />
                </div>
                <input
                  type="submit"
                  value="Update"
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

export default UpdateProfile;
