// export default function OrderSuccess() {
//   return (
//     <div className="row justify-content-center">
//       <div className="col-6 mt-5 text-center">
//         <img
//           className="my-5 img-fluid d-block mx-auto"
//           src="/images/success.png"
//           alt="Order Success"
//           width="200"
//           height="200"
//         />

//         <h2>Your Order has been placed successfully.</h2>

//         <a href="/orders">Go to Orders</a>
//       </div>
//     </div>
//   );
// }
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orderCompleted } from "../../slices/cartSlice"; // Import this if available

export default function OrderSuccess() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear any shipping validation messages that might be showing
    const validationMessages = document.querySelectorAll(
      ".toast-container, .toast"
    );
    validationMessages.forEach((element) => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });

    // Optional: Clear cart data after successful order
    if (typeof orderCompleted === "function") {
      dispatch(orderCompleted());
    }

    // Clear any session storage items that might trigger shipping validation
    sessionStorage.removeItem("shippingInfo"); // If this exists and is causing issues

    // Ensure no shipping validation is triggered on this page
    return () => {
      // Cleanup any remaining toast messages when component unmounts
      const remainingMessages = document.querySelectorAll(
        ".toast-container, .toast"
      );
      remainingMessages.forEach((element) => {
        if (element && element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });
    };
  }, [dispatch]);

  return (
    <div className="row justify-content-center">
      <div className="col-6 mt-5 text-center">
        <img
          className="my-5 img-fluid d-block mx-auto"
          src="/images/success.png"
          alt="Order Success"
          width="200"
          height="200"
        />

        <h2>Your Order has been placed successfully.</h2>

        <Link to="/orders" className="btn btn-primary mt-3">
          Go to Orders
        </Link>
      </div>
    </div>
  );
}
