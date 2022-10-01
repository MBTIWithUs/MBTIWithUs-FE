export interface IUser {
  username: string;
  email: string;
  name: string;
}

export interface IQuestion {
  question: string;
  left_answer: string;
  right_answer: string;
  left_answer_type: string;
  right_answer_type: string;
  type: number;
}
