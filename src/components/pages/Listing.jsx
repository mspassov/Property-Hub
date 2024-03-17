import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { getAuth } from "firebase/auth";
import Spinner from "../Spinner";
import shareIcon from "../../assets/svg/shareIcon.svg";
import { Map, Marker } from "pigeon-maps";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Listing = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const getListing = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        setListing(docSnapshot.data());
        setLoading(false);
      }
    };

    getListing();
  }, []);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareLinkCopied(true);
    setTimeout(() => {
      setShareLinkCopied(false);
    }, 3000);
  };

  if (loading) {
    return <Spinner />;
  }

  const regPrice = +listing.regularPrice;
  const discPrice = +listing.discountedPrice;

  return (
    <main>
      <Swiper slidesPerView={1} pagination={{ clickable: true }}>
        {listing.imageUrls.map((url, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className="swiperSlideDiv"
                style={{
                  background: `url(${listing.imageUrls[index]}) center no-repeat`,
                  backgroundSize: "cover",
                  height: "60vh",
                }}
              ></div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="shareIconDiv" onClick={handleShare}>
        <img src={shareIcon} alt="Share" />
      </div>
      {shareLinkCopied && <p className="linkCopied">Share link copied!</p>}

      <div className="listingDetails">
        <p className="listingName">
          {listing.name} - $
          {listing.offer
            ? regPrice.toLocaleString()
            : discPrice.toLocaleString()}
        </p>
        <p className="listingLocation">{listing.location}</p>
        <p className="listingType">
          {listing.type == "rent" ? "For Rent" : "For Sale"}
        </p>
        {listing.offer && (
          <p className="discountPrice">${regPrice - discPrice} discount</p>
        )}

        <ul className="listingDetailsList">
          <li>{listing.bedrooms} Bedroom</li>
          <li>{listing.bathrooms} Bathroom</li>
          <li>{listing.parking} Parking Spot</li>
          <li>{listing.furnished == true ? "Furnished" : "Not Furnished"}</li>
        </ul>

        <p className="listingLocationTitle">Location</p>
        <div className="leafletContainer">
          <Map
            height={350}
            defaultCenter={[+listing.geolocation.lat, +listing.geolocation.lng]}
            defaultZoom={13}
          >
            <Marker
              width={50}
              anchor={[+listing.geolocation.lat, +listing.geolocation.lng]}
            ></Marker>
          </Map>
        </div>

        {auth.currentUser?.uid !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className="primaryButton"
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  );
};

export default Listing;
