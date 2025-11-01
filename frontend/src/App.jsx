import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ForgotPassword from "./pages/ForgotPassword";
import useGetCurrentUser from "./hooks/useGetCurrentUser";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/Home";
import useGetCity from "./hooks/useGetCity";
import useGetMyshop from "./hooks/useGetMyShop";
import CreateEditShop from "./pages/CreateEditShop";
import AddItem from "./pages/AddItem";
import EditItem from "./pages/EditItem";
import useGetShopByCity from "./hooks/useGetShopByCity";
import useGetItemsByCity from "./hooks/useGetItemsByCity";
import CartPage from "./pages/CartPage";
import CheckOut from "./pages/CheckOut";
import OrderPlaced from "./pages/OrderPlaced";
import MyOrders from "./pages/MyOrders";
import useGetMyOrders from "./hooks/useGetMyOrders";
import useUpdateLocation from "./hooks/useUpdateLocation";
import TrackOrderPage from "./pages/TrackOrderPage";
import Shop from "./pages/Shop";
import { useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { setSocket } from "./redux/userSlice";

export const serverUrl = "https://foodiefly-os8l.onrender.com";
function App() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const socketRef = useRef(null); // useRef keeps the same socket across renders
  useGetCurrentUser();
  useUpdateLocation();
  useGetCity();
  useGetMyshop();
  useGetShopByCity();
  useGetItemsByCity();
  useGetMyOrders();

  useEffect(() => {
    if (!userData?._id) return;

    // Create socket connection
    socketRef.current = io(serverUrl, { withCredentials: true });

    socketRef.current.on("connect", () => {
      socketRef.current.emit("identity", { userId: userData._id });
      console.log("✅ Socket connected:", socketRef.current.id);
    });

    // OPTIONAL: if you want to save socket ID or connection status in Redux
    dispatch(setSocket({ socketId: socketRef.current.id, connected: true }));

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log("❌ Socket disconnected");
      }
    };
  }, [userData?._id]);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/create-edit-shop"
        element={userData ? <CreateEditShop /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/add-item"
        element={userData ? <AddItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/edit-item/:itemId"
        element={userData ? <EditItem /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/cart"
        element={userData ? <CartPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/checkout"
        element={userData ? <CheckOut /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/order-placed"
        element={userData ? <OrderPlaced /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/my-orders"
        element={userData ? <MyOrders /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/track-order/:orderId"
        element={userData ? <TrackOrderPage /> : <Navigate to={"/signin"} />}
      />
      <Route
        path="/shop/:shopId"
        element={userData ? <Shop /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
}

export default App;

// Developed By Tarun Saxena
