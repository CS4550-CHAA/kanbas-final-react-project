import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const QUESTIONS_API = `${BASE_API}/api/questions`;
const api = axios.create({
  withCredentials: true,
});

export interface Question {
    id: string;
    title: string;
    question: string;
    type: string;
    points: number;
    quizId: string;
}

export const updateQuestion = async (question: any) => {
  const response = await api.put(`${QUESTIONS_API}/${question.id}`, question);
  return response.data;
};

export const findAllQuestionsForQuiz = async (quizId: string) => {
  const response = await api.get(`${QUESTIONS_API}/byQuiz/${quizId}`);
  console.log(response)
  return response.data;
};

export const createQuestion = async (question: Question) => {
  const response = await api.post(`${QUESTIONS_API}`, question);
  return response.data;
};

export const deleteQuestion = async (questionId: string) => {
  const response = await api.delete(`${QUESTIONS_API}/${questionId}`);
  return response.data;
};

export const findQuestionById = async (id: any) => {
  const response = await api.get(`${QUESTIONS_API}/${id}`);
  return response.data;
};
