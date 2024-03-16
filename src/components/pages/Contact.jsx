import React from "react";
import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", params.id);
      const docSnapShot = await getDoc(docRef);

      if (docSnapShot.exists()) {
        setLandlord(docSnapShot.data());
      } else {
        toast.error("Could not get landlord information. Please try again!");
      }
    };

    getLandlord();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader"> Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>

          <form className="messageForm" onSubmit={handleSubmit}>
            <div className="messageDiv">
              <label htmlFor="message" className="label">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                placeholder="Hello! I am interested..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ height: "200px" }}
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject${searchParams.get(
                "listingName"
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  );
};

export default Contact;
