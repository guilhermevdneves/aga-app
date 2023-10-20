// (00) 0000-0000
export const maskPhoneFixo = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})/, "$1-$2")
  }
  
  
  // (00) 00000-0000
export const maskPhone = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d{4})/, "$1-$2")
  }

export const removeMask = value => {
  return value.replace(/\D/g, "");
}