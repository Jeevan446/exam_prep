import React from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .lowercase("Title must be lowercase"),
  message: Yup.string()
    .required("Message is required")
    .lowercase("Message must be lowercase"),
});

const AddNoticePage = () => {
  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      title: values.title.toLowerCase(),
      message: values.message.toLowerCase(),
    };

    try {
      await axios.post("/api/user/notice", payload);
      resetForm();
      toast.success("Notice added successfully");
    } catch (error) {
      toast.error("Failed to add notice");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {/* Layout wrapper */}
      <div className="flex flex-1">
        <SideBar />

        {/* Main content */}
        <div className="flex flex-1 items-center justify-center px-4 py-8">
          <div className="w-full max-w-lg border border-secondary rounded-lg p-5 sm:p-6">
            <Formik
              initialValues={{ title: "", message: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-4">
                <div>
                  <label className="block font-semibold mb-1">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="w-full border border-secondary p-2 rounded outline-none focus:border-info"
                  />
                  <ErrorMessage
                    name="title"
                    component="p"
                    className="text-error text-sm mt-1"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Message</label>
                  <Field
                    as="textarea"
                    name="message"
                    rows="4"
                    className="w-full border border-secondary p-2 rounded outline-none focus:border-info"
                  />
                  <ErrorMessage
                    name="message"
                    component="p"
                    className="text-error text-sm mt-1"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="btn btn-info w-full flex sm:w-auto"
                  >
                    Add Notice
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNoticePage;
