import axios from "axios";
export const BASE_API = process.env.REACT_APP_API_BASE;
export const Quizzes_API = `${BASE_API}/api/Quizzes`;
const COURSES_API = `${BASE_API}/api/courses`;
const api = axios.create({
  withCredentials: true,
});

export interface Quiz {
  id: String;
  title: String;
  availability: String;
  description: String;
  published: Boolean;
  dueDate: Date;
  numberOfQuestions: Number;
  course: String;
  quizType: String;
  assignmentGroup: String;
  shuffleAnswers: String;
  timeLimit: Number;
  multipleAttempts: String;
  showCorrectAnswers: String;
  accessCode: String;
  oneQuestionAtATime: String;
  webCamRequired: String;
  lockQuestionsAfterAnswering: String;
  availableDate: Date;
  untilDate: Date;
}

export const updateQuiz = async (quiz: any) => {
  const response = await api.put(`${Quizzes_API}/updateQuiz/${quiz.id}`, quiz);
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
  const response = await api.delete(`${Quizzes_API}/deleteQuiz/${quiz.id}`);
  return response.data;
};

export const findQuizById = async (id: String) => {
  const response = await api.get(`${Quizzes_API}/findQuizById/${id}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: string) => {
  console.log(Quizzes_API);
  console.log(`${Quizzes_API}/${courseId}`);
  const response = await axios.get(
    `${Quizzes_API}/getQuizzesByCourseId/${courseId}`
  );
  return response.data;
};
