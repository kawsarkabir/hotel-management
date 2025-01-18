import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: allReviews = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews"); // Fetch all reviews
      return res.data;
    },
  });

  // Filter reviews based on the logged-in user's email
  const myAllReviews = allReviews.filter(
    (review) => review.user?.email === user?.email
  );

  if (isLoading) return <div className="text-center">Loading reviews...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">Error fetching reviews.</div>
    );

  return (
    <div className="p-4">
      {myAllReviews.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myAllReviews.map((review) => (
            <div
              key={review._id}
              className="bg-white shadow-lg rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-lg font-bold mb-2">{review.title}</h3>
              <p className="text-gray-700 mb-2">{review.review}</p>
              <p className="text-sm text-gray-500 mb-4">
                Rating: <span className="font-semibold">{review.rating}/5</span>
              </p>
              <div className="text-sm text-gray-500">
                By: <span className="font-semibold">{review.user?.email}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          No reviews found for this user.
        </div>
      )}
    </div>
  );
};

export default AllReviews;
