import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const ANSWERS_API = `${BASE_API}/api/answers`;
const api = axios.create({
  withCredentials: true,
});

export interface Answer {
    answer: string;
    isCorrect: boolean;
    questionId: string;
}

export const updateAnswer = async (answer: any) => {
  const response = await api.put(`${ANSWERS_API}/${answer._id}`, answer);
  return response.data;
};

export const findAllAnswersForQuestion = async (questionId: string) => {
  const response = await api.get(`${ANSWERS_API}/byQuestion/${questionId}`);
  return response.data;
};

export const createAnswer = async (answer: Answer) => {
  const response = await api.post(`${ANSWERS_API}`, answer);
  return response.data;
};

export const deleteAnswer = async (answerId: string) => {
  const response = await api.delete(`${ANSWERS_API}/${answerId}`);
  return response.data;
};

export const findAnswerById = async (id: any) => {
  const response = await api.get(`${ANSWERS_API}/${id}`);
  return response.data;
};
