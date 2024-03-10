import React from "react";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../../assets/svg/homeIcon.svg";

const Profile = () => {
  const auth = getAuth();
  const [formInfo, setFormInfo] = useState({
    userName: auth.currentUser.displayName,
    userEmail: auth.currentUser.email,
  });
  const [changeDetails, setChangeDetails] = useState(false);

  const navigate = useNavigate();

  const handleLogout = (e) => {
    auth.signOut();
    navigate("/login");
  };

  const onSubmit = async (e) => {
    try {
      if (auth.currentUser.displayName !== formInfo.userName) {
        //If there actually was a change to the user name, then update in Firebase
        await updateProfile(auth.currentUser, {
          displayName: formInfo.userName,
        });

        //update user details in Firestore
        const reference = doc(db, "users", auth.currentUser.uid);
        await updateDoc(reference, {
          name: formInfo.userName,
        });
      }
    } catch (error) {
      toast.error("Could not update profile, please try again!");
    }
  };

  const handleUpdate = (e) => {
    if (changeDetails) {
      onSubmit();
    }
    setChangeDetails((prevState) => !prevState);
  };

  const handleChange = (e) => {
    setFormInfo((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="profile">
        <header className="profileHeader">
          <p className="pageHeader">My Profile</p>
          <button type="button" className="logOut" onClick={handleLogout}>
            Logout
          </button>
        </header>

        <main>
          <div className="profileDetailsHeader">
            <p className="profileDetailsText">User Details</p>
            <p className="changePersonalDetails" onClick={handleUpdate}>
              {changeDetails ? "confirm" : "update"}
            </p>
          </div>

          <div className="profileCard">
            <form>
              <input
                type="text"
                id="userName"
                className={!changeDetails ? "profileName" : "profileNameActive"}
                disabled={!changeDetails}
                value={formInfo.userName}
                onChange={handleChange}
              />
              <input
                type="text"
                id="userEmail"
                className={
                  !changeDetails ? "profileEmail" : "profileEmailActive"
                }
                disabled={!changeDetails}
                value={formInfo.userEmail}
                onChange={handleChange}
              />
            </form>
          </div>
        </main>

        <Link to="/create" className="createListing">
          <img src={homeIcon} alt="Home" />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="Continue" />
        </Link>
      </div>
    </>
  );
};

export default Profile;
