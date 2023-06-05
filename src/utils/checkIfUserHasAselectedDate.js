export const checkIfUserHasAselectedDate = (allDates, userId) => {
  const result = allDates.find(somDate => new Date(somDate.date).getTime() > new Date().getTime() && somDate.reservedBy === userId)
  return result
}