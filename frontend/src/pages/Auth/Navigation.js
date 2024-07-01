import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import "../../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{ zIndex: 999 }}
        className="flex flex-col justify-between p-3 text-white bg-[#000] w-[4%] hover:w-[15%] h-[100%] fixed laptop:w-[4%] laptop:hover:w-[15%] tablet:w-[8%] tablet:hover:w-[20%]"
        id="navigation-container"
      >
        <div className="flex flex-col justify-center space-y-4">
          <Link
            to="/"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineHome className="mr-2 mt-[1rem] side_nav_icon" />
            <span className="hidden nav-item-name mt-[1rem]">HOME</span>{" "}
          </Link>
          <Link
            to="/shop"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShopping className="mr-2 mt-[2rem] side_nav_icon" />
            <span className="hidden nav-item-name mt-[2rem]">SHOP</span>{" "}
          </Link>
          <Link
            to="/cart"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <AiOutlineShoppingCart className="mr-2 mt-[2rem] side_nav_icon" />
            <span className="hidden nav-item-name mt-[2rem]">CART</span>{" "}
          </Link>
          <Link
            to="/favourite"
            className="flex items-center transition-transform transform hover:translate-x-2"
          >
            <FaHeart className="mr-2 mt-[2rem] side_nav_icon" />
            <span className="hidden nav-item-name mt-[2rem]">
              Favourite
            </span>{" "}
          </Link>
        </div>

        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center text-gray-8000 focus:outline-none"
          >
            {userInfo ? (
              <>
                <span className="text-white mr-2 mt-[2rem] side_nav_icon">
                  {userInfo.username.charAt(0).toUpperCase()}
                </span>
                <span className="hidden nav-item-name mt-[2rem]">
                  {userInfo.username}
                </span>{" "}
              </>
            ) : (
              <></>
            )}
          </button>

          {dropdownOpen && userInfo && (
            <ul
              className={`absolute right-0 mt-2 rounded space-y-1.5 bg-white text-gray-600 ${
                !userInfo.isAdmin ? "-top-20" : "-top-80"
              } `}
            >
              {userInfo.isAdmin && (
                <>
                  <li>
                    <Link
                      to="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 mt-2"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/productlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/categorylist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Category
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/orderlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/userlist"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Users
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/logout"
                  onClick={logoutHandler}
                  className="block px-4 py-2 hover:bg-gray-100 mb-2"
                >
                  Logout
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Displaying login or register only when user is not logged in */}
        {!userInfo && (
          <ul>
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[2rem] side_nav_icon" />
                <span className="hidden nav-item-name mt-[2rem]">
                  Login
                </span>{" "}
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineUserAdd className="mr-2 mt-[2rem] side_nav_icon" />
                <span className="hidden nav-item-name mt-[2rem]">
                  Register
                </span>{" "}
              </Link>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default Navigation;
