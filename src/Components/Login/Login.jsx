import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Vortex } from "react-loader-spinner";
import { authContext } from "../AuthContext/AuthContext";

export default function Login() {
  const { setToken}= useContext(authContext)
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoding, setIsLoding] = useState(false);
  const navigate = useNavigate();
  function callLoginApi(userInputs) {
    setIsLoding(true);
    axios
      .post(
        "https://note-sigma-black.vercel.app/api/v1/users/signIn",
        userInputs
      )

      .then((res) => {
        console.log(res.data);
        setToken(res.data.token)
        localStorage.setItem('tkn',res.data.token)
        setIsLoding(false);
        setErrorMsg(null);
        setSuccess(res.data.msg);
        setTimeout(() => {
          navigate("/home");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
        setErrorMsg(err.response.data.msg);
        setSuccess(null);
      });
  }
  const validateInputs = yup.object({
    
    email: yup.string().email("invalid email").required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^[a-z0-9]{4,}$/),
  });
  const registerForm = useFormik({
    initialValues: {

      email: "",
      password: "",
    },
    validationSchema: validateInputs,
    onSubmit: callLoginApi,
  });
  return (
    <>
      <div className="container mx-auto py-16 px-20 bg-slate-900">
        <div className=" text-center flex flex-col items-center justify-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <h3 className="text-2xl text-white py-5"> Login New :</h3>
        </div>
        <form onSubmit={registerForm.handleSubmit} className="max-w-sm mx-auto">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@gmail.com"
              required
            />{" "}
            {registerForm.errors.email && registerForm.touched.email ? (
              <p className="text-red-600">{registerForm.errors.email}</p>
            ) : (
              " "
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="yourPassword"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <p className="text-red-600">{registerForm.errors.password}</p>
            ) : (
              " "
            )}
          </div>

          
            <button
              type="submit"
              disabled={!(registerForm.isValid && registerForm.dirty)}
              className="text-white   bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {isLoding ? (
               
                  <Vortex
                    visible={true}
                    height="40"
                    width="40"
                    ariaLabel="vortex-loading"
                    wrapperStyle={{}}
                    wrapperClass="vortex-wrapper"
                    colors={[
                      "white",
                      "white",
                      "white",
                      "white",
                      "white",
                      "white",
                    ]}
                  />
                
              ) : (
                "Submit"
              )}
            </button>
            <button
              onClick={registerForm.resetForm}
              className="text-white ms-5   bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm  sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              Clear Inputs
            </button>
         

          {success ? (
            <div className="text-green-500 text-center py-5">
              {<p>{success}</p>}
            </div>
          ) : (
            <div className="text-red-700 text-center py-5">
              {<p>{errorMsg}</p>}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
