export function getDataLocal() {
  // Obtém a data atual
  const dataAtual = new Date();

  // Obtém o deslocamento de fuso horário em minutos
  const offset = dataAtual.getTimezoneOffset();

  // Calcula a nova data com o deslocamento de fuso horário
  const novaData = new Date(dataAtual.getTime() - offset * 60 * 1000);
console.log(novaData, 'novaData')
  return novaData;
}
