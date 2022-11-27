import moment from 'moment';
import 'moment/locale/ko';
import 'moment-timezone';

const DIFF_CHANGE = 1000 * 60 * 60;

export const getMomentFromNow = (date: string) =>
  Date.now() - Date.parse(date) <= DIFF_CHANGE
    ? moment(date).fromNow()
    : moment(date).format('MM/DD hh:mm');
