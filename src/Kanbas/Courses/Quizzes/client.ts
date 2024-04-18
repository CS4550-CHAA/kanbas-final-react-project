import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE;

const QUIZ_API = `${API_BASE}/api/quizzes`;
const COURSES_API = `${API_BASE}/api/courses`;

export const deleteQuiz = async (quizId: any) => {
  const response = await axios.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const createQuiz = async (courseId: string, quiz: any) => {
  const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
  return response.data;
};

export const updateQuiz = async (quiz: { _id: any }) => {
  const response = await axios.put(`${QUIZ_API}/${quiz._id}`, quiz);
  return response.data;
};
