import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUpForm = () => {
  // 1. Enhanced Validation Schema
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
        "Email must start with lowercase letters (numbers optional) and end with @gmail.com (e.g., john@gmail.com or john123@gmail.com)"
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

  // 2. Form Submission Logic
  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      // Additional client-side validation before submission
      if (!values.email.match(/^[a-z]+[0-9]*@gmail\.com$/)) {
        setErrors({
          email: "Email must start with lowercase letters (numbers optional) and end with @gmail.com"
        });
        return;
      }

      const response = await axios.post(
        "/api/user/register",
        {
          username: values.username.trim(),
          email: values.email.trim().toLowerCase(),
          password: values.password,
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Success:", response.data);
      alert("Registration Successful!");
      resetForm();
    } catch (error) {
      // Handle server-side errors
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data?.message || error.response.data?.error;
          if (errorMessage?.toLowerCase().includes("email")) {
            setErrors({ email: "This email is already registered" });
          } else if (errorMessage?.toLowerCase().includes("username")) {
            setErrors({ username: "This username is already taken" });
          } else {
            setErrors({ submit: errorMessage || "Registration failed" });
          }
        } else {
          setErrors({ submit: `Server error: ${error.response.status}` });
        }
      } else {
        setErrors({ submit: "Network error. Please check your connection." });
      }
      console.error("Error:", error.response?.data || error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
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
          validateOnBlur={true}
          validateOnChange={true}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="space-y-5">
              {/* Display submission errors */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Username Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Username
                </label>
                <Field
                  type="text"
                  name="username"

                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.username && touched.username ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <ErrorMessage
                  name="username"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
                {/* Format text removed from here */}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  placeholder=""
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must contain at least 6 characters, including uppercase, lowercase, and number
                </p>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Confirm Password
                </label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none transition ${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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