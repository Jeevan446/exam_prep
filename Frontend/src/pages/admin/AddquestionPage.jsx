import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState,useEffect } from "react";


const AddQuestionForm = () => {
  const [examtype,setExamtype]=useState([]) 
  const [selectedExamtype,setSelectedExamtype]=useState('')
  const [subjects,setSubjects]=useState([])
  async function fetchexamtypeData() {
    try {
      const response = await axios.get(
        "/api/demomode/getexams"
      );
    const arr=response.data.examTypes.map((item)=>{
        return (item.name)
      })
      console.log(arr)

      setExamtype(arr);
    } catch (err) {
      console.log(err.message);
    }
  }
  async function fetchsubjectData(examType) { 
    try {
      const response = await axios.get(
        `/api/demomode/${examType}/subjects`
      );

      const names = response.data.subjects.map((item) => item.name);
setSubjects(names)
      // setData(names);
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    fetchexamtypeData();
  }, []);


  const initialValues = {
    name: "",
    examtype: "",
    subject: "",
    chapter: "",
    level: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAns: "",
    marks: 1,
    creator: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Question is required"),
    examtype: Yup.string().required("Exam type is required"),
    subject: Yup.string().required("Subject is required"),
    chapter: Yup.string().required("Chapter is required"),
    level: Yup.string().required("Level is required"),
    options: Yup.object({
      A: Yup.string().required("Option A is required"),
      B: Yup.string().required("Option B is required"),
      C: Yup.string().required("Option C is required"),
      D: Yup.string().required("Option D is required"),
    }),
    correctAns: Yup.string().required("Correct answer is required"),
    marks: Yup.number().min(1, "Marks must be at least 1").required("Marks are required"),
    creator: Yup.string().required("Creator is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const optionsArray = [values.options.A, values.options.B, values.options.C, values.options.D];

    const payload = {
      name: values.name,
      examtype: values.examtype,
      subject: values.subject,
      chapter: values.chapter,
      level: values.level,
      options: optionsArray,
      answer: values.options[values.correctAns], // get actual correct option text
      marks: values.marks,
      creator: values.creator,
    };
    console.log(payload);

    try {
      const res = await axios.post("http://localhost:3000/api/demomode/addquestions", payload);
      alert(res.data.message);
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Error adding question");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-6">Add New Question</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="flex flex-col gap-4">
            {/* Exam Type */}
            <div>
              <label className="block font-medium mb-1">Exam Type</label>
              <Field as="select" name="examtype" className="w-full border px-3 py-2 rounded"  
              onChange={(e) => {
                setSubjects([])
                const value = e.target.value;
                setFieldValue("examtype", value);
                setSelectedExamtype(e.target.value) 
             if(e.target.value.trim){
              fetchsubjectData(e.target.value)
             }

       }}
              >
                <option value="">Select Exam Type</option>
               {
             
                examtype.map((i,key)=>(
                  <option key={key} value={i}>{i}</option>
                ))
               }
              </Field>
              <ErrorMessage name="examtype" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Subject */}
            <div>
              <label className="block font-medium mb-1">Subject</label>
              <Field as="select" name="subject" className="w-full border px-3 py-2 rounded">
                <option value="">Select Subject</option>
                {
                  subjects.length>0 && subjects.map((e,key)=>(
                     <option value={e} key={key}>{e}</option>
                  ))
                }
              </Field>
              <ErrorMessage name="subject" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Chapter */}
            <div>
              <label className="block font-medium mb-1">Chapter</label>
              <Field
                type="text"
                name="chapter"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="chapter" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Level */}
            <div>
              <label className="block font-medium mb-1">Level</label>
              <Field as="select" name="level" className="w-full border px-3 py-2 rounded">
                <option value="">Select Level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Field>
              <ErrorMessage name="level" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Question */}
            <div>
              <label className="block font-medium mb-1">Question</label>
              <Field
                as="textarea"
                name="name"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt}>
                  <label className="block font-medium mb-1">Option {opt}</label>
                  <Field
                    type="text"
                    name={`options.${opt}`}
                    className="w-full border px-3 py-2 rounded"
                  />
                  <ErrorMessage
                    name={`options.${opt}`}
                    component="p"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer */}
            <div>
              <label className="block font-medium mb-1">Correct Option</label>
              <Field
                as="select"
                name="correctAns"
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Correct Option</option>
                {["A", "B", "C", "D"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="correctAns"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Marks */}
            <div>
              <label className="block font-medium mb-1">Marks</label>
              <Field
                type="number"
                name="marks"
                min="1"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="marks" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Creator */}
            <div>
              <label className="block font-medium mb-1">Creator</label>
              <Field
                type="text"
                name="creator"
                className="w-full border px-3 py-2 rounded"
              />
              <ErrorMessage name="creator" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
              Add Question
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddQuestionForm;
