import { useFormik } from "formik";
import axios from "axios";
import * as yup from 'yup';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Vortex} from 'react-loader-spinner'


export default function Register() {
  const [errorMsg, setErrorMsg] = useState(null)
  const [success, setSuccess] = useState(null)
  const [isLoding, setIsLoding] = useState(false)
  const navigate = useNavigate()
  function callRegisterApi(userInputs) {
    setIsLoding(true)
    axios
      .post(
        "https://note-sigma-black.vercel.app/api/v1/users/signUp",
        userInputs
      )

      .then((res) => {
        console.log(res.data);
        setIsLoding(false)
        setErrorMsg(null)
        setSuccess(res.data.msg);
        setTimeout(() => {
          navigate('/login')
        }, 2000);

      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false)
        setErrorMsg(err.response.data.msg);
        setSuccess(null)
      });
  }
  const validateInputs = yup.object({
    name: yup.string().required('name is required').min(3, 'name is too short'),
    email: yup.string().email('invalid email').required('email is required'),
    password: yup.string().required('password is required').matches(/^[a-z0-9]{4,}$/),
    age: yup.number().min(16, 'you are too young to create an account').required('age is required'),
    phone: yup.string().required('phone is required').matches(/^(01)[1,2,5,0]{1}[0-9]{8}$/)
  })
  const registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      age: '',
      phone:''
    },
    validationSchema:validateInputs,
    onSubmit:callRegisterApi
  });
  return (
    <>
      <div className="container mx-auto py-10 px-20 bg-slate-900">
        <div className=" text-center flex flex-col items-center justify-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <h3 className="text-2xl text-white py-5"> Register New Account:</h3>
        </div>
        <form onSubmit={registerForm.handleSubmit} className="max-w-sm mx-auto">
          <p className="text-green-500 pt-5 pb-3">{success}</p>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="yourName"
              required
            />
            {registerForm.errors.name && registerForm.touched.name ? (
              <p className="text-red-600">{registerForm.errors.name}</p>
            ) : (
              " "
            )}
          </div>
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
          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={registerForm.values.age}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              placeholder="yourAge"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {registerForm.errors.age && registerForm.touched.age ? (
              <p className="text-red-600">{registerForm.errors.age}</p>
            ) : (
              " "
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-white dark:text-white"
            >
              Your phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              onBlur={registerForm.handleBlur}
              placeholder="yourPhone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <p className="text-red-600">{registerForm.errors.phone}</p>
            ) : (
              " "
            )}
          </div>

         
            <button
              type="submit"
              disabled={!(registerForm.isValid && registerForm.dirty)}
              className="text-white me-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                "Register"
              )}
            </button>
            <button
              onClick={registerForm.resetForm}
              className="text-white    bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
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
