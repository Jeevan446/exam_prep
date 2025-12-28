// const Question = require("../models/question.model");

// // GET demo questions by examtype, subject, chapter
// const getDemoQuestions = async (req, res) => {
//   try {
//     const { examtype, subject, chapter } = req.params;

//     if (!examtype || !subject || !chapter) {
//       return res.status(400).json({
//         success: false,
//         message: "examtype, subject, and chapter are required"
//       });
//     }

//     // Get random 5 questions (or less if not enough)
//     const questions = await Question.aggregate([
//       { $match: { examtype, subject, chapter } },
//       { $sample: { size: 5 } },          // random 5 questions
//       { $project: { answer: 0, __v: 0 } } // hide the 'answer' field
//     ]);

//     if (!questions.length) {
//       return res.status(404).json({
//         success: false,
//         message: "No demo questions found for this examtype, subject, and chapter"
//       });
//     }

//     res.status(200).json({
//       success: true,
//       count: questions.length,
//       data: questions
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = { getDemoQuestions };
