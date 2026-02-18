import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useUser} from "../../context/userContext"
import { Link } from "react-router-dom"; 

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (values, { resetForm, setSubmitting, setErrors }) => {
    try {
      await login(values);
      resetForm();
      navigate("/"); 
    } catch (error) {
      // Display error message properly
      setErrors({ submit: error.message || "Login failed. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-base-300 border border-secondary p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-secondary">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-4">
              {/* Display general error message */}
              {errors.submit && (
                <div className="p-3 bg-red-50 border border-red-200 text-error rounded-md text-sm">
                  {errors.submit}
                </div>
              )}

              {/* Email */}
              <div>
                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 input input-bordered focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 input input-bordered focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-error text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn btn-secondary py-2 rounded-lg"
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
              <div className="text-center">
              If you don't have an account <Link to="/signup" className="text-info underline">register</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginForm;
