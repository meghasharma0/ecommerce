import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/usersApiSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords does not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered");
      } catch (error) {
        console.log(error);
        toast.error(error.data.message);
      }
    }
  };

  return (
    <section className="flex justify-around items-center text-white" id="login_section">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4 signIn_heading">Sign In</h1>

        <form
          onSubmit={submitHandler}
          className="container w-[25rem]"
          id="login_form"
        >
          <div className="my-[2rem]">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white label"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border rounded laptop:w-full tablet:w-[80%]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white label"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 border rounded laptop:w-full tablet:w-[80%]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white label"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 border rounded laptop:w-full tablet:w-[80%]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="my-[2rem]">
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-white label"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 p-2 border rounded laptop:w-full tablet:w-[80%]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>

          {isLoading && <Loader />}
        </form>

        <div className="mt-4">
          <p className="text-white">
            Already have an account ?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
      {
        window.innerWidth >= 1024 && (
            <img src="https://images.pexels.com/photos/4107120/pexels-photo-4107120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="side" className="w-[50%] h-[40%] rounded" />
        )
      }
    </section>
  );
};

export default Register;
