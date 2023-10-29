import { SquareTypes } from "../constants/SquareTypes"
import { setScheuleDateStorage } from "../storage/scheduleDateStorage "

export const checkIfForWhoTheDateIsReserved = ({currentDate, fetchedDates, currentUserId}) => {
  const result = fetchedDates.find(somDate => new Date(somDate.date).getTime() === currentDate.getTime())

  if(!result || !result.reservedBy) {
    return {
      status: SquareTypes.FREE
    }
  } 

  if(result.reservedBy === currentUserId) {
    setScheuleDateStorage(result.date);
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