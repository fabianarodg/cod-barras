// import React from 'react';

export const isIncomplete = (inputLength, shouldHave) => {
  if (inputLength < shouldHave) { return true; }
  return false;
};

// valida o cpf no momento que sai do campo
export const validarCPF = (valInput) => {
  const cpf = valInput.replace(/[^\d]+/g, '');
  // Valida 1o digito
  let add = 0;
  let rev = 0;
  let i = 0;
  const invalidos = /^(\d)\1+$/;
  // Elimina CPFs invalidos conhecidos
  if (cpf.length !== 11 || invalidos.test(cpf)) { return false; }

  for (i = 0; i < 9; i += 1) { add += parseInt(cpf.charAt(i), 10) * (10 - i); }
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) { rev = 0; }
  if (rev !== parseInt(cpf.charAt(9), 10)) { return false; }
  // Valida 2o digito
  add = 0;
  for (i = 0; i < 10; i += 1) {
    add += parseInt(cpf.charAt(i), 10) * (11 - i);
  }

  // ???
  rev = 11 - (add % 11);
  if (rev === 10 || rev === 11) {
    rev = 0;
  }
  if (rev !== parseInt(cpf.charAt(10), 10)) {
    return false;
  }
  return true;
};


// formatação no onkeyup recebe o objeto e tipo de dado a ser validado
export const formatarCPF = (idInput, valInput) => {
  let strValor = valInput.replace(/[^\d]+/g, '');
  const inputLength = strValor.length;

  if (inputLength <= 11) {
    strValor = strValor.replace(/(\d{3})(\d)/, '$1.$2');
    strValor = strValor.replace(/(\d{3})(\d)/, '$1.$2');
    strValor = strValor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    document.getElementById(idInput).value = strValor;
  } else {
    const maxInput = valInput.substring(0, valInput.length - 1);
    document.getElementById(idInput).value = maxInput;
  }
};

// valida o cnpj no momento que sai do campo
export const validarCNPJ = (valInput) => {
  // Elimina CNPJs invalidos conhecidos
  const invalidos = /^(\d)\1+$/;
  const cnpj = valInput.replace(/[^\d]+/g, '');

  if (cnpj === '') return false;

  if (cnpj.length !== 14 || invalidos.test(cnpj)) { return false; }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i -= 1) {
    pos -= 1;
    soma += numeros.charAt(tamanho - i) * pos;
    if (pos < 2) { pos = 9; }
  }
  let resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== digitos.charAt(0)) { return false; }

  tamanho += 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i -= 1) {
    pos -= 1;
    soma += numeros.charAt(tamanho - i) * pos;
    if (pos < 2) { pos = 9; }
  }
  resultado = (soma % 11) < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== digitos.charAt(1)) { return false; }

  return true;
};

// formatação no onkeyup recebe o objeto e tipo de dado a ser validado
export const formatarCNPJ = (idInput, valInput) => {
  let strValor = valInput.replace(/[^\d]+/g, '');
  const inputLength = strValor.length;

  if (inputLength <= 14) {
    strValor = strValor.replace(/^(\d{2})(\d)/, '$1.$2');
    strValor = strValor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    strValor = strValor.replace(/\.(\d{3})(\d)/, '.$1/$2');
    strValor = strValor.replace(/(\d{4})(\d)/, '$1-$2');

    document.getElementById(idInput).value = strValor;
  } else {
    const maxInput = valInput.substring(0, valInput.length - 1);

    document.getElementById(idInput).value = maxInput;
  }
};
/* eslint-disable */
export const validarEMAIL = (valInput) => {
  const valido = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  /* eslint-enable */
  if (valido.test(valInput)) {
    return true;
  }
  return false;
};

export const formatarTEL = (idInput, valInput) => {
  let strValor = valInput.replace(/\D/g, '');
  const validInput = strValor.length;
  const outNumbers = validInput - 11;

  strValor = strValor.substring(0, validInput - outNumbers);
  strValor = strValor.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
  strValor = strValor.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos

  document.getElementById(idInput).value = strValor;
};

export const formatarValidar = (idInput, tipo) => {
  const valInput = document.getElementById(idInput).value;
  let size = 0;
  const inputLength = document.getElementById(idInput).length;
  if (valInput === '') {
    return false;
  } else if (tipo === 'cpf') {
    size = 11;
    formatarCPF(idInput, valInput);

    if (!isIncomplete(inputLength, size)) {
      validarCPF(valInput);
    }
  } else if (tipo === 'cnpj') {
    size = 14;
    formatarCNPJ(idInput, valInput);

    if (!isIncomplete(inputLength, size)) {
      validarCNPJ(valInput);
    }
  } else if (tipo === 'email') {
    if (!isIncomplete(inputLength, size)) {
      validarEMAIL(valInput);
    }
  } else if (tipo === 'tel') {
    formatarTEL(idInput, valInput);
  }
  return false;
};
