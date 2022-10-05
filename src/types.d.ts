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
  id: number;
  question: string;
  left_answer: string;
  right_answer: string;
}

export interface IQuestionAnswer {
  id: number;
  score_type: string;
  score: number;
}

export interface IMbtiResult {
  created_at: number;
  id: number;
  target_id: number;
  writer_id: number;
  target_nickname: string;
  writer_nickname: string;
  e_score: number;
  f_score: number;
  i_score: number;
  j_score: number;
  n_score: number;
  p_score: number;
  s_score: number;
  t_score: number;
}
