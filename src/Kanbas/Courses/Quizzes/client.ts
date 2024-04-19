import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const Quizzes_API = `${BASE_API}/api/Quizzes`;
const api = axios.create({
  withCredentials: true,
});

export interface Quiz {
  id: String;
  title: String;
  availability: String;
  published: Boolean;
  dueDate: Date;
  points: Number;
  numberOfQuestions: Number;
  course: String;
}

export const updateQuiz = async (quiz: any) => {
  const response = await api.put(`${Quizzes_API}/${quiz.id}`, quiz);
  return response.data;
};

export const findAllQuizzes = async () => {
  const response = await api.get(`${Quizzes_API}`);
  return response.data;
};

export const createQuiz = async (quiz: Quiz) => {
  const response = await api.post(`${Quizzes_API}`, quiz);
  return response.data;
};

export const deleteQuiz = async (quiz: Quiz) => {
  const response = await api.delete(`${Quizzes_API}/${quiz.id}`);
  return response.data;
};

export const findQuizById = async (id: any) => {
  const response = await api.get(`${Quizzes_API}/${id}`);
  return response.data;
};
