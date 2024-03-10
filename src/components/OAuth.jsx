import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

const OAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //Check to see if there is a user that already exists in the database
      const userReference = doc(db, "users", user.uid);
      const userSnapShot = await getDoc(userReference);

      if (!userSnapShot.exists()) {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }

      navigate("/");
    } catch (error) {
      toast.error("Could not authenticate your Google account");
    }
  };

  return (
    <div className="socialLogin">
      <p>{location.pathname == "/login" ? "Sign in" : "Sign up"} with</p>
      <button className="socialIconDiv" onClick={handleClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google" />
      </button>
    </div>
  );
};

export default OAuth;
