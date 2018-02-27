
const maskCPF = (numCPF) => {
  const cpf = numCPF;
  let newCPF;
  let rCPF = cpf.split('.').join('');
  rCPF = rCPF.split('-').join('');
  newCPF = `${rCPF.substring(0, 3)}.`;
  newCPF += `${rCPF.substring(3, 6)}.`;
  newCPF += `${rCPF.substring(6, 9)}-`;
  newCPF += `${rCPF.substring(9, 11)}`;
  return newCPF;
};

const maskTel = (numTel) => {
  const tel = numTel;
  let newTel;
  newTel = `(${tel.substring(0, 2)})`;
  newTel += ` ${tel.substring(2, tel.length - 4)}-`;
  newTel += `${tel.substring(tel.length - 4, tel.length)}`;

  return newTel;
};

export default maskCPF;
export { maskTel, maskCPF };
