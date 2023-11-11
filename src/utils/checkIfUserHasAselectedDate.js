import moment from 'moment';
import 'moment-timezone';

export const checkIfUserHasAselectedDate = (allDates, userId) => {
  const result = allDates.find(somDate => new Date(somDate.date).getTime() > new Date(moment.tz('America/Sao_Paulo').toDate()).getTime() && somDate.reservedBy === userId)
  return result
}