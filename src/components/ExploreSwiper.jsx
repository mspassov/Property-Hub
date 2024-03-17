import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase.config";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Spinner from "./Spinner";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const ExploreSwiper = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getListings = async () => {
      const listingsRef = collection(db, "listings");
      const listingsQuery = query(
        listingsRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const querySnapshot = await getDocs(listingsQuery);

      let listingsArray = [];
      querySnapshot.forEach((doc) => {
        return listingsArray.push({ id: doc.id, data: doc.data() });
      });

      setListings(listingsArray);
      setLoading(false);
    };

    getListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    listings && (
      <>
        <p className="exploreHeading">Recommended Listings</p>
        <Swiper slidesPerView={1} pagination={{ clickable: true }}>
          {listings.map(({ id, data }) => {
            return (
              <SwiperSlide
                key={id}
                onClick={() => navigate(`/category/${data.type}/${id}`)}
              >
                <div
                  className="swiperSlideDiv"
                  style={{
                    background: `url(${data.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                    height: "60vh",
                  }}
                >
                  <p className="swiperSlideText">{data.name}</p>
                  <p className="swiperSlidePrice">
                    {data.discountedPrice ?? data.regularPrice}
                    {data.type == "rent" && " / month"}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </>
    )
  );
};

export default ExploreSwiper;
