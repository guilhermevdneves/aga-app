import { SquareTypes } from "../constants/SquareTypes"

export const checkIfForWhoTheDateIsReserved = ({currentDate, fetchedDates, currentUserId}) => {
  const result = fetchedDates.find(somDate => new Date(somDate.date).getTime() === currentDate.getTime())


  if(!result || !result.reservedBy) {
    return {
      status: SquareTypes.FREE
    }
  } 

  if(result.reservedBy === currentUserId) {

    return {
      status: SquareTypes.RESERVED_BY_USER,
      reservedBy: result.reservedBy
    }
     
  }
  return {
    status: SquareTypes.RESERVED_BY_OTHERS,
    reservedBy: result.reservedBy
  }
}