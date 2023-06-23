export const generateTimeArray = (date) => {
  const startTime = new Date(date);
  startTime.setHours(9, 0, 0, 0); // Define o horário de início como 09:00

  const endTime = new Date(date);
  endTime.setHours(20, 30, 0, 0); // Define o horário de término como 23:00

  const timeArray = [];

  let currentTime = new Date(startTime);
  while (currentTime <= endTime) {
    timeArray.push(new Date(currentTime));
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return {
    selectedDate: startTime,
    timeArray
  };
}
