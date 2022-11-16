import { IMbtiResult, IMbtiScoreType } from 'types';

export const getMbtiResult2String = (result: IMbtiResult | IMbtiScoreType) =>
  (result.e_score > result.i_score ? 'E' : 'I') +
  (result.s_score > result.n_score ? 'S' : 'N') +
  (result.t_score > result.f_score ? 'T' : 'F') +
  (result.p_score > result.j_score ? 'P' : 'J');
