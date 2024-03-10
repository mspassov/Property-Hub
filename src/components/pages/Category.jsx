import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import ListingItem from "../ListingItem";

const Category = () => {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const getListings = async () => {
      try {
        setLoading(true);

        //Get reference to specific Firestore collection
        const listingRef = collection(db, "listings");

        //Create / build the listing query
        const listingQuery = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(10)
        );

        //Execute the query
        const queryResult = await getDocs(listingQuery);

        //Add the returned listings to state
        let listingsArr = [];
        queryResult.forEach((listing) => {
          return listingsArr.push({
            id: listing.id,
            data: listing.data(),
          });
        });

        setListings(listingsArr);

        setLoading(false);
      } catch (error) {
        toast.error("Could not get listings. Please try again!");
      }
    };

    getListings();
  }, []);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          Properties for {params.categoryName == "rent" ? "rent" : "sale"}
        </p>
      </header>

      {loading ? (
        <Spinner />
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listings.map((item) => {
                return (
                  <ListingItem key={item.id} listing={item.data} id={item.id} />
                );
              })}
            </ul>
          </main>
        </>
      ) : (
        <p>No properties for {params.categoryName}</p>
      )}
    </div>
  );
};

export default Category;
