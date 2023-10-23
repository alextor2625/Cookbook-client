import { createContext, useEffect, useState } from "react";
import { get } from "../services/authService";

const ReviewsContext = createContext();

const ReviewsProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState(false);

  useEffect(() => {
    get("/reviews/all")
      .then((response) => {
        console.log("Reviews Context Response Data", response.data);
        setNewReview(false)
        setReviews(response.data);
      })
      .catch((err) => {
        console.log("Error getting Reviews Data In Context", err);
      });
  }, [newReview]);
  return (
    <ReviewsContext.Provider value={{ reviews, setReviews, setNewReview }}>
        {children}
    </ReviewsContext.Provider>
  );
};

export { ReviewsContext, ReviewsProvider };