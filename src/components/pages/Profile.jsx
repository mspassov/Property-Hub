import React from "react";
import { useState, useEffect } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  updateDoc,
  doc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import arrowRight from "../../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../../assets/svg/homeIcon.svg";
import ListingItem from "../ListingItem";

const Profile = () => {
  const auth = getAuth();
  const [formInfo, setFormInfo] = useState({
    userName: auth.currentUser.displayName,
    userEmail: auth.currentUser.email,
  });
  const [userListings, setUserListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [changeDetails, setChangeDetails] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getUserListings = async () => {
      const listingsRef = collection(db, "listings");
      const listingsQuery = query(
        listingsRef,
        where("userRef", "==", auth.currentUser.uid),
        orderBy("timestamp", "desc")
      );
      const listingsSnapshot = await getDocs(listingsQuery);

      let listingsArray = [];
      listingsSnapshot.forEach((doc) =>
        listingsArray.push({ id: doc.id, data: doc.data() })
      );
      setUserListings(listingsArray);
      setLoading(false);
    };

    getUserListings();
  }, []);

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

  const onEdit = async (id) => {
    navigate(`/edit/${id}`);
  };

  const onDelete = async (id) => {
    await deleteDoc(doc(db, "listings", id));
    const updatedListings = userListings.filter((item) => item.id !== id);
    setUserListings(updatedListings);
    toast.success("Successfully deleted listing!");
    navigate("/profile");
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

          <Link to="/create" className="createListing">
            <img src={homeIcon} alt="Home" />
            <p>Sell or rent your home</p>
            <img src={arrowRight} alt="Continue" />
          </Link>

          {!loading && userListings?.length > 0 ? (
            <>
              <p className="listingText">Your Listings</p>
              <ul className="listingsList">
                {userListings.map((item, index) => {
                  return (
                    <ListingItem
                      key={item.id}
                      id={item.id}
                      listing={item.data}
                      onDelete={() => onDelete(item.id)}
                      onEdit={() => onEdit(item.id)}
                    />
                  );
                })}
              </ul>
            </>
          ) : (
            <p>No listings created</p>
          )}
        </main>
      </div>
    </>
  );
};

export default Profile;
