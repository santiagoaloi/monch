import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import * as ROUTES from "./constants/routes";

import { db } from "./config/firebase";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

import Home from "./pages/home/Home";
import Register from "./pages/auth/Register";
import SignIn from "./pages/auth/SignIn";
import { AuthContextProvider } from "./contexts/AuthContext";
import Account from "./pages/account/Account";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const [reviews, setReviews] = useState([]);

  // const addToFirebase = async () => {
  //   try {
  //     for (let i = 0; i < data.length; i++) {
  //       let obj = data[i];
  //       const doc = await addDoc(collection(db, "restaurants"), obj);
  //       console.log(doc.id);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const getRestaurants = async () => {
    const querySnapshot = await getDocs(collection(db, "restaurants"));
    let arr = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      let obj = {
        id: doc.id,
        ...doc.data(),
      };
      arr.push(obj);
    });

    setRestaurants(arr);
  };

  const addReview = async (id) => {
    let review = {
      reviewId: "12347",
      title: "review title",
      body: "review body",
      images: [],
    };
    const restaurantRef = doc(db, "restaurants", id);
    await updateDoc(restaurantRef, {
      reviews: arrayRemove(review),
    });
  };

  const deleteImage = async (id, uri) => {
    const reviewRef = doc(db, "reviews", id);
    await updateDoc(reviewRef, {
      images: arrayRemove(uri),
    });
  };

  const getReviewsByUser = async () => {
    const reviewsRef = collection(db, "reviews");
    const q = query(reviewsRef, where("userId", "==", "user1"));
    const snapshot = await getDocs(q);
    let arr = [];
    snapshot.forEach((doc) => {
      console.log(doc.data());
      arr.push({ reviewId: doc.id, ...doc.data() });
    });
    console.log(arr);
    setReviews(arr);
  };

  // const getReviewsByRestaurant = async () => {
  //   const reviewsRef = collection(db, "reviews");
  //   const q = query(reviewsRef, where("restaurantId", "==", "restaurant1"))
  //   const snapshot = await getDocs(q);
  //   snapshot.forEach((doc) => {
  //     console.log(doc.data());
  //   })
  // }

  // useEffect(() => {
  //   const reviewsRef = collection(db, "reviews");
  //   onSnapshot(reviewsRef, (snapshot) => {
  //     let arr = [];
  //     snapshot.forEach((doc) => {
  //       console.log(doc.data());
  //       arr.push({ reviewId: doc.id, ...doc.data() });
  //     });
  //     console.log(arr);
  //     setReviews(arr);
  //   });

  //   async function getData() {
  //     await getRestaurants();
  //     await getReviewsByUser();
  //     // await getReviewsByRestaurant();
  //     setIsLoading(false);
  //   }

  //   getData();

  //   return () => onSnapshot(reviewsRef);
  // }, []);

  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route path={ROUTES.SIGN_IN} element={<SignIn />} />
          <Route path={ROUTES.ACCOUNT} element={<Account />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;