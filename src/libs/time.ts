import moment from 'moment';
import 'moment/locale/ko';
import 'moment-timezone';

export const getMomentFromNow = (date: string) => moment(date).fromNow();
