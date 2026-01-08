import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext" 


const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useUser(); 

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "Username must be at least 3 characters")
      .max(50, "Username cannot exceed 50 characters")
      .matches(/^\S*$/, "Username cannot contain spaces")
      .required("Username is required"),

    email: Yup.string()
      .trim()
      .lowercase()
      .matches(
        /^[a-z]+[0-9]*@gmail\.com$/,
        "Email must start with lowercase letters (numbers optional) and end with @gmail.com"
      )
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password cannot exceed 50 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      )
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const response = await axios.post(
        "/api/user/register",
        {
          username: values.username.trim(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      // Success
      toast.success("Successfully registered!");
      resetForm();

      
      setUser(response.data.user);

  
      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      }

    
      navigate("/login");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data?.message || "Registration failed";
        if (errorMessage.toLowerCase().includes("email")) {
          setErrors({ email: "This email is already registered" });
        } else if (errorMessage.toLowerCase().includes("username")) {
          setErrors({ username: "This username is already taken" });
        } else {
          setErrors({ submit: errorMessage });
        }
      } else {
        setErrors({ submit: "Network error. Please try again." });
      }
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <div className="bg-base-300 border border-secondary p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-secondary mb-6">
          Create Account
        </h2>

        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur
          validateOnChange
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5">
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 text-error rounded-md text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Username */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Username</label>
                <Field
                  type="text"
                  name="username"
                  className={`w-full px-4 py-2 input input-bordered focus:ring-2 focus:ring-primary focus:outline-none ${
                    errors.username && touched.username ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="username" component="p" className="text-error text-xs mt-1" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Email Address</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className={`w-full px-4 py-2 input input-bordered focus:ring-2 focus:ring-primary focus:outline-none ${
                    errors.email && touched.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="email" component="p" className="text-error text-xs mt-1" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Password</label>
                <Field
                  type="password"
                  name="password"
                  className={`w-full px-4 py-2 input input-bordered focus:ring-2 focus:ring-primary focus:outline-none ${
                    errors.password && touched.password ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="password" component="p" className="text-error text-xs mt-1" />
                <p className="text-xs text-gray-500 mt-1">
                  Must contain at least 6 characters, including uppercase, lowercase, and number
                </p>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-semibold text-secondary mb-1">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className={`w-full px-4 py-2 input input-bordered focus:ring-2 focus:ring-primary focus:outline-none ${
                    errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <ErrorMessage name="confirmPassword" component="p" className="text-error text-xs mt-1" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-secondary font-bold py-2 rounded-md"
              >
                {isSubmitting ? "Processing..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
