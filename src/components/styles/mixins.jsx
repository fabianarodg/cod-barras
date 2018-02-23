import { lighten, darken } from 'polished';


const rem = (number) => {
  let tmp = number;
  tmp = (typeof (number) === 'string' && number.indexOf('px')) ? number.replace('px', '') : number;
  tmp = parseFloat(tmp) / 16;

  return `${tmp}rem`;
};


const subtract1Px = (number) => {
  let tmp = number;
  tmp = (typeof (number) === 'string' && number.indexOf('px')) ? number.replace('px', '') : number;
  tmp = parseFloat(tmp) - 1;

  return `${tmp}px`;
};

const setSizes = (sizes) => {
  let n = '';
  if (typeof (sizes) === 'number') {
    n += `${sizes}px`;
  } else {
    sizes.forEach((k) => {
      n += ` ${k}px`;
    });
  }
  return n;
};
const calcSize = (size) => {
  let varSize;
  switch (size) {
    case -1:
      varSize = rem(14);
      break;
    case -2:
      varSize = rem(12);
      break;
    case 2:
      varSize = rem(18);
      break;
    case 3:
      varSize = rem(24);
      break;
    case 4:
      varSize = rem(30);
      break;
    case 5:
      varSize = rem(40);
      break;
    case 6:
      varSize = rem(54);
      break;
    default:
    case 1:
      varSize = rem(16);
  }
  return varSize;
};

const gradient = (direction, list) => {
  let hex = `${direction}, `;
  list.map((k, i) => {
    hex += k;
    if (i !== list.length - 1) hex += ', ';
    return false;
  });
  return hex;
};

const checkTheme = (color, props, alt) => {
  let c = '';
  const Alt = alt || props.statusColor;
  const theme = props.theme.colors;
  if (theme) {
    if (color.substring(0, 1) !== '#') {
      c = Alt;
      // iterar sobre o objeto de tema!
    } else {
      c = color;
    }
  } else if (color.substring(0, 1) === '#') {
    c = color;
  } else {
    c = Alt;
  }
  return c;
};

const darkenColor = (qtd, color) => darken(qtd, color);

const lightenColor = (qtd, color) => lighten(qtd, color);

const formatDate = (format, date) => {
  let d;
  if (date) {
    d = new Date(date);
  } else {
    d = new Date();
  }
  let dd = d.getDate();
  let mm = d.getMonth() + 1;
  const yyyy = d.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  } if (mm < 10) {
    mm = `0${mm}`;
  }

  let fullDate = '';
  if (format === 'DMY') {
    fullDate = `${dd}/${mm}/${yyyy}`;
  } if (format === 'MDY') {
    fullDate = `${mm}/${dd}/${yyyy}`;
  }
  return fullDate;
};


const dateDiff = (date) => {
  const today = formatDate('MDY');
  const date2 = new Date(date);
  const date1 = new Date(today);

  const oneDay = 1000 * 60 * 60 * 24;
  const defDate = (date2.getTime() - date1.getTime()) / oneDay;
  let result;

  if (defDate === 0) {
    result = 'hoje';
  } else {
    result = defDate;
  }
  return result;
};

const fontWeight = (Weight) => {
  let varWeight;
  switch (Weight) {
    case 'Regular':
      varWeight = '400';
      break;
    case 'Medium':
      varWeight = '600';
      break;
    case 'Bold':
      varWeight = '700';
      break;
    default:
    case 'Light':
      varWeight = '300';
  }
  return varWeight;
};

const numericoLeitor = (v) => {
  const arr = v.split(' ');
  let codigoFormatado = '';

  arr.forEach((item) => {
    codigoFormatado += item.substr(0, 11);
  });

  return codigoFormatado;
};

export { rem,
  subtract1Px,
  setSizes,
  numericoLeitor,
  gradient,
  checkTheme,
  darkenColor,
  lightenColor,
  calcSize,
  fontWeight,
  formatDate,
  dateDiff };
