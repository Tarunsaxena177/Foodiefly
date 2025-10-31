import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import UserOrderCard from "../components/UserOrderCard";
import OwnerOrderCard from "../components/OwnerOrderCard";
import {
  setMyOrders,
  updateOrderStatus,
  updateRealtimeOrderStatus,
} from "../redux/userSlice";

function MyOrders() {
  const { userData, myOrders, socket } = useSelector((state) => state.user);
  const navigate = useNavigate();
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
    // 1. Establish the connection to the server
    const socketInstance = io(serverUrl, { withCredentials: true });

    // 2. Store the socket instance in your application state (e.g., Redux, Context)
    dispatch(setSocket(socketInstance));

    // 3. Listen for a successful connection event
    socketInstance.on('connect', () => {
      // 4. Once connected and if user data exists, send the user's identity
      if (userData) {
        socketInstance.emit('identity', { userId: userData._id });
      }
    });

    // 5. Cleanup function: runs when the component unmounts or before the next effect runs
    return () => {
      socketInstance.disconnect();
    };
  }, [userData?._id]); // Re-run effect if the user's ID changes

  return (
    <div className="w-full min-h-screen bg-[#E0E7FF] flex justify-center px-4">
      <div className="w-full max-w-[800px] p-4">
        <div className="flex items-center gap-[20px] mb-6 ">
          <div className=" z-[10] " onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className="text-[#4F46E5]" />
          </div>
          <h1 className="text-2xl font-bold  text-start">My Orders</h1>
        </div>
        <div className="space-y-6">
          {myOrders?.map((order, index) =>
            userData.role == "user" ? (
              <UserOrderCard data={order} key={index} />
            ) : userData.role == "owner" ? (
              <OwnerOrderCard data={order} key={index} />
            ) : null
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;
