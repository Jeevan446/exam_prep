import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const AddQuestionForm = () => {
  const [examtype, setExamtype] = useState([]);
  const [selectedExamtype, setSelectedExamtype] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [chapters, setChapters] = useState([]);
  const [loadingExamType, setLoadingExamType] = useState(true);
  const [loadingSubjects, setLoadingSubjects] = useState(false);
  const [loadingChapters, setLoadingChapters] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Fetch exam types on component mount
  async function fetchexamtypeData() {
    try {
      setLoadingExamType(true);
      const response = await axios.get("/api/demomode/getexams");
      const arr = response.data.examTypes.map((item) => item.name);
      setExamtype(arr);
    } catch (err) {
      console.error("Error fetching exam types:", err.message);
      alert("Failed to load exam types. Please refresh the page.");
    } finally {
      setLoadingExamType(false);
    }
  }

  // Fetch subjects based on selected exam type
  async function fetchsubjectData(examType) { 
    try {
      setLoadingSubjects(true);
      setSubjects([]); // Clear previous subjects
      setChapters([]); // Clear chapters when exam type changes
      setSelectedSubject('');
      
      const response = await axios.get(`/api/demomode/${examType}/subjects`);
      
      // Extract subjects from response based on your API structure
      // Assuming response has subjects array
      const subjectData = response.data.subjects || response.data.message || [];
      const names = subjectData.map((item) => 
        typeof item === 'object' ? item.name : item
      );
      setSubjects(names);
    } catch (err) {
      console.error("Error fetching subjects:", err.message);
      setSubjects([]);
      alert("Failed to load subjects for this exam type.");
    } finally {
      setLoadingSubjects(false);
    }
  }

  // Fetch chapters based on selected exam type and subject
  async function fetchchapterData(examType, subject) {
    try {
      setLoadingChapters(true);
      setChapters([]); // Clear previous chapters
      
      // Your API endpoint: /api/demomode/:examtype/:subjects/chapters
      const response = await axios.get(`/api/demomode/${examType}/${subject}/chapters`);
      
      console.log("Chapters API response:", response.data);
      
      // Handle your specific response format
      let chapterData = [];
      
      if (response.data && response.data.message) {
        // Your API returns: { "message": [chapter objects] }
        chapterData = response.data.message;
      } else if (Array.isArray(response.data)) {
        // If response is directly an array
        chapterData = response.data;
      } else if (response.data && response.data.chapters) {
        // If response has chapters array
        chapterData = response.data.chapters;
      }
      
      setChapters(chapterData);
    } catch (err) {
      console.error("Error fetching chapters:", err.message);
      console.error("Error details:", err.response?.data);
      setChapters([]);
    } finally {
      setLoadingChapters(false);
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
    correctAns: Yup.string()
      .oneOf(["A", "B", "C", "D"], "Please select a valid option")
      .required("Correct answer is required"),
    marks: Yup.number()
      .min(1, "Marks must be at least 1")
      .max(10, "Marks cannot exceed 10")
      .required("Marks are required"),
    creator: Yup.string().required("Creator is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setSubmitting(true);
    
    const optionsArray = [
      values.options.A,
      values.options.B, 
      values.options.C,
      values.options.D
    ];

    const correctAnswerText = values.options[values.correctAns];

    const payload = {
      name: values.name,
      examtype: values.examtype,
      subject: values.subject,
      chapter: values.chapter,
      level: values.level,
      options: optionsArray,
      answer: correctAnswerText,
      correctOption: values.correctAns,
      marks: values.marks,
      creator: values.creator,
    };

    console.log("Submitting payload:", payload);

    try {
      const res = await axios.post("/api/demomode/addquestions", payload);
      alert(res.data.message || "Question added successfully!");
      
      // Reset everything
      resetForm();
      setSubjects([]);
      setChapters([]);
      setSelectedExamtype('');
      setSelectedSubject('');
    } catch (err) {
      console.error("Submission error:", err);
      const errorMessage = err.response?.data?.message || 
                          err.response?.data?.error || 
                          "Error adding question. Please try again.";
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const handleExamTypeChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("examtype", value);
    setFieldValue("subject", "");
    setFieldValue("chapter", "");
    setSelectedExamtype(value);
    setSelectedSubject('');
    setChapters([]);
    
    if (value.trim()) {
      fetchsubjectData(value);
    } else {
      setSubjects([]);
    }
  };

  const handleSubjectChange = (e, setFieldValue) => {
    const value = e.target.value;
    setFieldValue("subject", value);
    setFieldValue("chapter", "");
    setSelectedSubject(value);
    
    if (value.trim() && selectedExamtype.trim()) {
      fetchchapterData(selectedExamtype, value);
    } else {
      setChapters([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 border border-secondary shadow-md rounded-lg mt-7 scale-95">
      <h2 className="text-2xl font-bold mb-6 text-secondary">Add New Question</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="flex flex-col gap-4">
            {/* Exam Type */}
            <div>
              <label className="block font-medium mb-1 text-ghost">Exam Type *</label>
              <Field 
                as="select" 
                name="examtype" 
                className={`w-full border px-3 py-2 rounded ${touched.examtype && errors.examtype ? 'border-red-500' : 'border-gray-300'}`}
                onChange={(e) => handleExamTypeChange(e, setFieldValue)}
                disabled={loadingExamType}
              >
                <option value="">Select Exam Type</option>
                {examtype.map((item, index) => (
                  <option key={index} value={item}>{item}</option>
                ))}
              </Field>
              {loadingExamType && <p className="text-secondary text-sm mt-1">Loading exam types...</p>}
              <ErrorMessage name="examtype" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Subject */}
            <div>
              <label className="block font-medium mb-1 text-ghost">Subject *</label>
              <Field 
                as="select" 
                name="subject" 
                className={`w-full border px-3 py-2 rounded ${touched.subject && errors.subject ? 'border-red-500' : 'border-gray-300'}`}
                onChange={(e) => handleSubjectChange(e, setFieldValue)}
                disabled={!selectedExamtype || loadingSubjects}
              >
                <option value="">Select Subject</option>
                {subjects.map((subject, index) => (
                  <option key={index} value={subject}>{subject}</option>
                ))}
              </Field>
              {loadingSubjects && <p className="text-blue-500 text-sm mt-1">Loading subjects...</p>}
              <ErrorMessage name="subject" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Chapter */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Chapter *</label>
              
              {/* Show chapter dropdown when chapters are loaded */}
              {!loadingChapters && chapters.length > 0 && (
                <>
                  <Field 
                    as="select" 
                    name="chapter" 
                    className={`w-full border px-3 py-2 rounded ${touched.chapter && errors.chapter ? 'border-red-500' : 'border-gray-300'}`}
                    disabled={!selectedSubject}
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map((chapter, index) => (
                      <option key={chapter._id || index} value={chapter.name}>
                        {chapter.name}
                      </option>
                    ))}
                  </Field>
                  <p className="text-green-600 text-sm mt-1">
                    {chapters.length} chapters loaded
                  </p>
                </>
              )}
              
              {/* Show manual input when no chapters from API */}
              {!loadingChapters && selectedSubject && chapters.length === 0 && (
                <div>
                  <p className="text-yellow-600 text-sm mb-2">
                    No chapters found in database. Please enter chapter manually:
                  </p>
                  <Field
                    type="text"
                    name="chapter"
                    className="w-full border px-3 py-2 rounded border-gray-300"
                    placeholder="Enter chapter name"
                  />
                </div>
              )}
              
              {/* Show loading state */}
              {loadingChapters && (
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                  <p className="text-blue-500 text-sm">Loading chapters from database...</p>
                </div>
              )}
              
              <ErrorMessage name="chapter" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Level */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Level *</label>
              <Field 
                as="select" 
                name="level" 
                className={`w-full border px-3 py-2 rounded ${touched.level && errors.level ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Level</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </Field>
              <ErrorMessage name="level" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Question */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Question *</label>
              <Field
                as="textarea"
                name="name"
                rows="3"
                className={`w-full border px-3 py-2 rounded ${touched.name && errors.name ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter your question here..."
              />
              <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-4">
              {["A", "B", "C", "D"].map((opt) => (
                <div key={opt}>
                  <label className="block font-medium mb-1 text-gray-700">Option {opt} *</label>
                  <Field
                    type="text"
                    name={`options.${opt}`}
                    className={`w-full border px-3 py-2 rounded ${touched.options?.[opt] && errors.options?.[opt] ? 'border-red-500' : 'border-gray-300'}`}
                    placeholder={`Option ${opt}`}
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
              <label className="block font-medium mb-1 text-gray-700">Correct Option *</label>
              <Field
                as="select"
                name="correctAns"
                className={`w-full border px-3 py-2 rounded ${touched.correctAns && errors.correctAns ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Select Correct Option</option>
                {["A", "B", "C", "D"].map((opt) => (
                  <option key={opt} value={opt}>
                    Option {opt} - {values.options?.[opt] || `(Not yet filled)`}
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
              <label className="block font-medium mb-1 text-gray-700">Marks *</label>
              <Field
                type="number"
                name="marks"
                min="1"
                max="10"
                className={`w-full border px-3 py-2 rounded ${touched.marks && errors.marks ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="marks" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Creator */}
            <div>
              <label className="block font-medium mb-1 text-gray-700">Creator *</label>
              <Field
                type="text"
                name="creator"
                className={`w-full border px-3 py-2 rounded ${touched.creator && errors.creator ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter creator name"
              />
              <ErrorMessage name="creator" component="p" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting || loadingSubjects || loadingChapters}
              className={`bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 ${
                submitting || loadingSubjects || loadingChapters ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
              }`}
            >
              {submitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </span>
              ) : (
                "Add Question"
              )}
            </button>  
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddQuestionForm;