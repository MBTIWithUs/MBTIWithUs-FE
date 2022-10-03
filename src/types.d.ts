export interface IUser {
  id: number;
  nickname: string;
  profile_image_url: string;
}
export interface IToken {
  access_token: string;
  access_token_expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  server_current_time: number;
  type: string;
}
export interface IProfile {
  user: IUser | null;
  token: IToken | null;
}

export interface IQuestion {
  question: string;
  left_answer: string;
  right_answer: string;
  left_answer_type: string;
  right_answer_type: string;
  type: number;
}
