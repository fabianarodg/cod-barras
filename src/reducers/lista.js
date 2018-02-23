import { SET_CPF } from '../actions';

const initialState = {
  cpf: '01323308300',
  fechada: [
    {
      id: '0',
      terminal: '27910129819',
      plano: 'OI TOTAL FIXO + BANDA LARGA 1',
      faturas: [
        {
          dataVencimento: '2017-11-20',
          valor: 68.87,
          dacc: false,
          codigoDeBarras: '84680000000-8  68870113224-5  18304680838-6  96002600000-5',
          status: 'Em Aberto',
          tem14Meses: false,
          idFatura: '279819-1',
          faturaGerada: true,
          vencida: false,
          diasVencido: 95,
          diasAVencer: null,
        },
        {
          dataVencimento: '2017-12-20',
          valor: 143.78,
          dacc: false,
          codigoDeBarras: '84690000001-5  43780113224-6  18304680854-3  89058500000-7',
          status: 'Em Aberto',
          tem14Meses: false,
          idFatura: '279819-2',
          faturaGerada: true,
          vencida: false,
          diasVencido: 65,
          diasAVencer: null,
        },
        {
          dataVencimento: '2018-01-20',
          valor: 17.3,
          dacc: false,
          codigoDeBarras: '84640000000-2  17300113224-5  18304680870-9  87146500000-2',
          status: 'Em Aberto',
          tem14Meses: false,
          idFatura: '279819-3',
          faturaGerada: true,
          vencida: false,
          diasVencido: 34,
          diasAVencer: null,
        },
      ],
    },
    {
      id: '1',
      terminal: '2732416738',
      plano: 'LINHA INDIVIDUAL - RESIDENCIAL',
      faturas: [],
    },
  ],
  aberta: [
    {
      id: '0',
      terminal: '27***9819',
      faturas: [
        {
          dataVencimento: '2017-11-20',
          valor: 68.87,
          dacc: false,
          codigoDeBarras: '84680000000-8  68870113224-5  18304680838-6  96002600000-5',
          status: 'Em Aberto',
          tem14Meses: false,
          idFatura: '279819-1',
          faturaGerada: true,
          vencida: false,
          diasVencido: 95,
          diasAVencer: null,
        },
        {
          dataVencimento: '2017-12-20',
          valor: 143.78,
          dacc: false,
          codigoDeBarras: '84690000001-5  43780113224-6  18304680854-3  89058500000-7',
          status: 'Em Aberto',
          tem14Meses: false,
          idFatura: '279819-2',
          faturaGerada: true,
          vencida: false,
          diasVencido: 65,
          diasAVencer: null,
        },
        {
          dataVencimento: '2018-01-20',
          valor: 17.3,
          dacc: false,
          codigoDeBarras: '84640000000-2  17300113224-5  18304680870-9  87146500000-2',
          status: 'Em Aberto',
          tem14Meses: false,
          idFatura: '279819-3',
          faturaGerada: true,
          vencida: false,
          diasVencido: 34,
          diasAVencer: null,
        },
      ],
    },
    {
      id: '1',
      terminal: '27****6738',
      faturas: [],
    },
  ],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CPF:
      return { ...state, cpf: action.payload };

    default:
      return state;
  }
}
