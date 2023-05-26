export const formatDate = (selectedDate) => {
  const day = String(selectedDate.getDate()).padStart(2, '0');
  const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const year = String(selectedDate.getFullYear()).slice(-2);

  return `${day}/${month}/${year}`;
}